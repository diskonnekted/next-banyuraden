import { NextResponse } from "next/server";
import { fetchOpenSIDPemerintah, createApiRouteHandler } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";

export const { GET } = createApiRouteHandler(async () => {
    try {
        const response = await fetchOpenSIDPemerintah();
        if (response.success && response.data) {
            return NextResponse.json(response.data);
        }
    } catch (e) {
        console.warn("fetchOpenSIDPemerintah failed, attempting database fallback:", e);
    }

    // Fallback to local database (aparatur_pamong) formatted to OpenSID jsonapi-like structure
    try {
        const localAparatur = (prisma && prisma.aparaturPamong) ? await prisma.aparaturPamong.findMany({
            where: { aktif: true },
            include: { padukuhan: true },
            orderBy: { urutan: "asc" },
        }) : [];

        const formatted = {
            data: localAparatur.map((a: any) => ({
                type: "pamong",
                id: String(a.id),
                attributes: {
                    pamong_id: a.id,
                    pamong_nama: a.namaLengkap + (a.gelar ? `, ${a.gelar}` : ""),
                    pamong_nik: "",
                    pamong_tempatlahir: "",
                    pamong_tanggallahir: "",
                    pamong_sex: 1,
                    pamong_pendidikan: 0,
                    pamong_agama: 1,
                    foto: a.foto || "",
                    nama_jabatan: a.jabatan,
                    pamong_nosk: "",
                    pamong_tglsk: "",
                    pamong_masajab: null,
                    status_kehadiran: "Hadir",
                    tanggal: null,
                    foto_staff: a.foto || "",
                    penduduk: {
                        alamat_wilayah: a.padukuhan?.nama || "Kalurahan Banyuraden",
                        jenis_kelamin: { nama: "-" },
                        agama: { nama: "-" },
                        pendidikan_k_k: { nama: a.pendidikan || "-" },
                        pekerjaan: { nama: "Perangkat Desa" },
                        usia: "-",
                        telepon: null,
                        email: null,
                    },
                    jabatan: {
                        nama: a.jabatan,
                        tupoksi: a.pengalaman || "",
                    },
                },
            })),
        };

        return NextResponse.json(formatted);
    } catch (dbError) {
        console.error("Failed to fetch from both OpenSID and local database:", dbError);
        return NextResponse.json({ data: [] });
    }
});
