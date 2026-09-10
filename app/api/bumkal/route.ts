import { NextResponse } from "next/server";
import { fetchOpenSIDBumkal, createApiRouteHandler, unwrapOpenSIDResponse } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async () => {
    try {
        const response = await fetchOpenSIDBumkal();
        const data = unwrapOpenSIDResponse(response);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
});
