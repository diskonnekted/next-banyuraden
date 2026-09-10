import { NextResponse } from "next/server";
import { fetchOpenSIDPemerintah, createApiRouteHandler, unwrapOpenSIDResponse } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async () => {
    try {
        const response = await fetchOpenSIDPemerintah();
        const data = unwrapOpenSIDResponse(response);

        return NextResponse.json({ success: true, data });
    } catch (e) {
        console.warn("fetchOpenSIDPemerintah failed:", e);
    }

    return NextResponse.json({ data: [] });
});
