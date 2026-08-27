import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
    params: Promise<{ slug: string }>;
}

export async function GET(request: Request, context: RouteContext) {
    try {
        const { slug } = await context.params;

        const padukuhan: any = (prisma && prisma.padukuhan) ? await prisma.padukuhan.findUnique({
            where: { slug },
            include: {
                fasilitas: true,
                traditions: true,
                umkm: true,
                pertanahan: true,
                kelompokTani: true,
                wisatas: true,
            },
        }) : null;

        if (!padukuhan) {
            return NextResponse.json(
                { success: false, error: "Padukuhan not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: padukuhan });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
