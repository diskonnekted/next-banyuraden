import { MapPin, Compass, Camera } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

function getJenisBadge(jenis: string) {
    const styles: Record<string, string> = {
        WISATA_EDUKASI: "bg-blue-100 text-blue-800 border-blue-200",
        WISATA_ALAM: "bg-green-100 text-green-800 border-green-200",
        WISATA_BUDAYA: "bg-violet-100 text-violet-800 border-violet-200",
        WISATA_KULINER: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return styles[jenis] || "bg-gray-100 text-gray-800 border-gray-200";
}

function getJenisLabel(jenis: string): string {
    const labels: Record<string, string> = {
        WISATA_EDUKASI: "Wisata Edukasi",
        WISATA_ALAM: "Wisata Alam",
        WISATA_BUDAYA: "Wisata Budaya",
        WISATA_KULINER: "Wisata Kuliner",
    };
    return labels[jenis] || jenis;
}

export default async function WisataPage() {
    const wisatas = prisma.wisata ? await prisma.wisata.findMany({
        where: { aktif: true },
        include: {
            padukuhan: { select: { nama: true, slug: true } },
        },
        orderBy: { nama: "asc" },
    }) : [];

    // Group by padukuhan
    const grouped = wisatas.reduce<Record<string, typeof wisatas>>((acc, w) => {
        const key = w.padukuhan?.nama || "Tanpa Padukuhan";
        if (!acc[key]) acc[key] = [];
        acc[key].push(w);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full">
                        <Compass className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Destinasi Wisata</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Tempat wisata menarik di wilayah Kalurahan Banyuraden untuk dikunjungi
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Compass className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-emerald-900">{wisatas.length}</div>
                            <p className="text-xs text-emerald-700">Total Wisata</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Compass className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-blue-900">
                                {wisatas.filter((w) => w.jenis === "WISATA_EDUKASI").length}
                            </div>
                            <p className="text-xs text-blue-700">Wisata Edukasi</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-green-100 to-green-200 border-0">
                        <CardContent className="p-4 text-center">
                            <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-green-900">
                                {wisatas.filter((w) => w.jenis === "WISATA_ALAM").length}
                            </div>
                            <p className="text-xs text-green-700">Wisata Alam</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-violet-100 to-violet-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Camera className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-violet-900">
                                {wisatas.filter((w) => w.jenis === "WISATA_BUDAYA").length}
                            </div>
                            <p className="text-xs text-violet-700">Wisata Budaya</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Info */}
                <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                    <CardHeader>
                        <CardTitle className="text-emerald-800">Wisata Kalurahan Banyuraden</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Kalurahan Banyuraden memiliki beragam destinasi wisata menarik mulai dari wisata alam
                            yang asri, wisata budaya yang kaya, hingga wisata edukasi yang mendidik. Setiap destinasi
                            menawarkan pengalaman unik bagi pengunjung.
                        </p>
                    </CardContent>
                </Card>

                {/* Wisata per Padukuhan */}
                {Object.entries(grouped).map(([padukuhan, items]) => (
                    <Card key={padukuhan}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-emerald-600" />
                                {padukuhan}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map((wisata) => (
                                    <Card key={wisata.id} className="overflow-hidden">
                                        <div className="h-40 bg-gradient-to-br from-emerald-400 to-teal-600 relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Camera className="h-16 w-16 text-white/30" />
                                            </div>
                                            <div className="absolute top-3 right-3">
                                                <Badge className="bg-white/90 text-emerald-700 backdrop-blur-sm">
                                                    {getJenisLabel(wisata.jenis)}
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{wisata.nama}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {wisata.deskripsi && (
                                                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                                                    {wisata.deskripsi}
                                                </p>
                                            )}
                                            <div className="space-y-1 text-xs text-muted-foreground">
                                                {wisata.alamat && (
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3 shrink-0" />
                                                        <span className="line-clamp-1">{wisata.alamat}</span>
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

                {/* Kategori Legend */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Kategori Wisata</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-800 flex items-center gap-2 mb-1">
                                    <Compass className="h-4 w-4" />
                                    Wisata Edukasi
                                </h4>
                                <p className="text-xs text-blue-700">
                                    Tempat wisata yang memberikan pengalaman belajar dan pengetahuan baru
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-1">
                                    <MapPin className="h-4 w-4" />
                                    Wisata Alam
                                </h4>
                                <p className="text-xs text-green-700">
                                    Destinasi wisata alam yang menawarkan keindahan alam dan kesejukan
                                </p>
                            </div>
                            <div className="bg-violet-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-violet-800 flex items-center gap-2 mb-1">
                                    <Camera className="h-4 w-4" />
                                    Wisata Budaya
                                </h4>
                                <p className="text-xs text-violet-700">
                                    Tempat wisata yang menawarkan pengalaman budaya dan tradisi lokal
                                </p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-orange-800 flex items-center gap-2 mb-1">
                                    <Camera className="h-4 w-4" />
                                    Wisata Kuliner
                                </h4>
                                <p className="text-xs text-orange-700">
                                    Destinasi wisata yang menawarkan kuliner khas lokal yang lezat
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
