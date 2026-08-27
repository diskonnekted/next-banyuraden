import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const padukuhanId = searchParams.get("padukuhanId");

        const where: { padukuhanId?: number } = {};
        if (padukuhanId) {
            where.padukuhanId = parseInt(padukuhanId, 10);
        }

        const data = prisma.kelompokTani ? await prisma.kelompokTani.findMany({
            where,
            include: {
                padukuhan: true,
            },
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
