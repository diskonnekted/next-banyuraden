import { NextResponse } from "next/server";
import { fetchOpenSIDIInovasi, createApiRouteHandler, unwrapOpenSIDResponse } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const kategori = searchParams.get("kategori");

        const response = await fetchOpenSIDIInovasi();
        let data = unwrapOpenSIDResponse(response);

        // Filter by kategori if specified
        if (kategori) {
            data = data.filter((item) => {
                const itemKategori = item.attributes?.kategori || item.kategori;
                return itemKategori === kategori;
            });
        }

        // Sort by tahun descending
        data = data.sort((a, b) => {
            const tahunA = a.attributes?.tahun ?? a.tahun ?? 0;
            const tahunB = b.attributes?.tahun ?? b.tahun ?? 0;
            return tahunB - tahunA;
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
});
