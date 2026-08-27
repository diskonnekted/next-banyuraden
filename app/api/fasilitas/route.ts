import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const jenis = searchParams.get("jenis");
        const padukuhanId = searchParams.get("padukuhanId");

        const where: { jenis?: string; padukuhanId?: number } = {};
        if (jenis) {
            where.jenis = jenis;
        }
        if (padukuhanId) {
            where.padukuhanId = parseInt(padukuhanId, 10);
        }

        const data = await prisma.fasilitasPadukuhan.findMany({
            where: where as any,
            include: {
                padukuhan: true,
            },
            orderBy: { nama: "asc" },
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
