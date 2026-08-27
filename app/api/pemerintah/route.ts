import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchOpenSIDPemerintah } from "@/lib/api-helpers";

export async function GET(request: Request) {
    try {
        // Try to get data from database first (Banyuraden)
        // Use raw query as workaround for Prisma client issue
        const aparatur = prisma ? await prisma.$queryRaw`
            SELECT * FROM apatur_pamong WHERE aktif = true ORDER BY urutan ASC
        ` as any[] : [];

        if (aparatur.length > 0) {
            // Convert to OpenSID format for compatibility
            const data = aparatur.map((item: any) => ({
                type: "apatur_pamong",
                id: item.id.toString(),
                attributes: {
                    pamong_id: item.id,
                    pamong_nama: item.nama_lengkap,
                    pamong_nik: "",
                    pamong_tempatlahir: "",
                    pamong_tanggallahir: "",
                    pamong_sex: 0,
                    pamong_pendidikan: 0,
                    pamong_agama: 0,
                    foto: item.foto || "",
                    nama_jabatan: item.jabatan,
                    pamong_nosk: "",
                    pamong_tglsk: "",
                    pamong_masajab: null,
                    status_kehadiran: "",
                    tanggal: null,
                    foto_staff: item.foto || "",
                    penduduk: {
                        alamat_wilayah: "",
                        jenis_kelamin: { nama: "" },
                        agama: { nama: "" },
                        pendidikan_k_k: { nama: item.pendidikan || "" },
                        pekerjaan: { nama: "" },
                        usia: "",
                        telepon: item.telepon || null,
                        email: item.email || null,
                    },
                    jabatan: {
                        nama: item.jabatan,
                        tupoksi: "",
                    },
                },
            }));

            return NextResponse.json({ success: true, data });
        }

        // Fallback to OpenSID if database is empty
        const response = await fetchOpenSIDPemerintah();
        if (!response.success) {
            return NextResponse.json(
                { error: "Failed to fetch pemerintah data", message: response.message, data: [] },
                { status: 500 }
            );
        }
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error in pemerintah API:", error);
        return NextResponse.json(
            { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error", data: [] },
            { status: 500 }
        );
    }
}
