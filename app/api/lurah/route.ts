import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        // Get current lurah (latest period)
        const lurah = await prisma.$queryRaw`
            SELECT * FROM sejarah_lurah 
            WHERE periode_akhir IS NULL OR periode_akhir >= YEAR(NOW())
            ORDER BY periode_awal DESC
            LIMIT 1
        ` as any[];

        // Get all lurah history
        const lurahHistory = await prisma.$queryRaw`
            SELECT * FROM sejarah_lurah 
            ORDER BY periode_awal ASC
        ` as any[];

        return NextResponse.json({
            success: true,
            current: lurah[0] || null,
            history: lurahHistory
        });
    } catch (error) {
        console.error("Error in lurah API:", error);
        return NextResponse.json(
            { error: "Internal server error", current: null, history: [] },
            { status: 500 }
        );
    }
}
