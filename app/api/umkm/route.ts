import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const padukuhanId = searchParams.get("padukuhanId");
        const jenis = searchParams.get("jenis");

        const where: { padukuhanId?: number; jenis?: string } = {};
        if (padukuhanId) {
            where.padukuhanId = parseInt(padukuhanId, 10);
        }
        if (jenis) {
            where.jenis = jenis;
        }

        const data: any[] = (prisma && prisma.umkm) ? await prisma.umkm.findMany({
            where: where as any,
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
