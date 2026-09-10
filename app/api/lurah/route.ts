import { NextResponse } from "next/server";
import { fetchOpenSIDISejarahLurah, unwrapOpenSIDResponse, createApiRouteHandler } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async () => {
    try {
        const response = await fetchOpenSIDISejarahLurah();

        // Get all history sorted by periode_awal ascending
        const allHistory = unwrapOpenSIDResponse(response);

        // Get current lurah (latest period)
        const currentLurah = allHistory
            .filter((item: any) => {
                const periodeAkhir = item.attributes?.periode_akhir ?? item.periode_akhir;
                return !periodeAkhir || parseInt(periodeAkhir) >= new Date().getFullYear();
            })
            .sort((a: any, b: any) => {
                const tahunA = a.attributes?.periode_awal ?? a.periode_awal ?? 0;
                const tahunB = b.attributes?.periode_awal ?? b.periode_awal ?? 0;
                return tahunB - tahunA;
            })[0] || null;

        // Sort history by periode_awal ascending
        const history = [...allHistory].sort((a: any, b: any) => {
            const tahunA = a.attributes?.periode_awal ?? a.periode_awal ?? 0;
            const tahunB = b.attributes?.periode_awal ?? b.periode_awal ?? 0;
            return tahunA - tahunB;
        });

        return NextResponse.json({ success: true, current: currentLurah, history });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
});
