import Link from "next/link";
import { MapPin, Users, Home, Map } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

function formatNumber(num: number | null): string {
    if (num === null) return "-";
    return new Intl.NumberFormat("id-ID").format(num);
}

export default async function ProfilPadukuhanPage() {
    const padukuhan = prisma.padukuhan ? await prisma.padukuhan.findMany({
        orderBy: { nama: "asc" },
        include: {
            pertanahan: true,
            _count: {
                select: {
                    fasilitas: true,
                    umkm: true,
                    traditions: true,
                    wisatas: true,
                },
            },
        },
    }) : [];

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <Map className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Profil Padukuhan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kalurahan Banyuraden terdiri dari 8 padukuhan yang tersebar di wilayah kalurahan. Setiap padukuhan memiliki
                        karakteristik dan potensi unik yang menjadi kekayaan bersama.
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <div className="absolute -top-4 -right-4 opacity-10 text-blue-600">
                            <MapPin className="h-32 w-32" />
                        </div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Total Padukuhan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-blue-900 mb-2">{padukuhan.length}</div>
                            <p className="text-xs text-blue-700">wilayah administratif</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-200 border-0">
                        <div className="absolute -top-4 -right-4 opacity-10 text-emerald-600">
                            <Users className="h-32 w-32" />
                        </div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Total Penduduk
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-2xl font-bold text-emerald-900 mb-2">
                                {formatNumber(
                                    padukuhan.reduce((sum, p) => sum + (p.totalPenduduk || 0), 0)
                                )}
                            </div>
                            <p className="text-xs text-emerald-700">jiwa</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden bg-linear-to-br from-violet-100 to-violet-200 border-0">
                        <div className="absolute -top-4 -right-4 opacity-10 text-violet-600">
                            <Home className="h-32 w-32" />
                        </div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-violet-800 flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Total Kartu Keluarga
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-2xl font-bold text-violet-900 mb-2">
                                {formatNumber(
                                    padukuhan.reduce((sum, p) => sum + (p.jumlahKK || 0), 0)
                                )}
                            </div>
                            <p className="text-xs text-violet-700">KK terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden bg-linear-to-br from-amber-100 to-amber-200 border-0">
                        <div className="absolute -top-4 -right-4 opacity-10 text-amber-600">
                            <Map className="h-32 w-32" />
                        </div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
                                <Map className="h-4 w-4" />
                                Total Luas Wilayah
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-2xl font-bold text-amber-900 mb-2">
                                {(padukuhan.reduce((sum, p) => sum + (p.luasHa || 0), 0)).toFixed(1)}
                            </div>
                            <p className="text-xs text-amber-700">hektar</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Padukuhan Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {padukuhan.map((padukuhan) => (
                        <Link href={`/profil-padukuhan/${padukuhan.slug}`} key={padukuhan.id}>
                            <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                                <div className="relative h-40 bg-gradient-to-br from-blue-400 to-indigo-600">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <MapPin className="h-16 w-16 text-white/30" />
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm">
                                            Padukuhan
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <h3 className="text-lg font-bold text-white shadow-sm">
                                            {padukuhan.nama}
                                        </h3>
                                    </div>
                                </div>

                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Users className="h-4 w-4 text-blue-600" />
                                        Kepala Dusun
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Kepala Dusun</span>
                                            <span className="font-medium">
                                                {padukuhan.kepalaDukuh || "-"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Penduduk</span>
                                            <span className="font-medium">
                                                {formatNumber(padukuhan.totalPenduduk)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">KK</span>
                                            <span className="font-medium">
                                                {formatNumber(padukuhan.jumlahKK)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">RW / RT</span>
                                            <span className="font-medium">
                                                {padukuhan.jumlahRW || 0} / {padukuhan.jumlahRT || 0}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Luas</span>
                                            <span className="font-medium">
                                                {padukuhan.luasHa ? `${padukuhan.luasHa.toFixed(1)} ha` : "-"}
                                            </span>
                                        </div>

                                        <div className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{padukuhan._count.fasilitas} fasilitas</span>
                                            <span className="text-blue-600 font-medium">Detail &rarr;</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Info Section */}
                <Card className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-800">Tentang Padukuhan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <p>
                                Padukuhan adalah wilayah administratif terkecil di tingkat kalurahan yang berfungsi
                                sebagai wilayah kerja pemerintahan tingkat dasar. Setiap padukuhan dipimpin oleh seorang
                                Kepala Dusun (Kadu) yang membantu pelaksanaan pemerintahan kalurahan.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Peran Padukuhan:</h4>
                                    <ul className="space-y-1">
                                        <li>• Sebagai wilayah administratif tingkat dasar</li>
                                        <li>• Koordinasi pelayanan publik di tingkat dusun</li>
                                        <li>• Pemberdayaan masyarakat dan ekonomi lokal</li>
                                        <li>• Pengelolaan potensi dan kekayaan daerah</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Struktur:</h4>
                                    <ul className="space-y-1">
                                        <li>• Kepala Dusun (Kadu)</li>
                                        <li>• Rukun Warga (RW)</li>
                                        <li>• Rukun Tetangga (RT)</li>
                                        <li>• Badan Permusyawaratan Kalurahan (BPKal)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
