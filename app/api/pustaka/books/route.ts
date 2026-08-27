import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createApiRouteHandler } from "@/lib/api-helpers";

type PustakaBook = {
    id: string;
    title: string;
    author: string;
    coverUrl: string | null;
    detailUrl: string;
};

type PustakaMeta = {
    pagination: {
        total: number;
        per_page: number;
        current_page: number;
        total_pages: number;
    };
};

const BASE_URL = "https://pustaka.pondokrejo.id";

function toAbsoluteUrl(url: string): string {
    return new URL(url, BASE_URL).toString();
}

function matchFirst(input: string, re: RegExp): string | null {
    const m = input.match(re);
    return m?.[1]?.trim() ? m[1].trim() : null;
}

function decodeHtml(text: string): string {
    return text
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ");
}

function parseBooksFromCatalogHtml(html: string): PustakaBook[] {
    const marker = 'bg-white rounded-lg shadow-md overflow-hidden';
    const parts = html.split(marker);
    if (parts.length <= 1) return [];

    const books: PustakaBook[] = [];

    for (let i = 1; i < parts.length; i++) {
        const chunk = parts[i];

        const id = matchFirst(chunk, /href="detail\.php\?id=([0-9]+)"/i);
        if (!id) continue;

        const titleAttr = matchFirst(chunk, /<h3[^>]*title="([^"]+)"/i);
        const titleText = matchFirst(chunk, /<h3[^>]*>([\s\S]*?)<\/h3>/i);
        const title = decodeHtml(titleAttr || titleText || "").replace(/\s+/g, " ").trim();
        if (!title) continue;

        const author = decodeHtml(matchFirst(chunk, /<p[^>]*title="([^"]+)"/i) || "").replace(/\s+/g, " ").trim();

        const coverSrc = matchFirst(chunk, /<img[^>]*src="([^"]+)"/i);
        const coverUrl = coverSrc ? toAbsoluteUrl(coverSrc) : null;

        const detailUrl = toAbsoluteUrl(`detail.php?id=${id}`);

        books.push({
            id,
            title,
            author,
            coverUrl,
            detailUrl,
        });
    }

    return books;
}

export const { GET, OPTIONS } = createApiRouteHandler(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const perPage = Math.max(1, Math.min(60, Number(searchParams.get("limit") || "12") || 12));
    const page = Math.max(1, Number(searchParams.get("page") || searchParams.get("halaman") || "1") || 1);

    const res = await fetch(`${BASE_URL}/catalog.php`, {
        method: "GET",
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        next: {
            revalidate: 60 * 60,
            tags: ["pustaka-catalog"],
        },
        signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
        return NextResponse.json(
            { success: false, error: `Gagal mengambil katalog pustaka: HTTP ${res.status}` },
            { status: res.status }
        );
    }

    const html = await res.text();
    const allBooks = parseBooksFromCatalogHtml(html);
    const total = allBooks.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * perPage;
    const books = allBooks.slice(startIndex, startIndex + perPage);

    const meta: PustakaMeta = {
        pagination: {
            total,
            per_page: perPage,
            current_page: currentPage,
            total_pages: totalPages,
        },
    };

    return NextResponse.json({ success: true, data: books, meta });
});
