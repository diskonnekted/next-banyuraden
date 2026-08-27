import { Store, Users, Phone, MapPin, Filter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

function getJenisBadge(jenis: string) {
    const styles: Record<string, string> = {
        KULINER: "bg-orange-100 text-orange-800 border-orange-200",
        PERTANIAN: "bg-green-100 text-green-800 border-green-200",
        PETERNAKAN: "bg-yellow-100 text-yellow-800 border-yellow-200",
        PENGOLAHAN: "bg-blue-100 text-blue-800 border-blue-200",
        JASA: "bg-purple-100 text-purple-800 border-purple-200",
        PERDAGANGAN: "bg-indigo-100 text-indigo-800 border-indigo-200",
        KERajinan: "bg-pink-100 text-pink-800 border-pink-200",
    };
    return styles[jenis] || "bg-gray-100 text-gray-800 border-gray-200";
}

function getJenisLabel(jenis: string): string {
    const labels: Record<string, string> = {
        KULINER: "Kuliner",
        PERTANIAN: "Pertanian",
        PETERNAKAN: "Peternakan",
        PENGOLAHAN: "Pengolahan",
        JASA: "Jasa",
        PERDAGANGAN: "Perdagangan",
        KERajinan: "Kerajinan",
    };
    return labels[jenis] || jenis;
}

export default async function UmkmPage() {
    const umkmList = prisma.uMKM ? await prisma.uMKM.findMany({
        where: { aktif: true },
        include: {
            padukuhan: { select: { nama: true, slug: true } },
        },
        orderBy: { nama: "asc" },
    }) : [];

    // Group by padukuhan
    const grouped = umkmList.reduce<Record<string, typeof umkmList>>((acc, u) => {
        const key = u.padukuhan?.nama || "Tanpa Padukuhan";
        if (!acc[key]) acc[key] = [];
        acc[key].push(u);
        return acc;
    }, {});

    // Group by jenis
    const jenisOptions = [...new Set(umkmList.map((u) => u.jenis))];

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full">
                        <Store className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">UMKM Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Usaha Mikro, Kecil, dan Menengah di Kalurahan Banyuraden yang menjadi tulang punggung ekonomi
                        masyarakat
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Store className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-emerald-900">{umkmList.length}</div>
                            <p className="text-xs text-emerald-700">Total UMKM</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-blue-900">
                                {Object.keys(grouped).length}
                            </div>
                            <p className="text-xs text-blue-700">Padukuhan</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-purple-100 to-purple-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Filter className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-purple-900">{jenisOptions.length}</div>
                            <p className="text-xs text-purple-700">Kategori</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-amber-100 to-amber-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Badge className="bg-amber-600 text-white">Aktif</Badge>
                            <div className="text-xs text-amber-700 mt-2">Semua aktif</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter by Jenis */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm font-medium self-center mr-2 flex items-center gap-1">
                                <Filter className="h-4 w-4" />
                                Filter:
                            </span>
                            <Badge
                                variant={jenisOptions.length === 0 ? "default" : "outline"}
                                className="cursor-default bg-gray-100"
                            >
                                Semua
                            </Badge>
                            {jenisOptions.map((jenis) => (
                                <Badge
                                    key={jenis}
                                    variant="outline"
                                    className="cursor-default"
                                >
                                    {getJenisLabel(jenis)}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* UMKM by Padukuhan */}
                {Object.entries(grouped).map(([padukuhan, items]) => (
                    <Card key={padukuhan}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-emerald-600" />
                                {padukuhan}
                            </CardTitle>
                            <CardDescription>{items.length} UMKM terdaftar</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map((umkm) => (
                                    <Card key={umkm.id}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{umkm.nama}</CardTitle>
                                            <CardDescription>
                                                <Badge className={getJenisBadge(umkm.jenis)}>
                                                    {getJenisLabel(umkm.jenis)}
                                                </Badge>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {umkm.deskripsi && (
                                                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                                                    {umkm.deskripsi}
                                                </p>
                                            )}
                                            <div className="space-y-1 text-xs text-muted-foreground">
                                                {umkm.pemilik && (
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-3 w-3 shrink-0" />
                                                        <span>{umkm.pemilik}</span>
                                                    </div>
                                                )}
                                                {umkm.telepon && (
                                                    <div className="flex items-center gap-1">
                                                        <Phone className="h-3 w-3 shrink-0" />
                                                        <span>{umkm.telepon}</span>
                                                    </div>
                                                )}
                                                {umkm.alamat && (
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3 shrink-0" />
                                                        <span className="line-clamp-1">{umkm.alamat}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Info */}
                <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                    <CardHeader>
                        <CardTitle className="text-emerald-800">Tentang UMKM</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            UMKM (Usaha Mikro, Kecil, dan Menengah) merupakan sektor penting dalam perekonomian
                            kalurahan. Setiap jenis UMKM memiliki peran strategis dalam menciptakan lapangan kerja,
                            meningkatkan pendapatan masyarakat, dan melestarikan potensi lokal.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
