import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const kelopok = searchParams.get("kelompok");

        const where: { kelompok?: string } = {};
        if (kelopok) {
            where.kelompok = kelopok;
        }

        const data = prisma.aparaturPamong ? await prisma.aparaturPamong.findMany({
            where,
            include: {
                padukuhan: true,
            },
            orderBy: { urutan: "asc" },
        }) : [];

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
