import { Heart, MapPin, Phone, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

function getJenisBadge(jenis: string) {
    const styles: Record<string, string> = {
        KLINIK: "bg-red-100 text-red-800 border-red-200",
        PRATIKA_DOKTER: "bg-blue-100 text-blue-800 border-blue-200",
        POSYANDU: "bg-green-100 text-green-800 border-green-200",
    };
    return styles[jenis] || "bg-gray-100 text-gray-800 border-gray-200";
}

function getJenisLabel(jenis: string): string {
    const labels: Record<string, string> = {
        KLINIK: "Klinik",
        PRATIKA_DOKTER: "Praktek Dokter",
        POSYANDU: "Posyandu",
    };
    return labels[jenis] || jenis;
}

export default async function KesehatanPage() {
    const fasilitas: any[] = (prisma && prisma.fasilitasPadukuhan) ? await prisma.fasilitasPadukuhan.findMany({
        where: {
            aktif: true,
            jenis: {
                in: ["KLINIK", "PRATIKA_DOKTER", "POSYANDU"],
            },
        },
        include: {
            padukuhan: { select: { nama: true, slug: true } },
        },
        orderBy: { nama: "asc" },
    }) : [];

    // Group by padukuhan
    const grouped = fasilitas.reduce<Record<string, typeof fasilitas>>((acc, f) => {
        const key = f.padukuhan?.nama || "Tanpa Padukuhan";
        if (!acc[key]) acc[key] = [];
        acc[key].push(f);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
                        <Heart className="h-10 w-10 text-red-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Fasilitas Kesehatan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Pusat pelayanan kesehatan yang tersedia di wilayah Kalurahan Banyuraden untuk masyarakat
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-red-100 to-red-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-red-900">{fasilitas.length}</div>
                            <p className="text-xs text-red-700">Total Fasilitas</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-green-100 to-green-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-green-900">
                                {fasilitas.filter((f) => f.jenis === "POSYANDU").length}
                            </div>
                            <p className="text-xs text-green-700">Posyandu</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Heart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-blue-900">
                                {fasilitas.filter((f) => f.jenis === "KLINIK").length}
                            </div>
                            <p className="text-xs text-blue-700">Klinik</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-violet-100 to-violet-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Heart className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-violet-900">
                                {fasilitas.filter((f) => f.jenis === "PRATIKA_DOKTER").length}
                            </div>
                            <p className="text-xs text-violet-700">Praktek Dokter</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Fasilitas per Padukuhan */}
                {Object.entries(grouped).map(([padukuhan, items]) => (
                    <Card key={padukuhan}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-red-600" />
                                {padukuhan}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map((f) => (
                                    <Card key={f.id}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{f.nama}</CardTitle>
                                            <Badge className={getJenisBadge(f.jenis)}>
                                                {getJenisLabel(f.jenis)}
                                            </Badge>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-1 text-sm text-muted-foreground">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                                    <span className="line-clamp-2">{f.alamat}</span>
                                                </div>
                                                {f.telepon && (
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4 shrink-0" />
                                                        <span>{f.telepon}</span>
                                                    </div>
                                                )}
                                                {f.jamOperasi && (
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 shrink-0" />
                                                        <span className="text-xs">{f.jamOperasi}</span>
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
                <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-800">Tentang Fasilitas Kesehatan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Fasilitas kesehatan di Kalurahan Banyuraden meliputi klinik, praktek dokter, dan posyandu
                            yang tersebar di berbagai padukuhan. Fasilitas ini menyediakan pelayanan kesehatan dasar
                            untuk masyarakat mulai dari pengobatan, pemeriksaan kehamilan, imunisasi, hingga
                            penimbangan balita.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
