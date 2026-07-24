import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const jenis = searchParams.get("jenis");

        const where: { jenis?: string } = {};
        if (jenis) {
            where.jenis = jenis;
        }

        const data = await prisma.produkHukum.findMany({
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
