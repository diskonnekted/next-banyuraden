import { NextResponse } from "next/server";
import { fetchOpenSIDWilayah, unwrapOpenSIDResponse, createApiRouteHandler } from "@/lib/api-helpers";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";

export const { GET } = createApiRouteHandler(async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug") || "";

        const response = await fetchOpenSIDWilayah();
        const padukuhanList = unwrapOpenSIDResponse(response);

        const padukuhan = padukuhanList.find(
            (item: any) => item.attributes?.slug === slug || item.slug === slug
        );

        if (!padukuhan) {
            return NextResponse.json(
                { success: false, error: "Padukuhan not found" },
                { status: 404 }
            );
        }

        // Fetch related data
        const padukuhanId = padukuhan.attributes?.id || padukuhan.id;
        const facilities = await fetchJson(`${BASE_URL}/api/fasilitas?padukuhanId=${padukuhanId}`);
        const traditions = await fetchJson(`${BASE_URL}/api/tradisi?padukuhanId=${padukuhanId}`);
        const umkm = await fetchJson(`${BASE_URL}/api/umkm?padukuhanId=${padukuhanId}`);
        const pertanahan = await fetchJson(`${BASE_URL}/api/pertanahan?padukuhanId=${padukuhanId}`);
        const kelompokTani = await fetchJson(`${BASE_URL}/api/kelompok-tani?padukuhanId=${padukuhanId}`);
        const wisatas = await fetchJson(`${BASE_URL}/api/wisata?padukuhanId=${padukuhanId}`);

        return NextResponse.json({
            success: true,
            data: {
                ...padukuhan,
                fasilitas: facilities?.data || [],
                traditions: traditions?.data || [],
                umkm: umkm?.data || [],
                pertanahan: pertanahan?.data || [],
                kelompokTani: kelompokTani?.data || [],
                wisatas: wisatas?.data || [],
            }
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
});

async function fetchJson(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        return res.ok ? res.json() : null;
    } catch {
        return null;
    }
}
