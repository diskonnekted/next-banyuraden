import { NextResponse } from "next/server";
import { fetchOpenSIDISejarahLurah, createApiRouteHandler, unwrapOpenSIDResponse } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async () => {
    try {
        const response = await fetchOpenSIDISejarahLurah();
        const data = unwrapOpenSIDResponse(response);

        // Sort by urutan
        data.sort((a: any, b: any) => {
            const urutanA = a.attributes?.urutan ?? a.urutan ?? 0;
            const urutanB = b.attributes?.urutan ?? b.urutan ?? 0;
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
