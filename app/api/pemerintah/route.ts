import { NextResponse } from "next/server";
import { fetchOpenSIDPemerintah, createApiRouteHandler } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async () => {
    const response = await fetchOpenSIDPemerintah();
    if (!response.success) {
        return NextResponse.json(
            { error: "Failed to fetch pemerintah data", message: response.message, data: [] },
            { status: 500 }
        );
    }
    return NextResponse.json(response.data);
});
