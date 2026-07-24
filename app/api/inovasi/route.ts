import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const kategori = searchParams.get("kategori");

        const where: { kategori?: string } = {};
        if (kategori) {
            where.kategori = kategori;
        }

        const data = await prisma.inovasi.findMany({
            where,
            orderBy: { tahun: "desc" },
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
