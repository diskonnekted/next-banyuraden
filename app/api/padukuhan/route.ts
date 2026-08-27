import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");

        if (slug) {
            const padukuhan = prisma.padukuhan ? await prisma.padukuhan.findUnique({
                where: { slug },
            }) : null;

            if (!padukuhan) {
                return NextResponse.json(
                    { success: false, error: "Padukuhan not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ success: true, data: padukuhan });
        }

        const data = prisma.padukuhan ? await prisma.padukuhan.findMany({
            orderBy: { nama: "asc" },
        }) : [];

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
