import Link from "next/link";
import { Building2, School, Heart, Landmark, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function FasilitasPage() {
    const fasilitasList: any[] = (prisma && prisma.fasilitasPadukuhan) ? await prisma.fasilitasPadukuhan.findMany({
        where: { aktif: true },
        include: {
            padukuhan: { select: { nama: true } },
        },
    }) : [];

    // Group by jenis
    const grouped = fasilitasList.reduce<Record<string, typeof fasilitasList>>((acc, f) => {
        if (!acc[f.jenis]) acc[f.jenis] = [];
        acc[f.jenis].push(f);
        return acc;
    }, {});

    const pendidikanCount = Object.entries(grouped)
        .filter(([jenis]) => ["SD", "SMP", "SMA", "SMK", "TK", "PAUD", "PONDOK_PESANTREN", "PERGURUAN_TINGGI"].includes(jenis))
        .reduce((sum, [, items]) => sum + items.length, 0);

    const kesehatanCount = Object.entries(grouped)
        .filter(([jenis]) => ["KLINIK", "PRATIKA_DOKTER", "POSYANDU"].includes(jenis))
        .reduce((sum, [, items]) => sum + items.length, 0);

    const ibadahCount = Object.entries(grouped)
        .filter(([jenis]) => ["MASJID", "MUSHOLA", "GEREJA"].includes(jenis))
        .reduce((sum, [, items]) => sum + items.length, 0);

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <Building2 className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Fasilitas Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Informasi fasilitas umum yang tersedia di wilayah Kalurahan Banyuraden
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Link href="/fasilitas/pendidikan">
                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                            <div className="relative h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-t-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <School className="h-16 w-16 text-white/30" />
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-800">
                                        {pendidikanCount} Fasilitas
                                    </span>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-blue-700 flex items-center gap-2">
                                    <School className="h-5 w-5" />
                                    Pendidikan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Sekolah, TK, PAUD, dan lembaga pendidikan
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/fasilitas/kesehatan">
                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                            <div className="relative h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-t-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Heart className="h-16 w-16 text-white/30" />
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-red-800">
                                        {kesehatanCount} Fasilitas
                                    </span>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-red-700 flex items-center gap-2">
                                    <Heart className="h-5 w-5" />
                                    Kesehatan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Klinik, posyandu, dan fasilitas kesehatan lainnya
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/fasilitas/ibadah">
                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                            <div className="relative h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-t-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Landmark className="h-16 w-16 text-white/30" />
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-emerald-800">
                                        {ibadahCount} Fasilitas
                                    </span>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-emerald-700 flex items-center gap-2">
                                    <Landmark className="h-5 w-5" />
                                    Ibadah
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Masjid, mushola, dan tempat ibadah lainnya
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Card className="relative overflow-hidden bg-linear-to-br from-amber-100 to-amber-200 border-0">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Total Fasilitas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-amber-900">{fasilitasList.length}</div>
                            <p className="text-xs text-amber-700">seluruh fasilitas</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Fasilitas by Padukuhan */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            Fasilitas per Padukuhan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {(() => {
                            const byPadukuhan = fasilitasList.reduce<Record<string, typeof fasilitasList>>(
                                (acc, f) => {
                                    const key = f.padukuhan?.nama || "Tanpa Padukuhan";
                                    if (!acc[key]) acc[key] = [];
                                    acc[key].push(f);
                                    return acc;
                                },
                                {}
                            );

                            return Object.entries(byPadukuhan).map(([padukuhan, items]) => (
                                <div key={padukuhan} className="mb-6 last:mb-0">
                                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-blue-600" />
                                        {padukuhan}
                                    </h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {items.map((f) => (
                                            <Card key={f.id}>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base">{f.nama}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                                        {f.alamat}
                                                    </p>
                                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                        <span>{f.jenis}</span>
                                                        {f.telepon && <span>Telp: {f.telepon}</span>}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ));
                        })()}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
