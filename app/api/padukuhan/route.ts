import { NextResponse } from "next/server";
import { fetchOpenSIDWilayah, createApiRouteHandler, unwrapOpenSIDResponse } from "@/lib/api-helpers";

export const { GET } = createApiRouteHandler(async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");

        const response = await fetchOpenSIDWilayah();
        let padukuhanList = unwrapOpenSIDResponse(response);

        if (slug) {
            const padukuhan = padukuhanList.find(
                (item: any) => item.attributes?.slug || item.slug
            );

            if (!padukuhan) {
                return NextResponse.json(
                    { success: false, error: "Padukuhan not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ success: true, data: padukuhan });
        }

        // Sort by nama
        padukuhanList = padukuhanList.sort((a, b) => {
            const namaA = a.attributes?.nama || a.nama || "";
            const namaB = b.attributes?.nama || b.nama || "";
            return namaA.localeCompare(namaB);
        });

        return NextResponse.json({ success: true, data: padukuhanList });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
});
