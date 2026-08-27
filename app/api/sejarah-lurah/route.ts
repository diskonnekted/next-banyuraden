import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const data = prisma.sejarahLurah ? await prisma.sejarahLurah.findMany({
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
