import { NextResponse } from "next/server";
import { fetchOpenSIDProdukHukum, createApiRouteHandler, unwrapOpenSIDResponse } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const jenis = searchParams.get("jenis");

        const response = await fetchOpenSIDProdukHukum();
        let data = unwrapOpenSIDResponse(response);

        // Filter by jenis if specified
        if (jenis) {
            data = data.filter((item) => {
                const itemJenis = item.attributes?.jenis || item.jenis;
                return itemJenis === jenis;
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
