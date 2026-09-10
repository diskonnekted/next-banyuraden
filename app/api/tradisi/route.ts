import { NextResponse } from "next/server";
import { fetchOpenSIDTradisi, createApiRouteHandler, unwrapOpenSIDResponse } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const padukuhanId = searchParams.get("padukuhanId");

        const response = await fetchOpenSIDTradisi();
        let data = unwrapOpenSIDResponse(response);

        // Filter by padukuhanId if specified
        if (padukuhanId) {
            const padukuhanIdNum = parseInt(padukuhanId, 10);
            data = data.filter((item) => {
                const itemPadukuhanId = item.attributes?.padukuhan_id || item.padukuhanId;
                return itemPadukuhanId === padukuhanIdNum;
            });
        }

        // Sort by nama
        data = data.sort((a, b) => {
            const namaA = a.attributes?.nama || a.nama || "";
            const namaB = b.attributes?.nama || b.nama || "";
            return namaA.localeCompare(namaB);
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
});
