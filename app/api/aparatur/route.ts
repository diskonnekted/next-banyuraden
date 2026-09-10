import { NextResponse } from "next/server";
import { fetchOpenSIDAparatur, createApiRouteHandler, unwrapOpenSIDResponse } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const kelompok = searchParams.get("kelompok");

        const response = await fetchOpenSIDAparatur();
        let data = unwrapOpenSIDResponse(response);

        // Filter by kelompok if specified
        if (kelompok) {
            data = data.filter((item) => {
                const itemKelompok = item.attributes?.pamong_kelompok || item.attributes?.kelompok || item.kelompok;
                return itemKelompok === kelompok;
            });
        }

        // Sort by urutan
        data = data.sort((a, b) => {
            const urutanA = a.attributes?.pamong_urutan ?? a.attributes?.urutan ?? a.urutan ?? 0;
            const urutanB = b.attributes?.pamong_urutan ?? b.attributes?.urutan ?? b.urutan ?? 0;
            return urutanA - urutanB;
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
});
