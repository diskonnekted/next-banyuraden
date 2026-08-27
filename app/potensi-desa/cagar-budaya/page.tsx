import { Landmark, MapPin, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

function getJenisBadge(jenis: string) {
    const styles: Record<string, string> = {
        CAGAR_BUDAYA: "bg-amber-100 text-amber-800 border-amber-200",
        TRADISI: "bg-violet-100 text-violet-800 border-violet-200",
        SENI: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return styles[jenis] || "bg-gray-100 text-gray-800 border-gray-200";
}

function getJenisLabel(jenis: string): string {
    const labels: Record<string, string> = {
        CAGAR_BUDAYA: "Cagar Budaya",
        TRADISI: "Tradisi",
        SENI: "Seni",
    };
    return labels[jenis] || jenis;
}

export default async function CagarBudayaPage() {
    const cagarBudaya = prisma.tradisiBudaya ? await prisma.tradisiBudaya.findMany({
        where: {
            aktif: true,
            jenis: "CAGAR_BUDAYA",
        },
        include: {
            padukuhan: { select: { nama: true, slug: true } },
        },
        orderBy: { nama: "asc" },
    }) : [];

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full">
                        <Landmark className="h-10 w-10 text-amber-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Cagar Budaya</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Objek cagar budaya yang menjadi warisan sejarah dan identitas masyarakat Kalurahan Banyuraden
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-amber-100 to-amber-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Landmark className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-amber-900">{cagarBudaya.length}</div>
                            <p className="text-xs text-amber-700">Total Cagar Budaya</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-200 border-0">
                        <CardContent className="p-4 text-center">
                            <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-emerald-900">
                                {new Set(cagarBudaya.map((c) => c.padukuhan?.nama)).size}
                            </div>
                            <p className="text-xs text-emerald-700">Padukuhan</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-blue-900">{cagarBudaya.filter((c) => c.waktu).length}</div>
                            <p className="text-xs text-blue-700">Ada Jadwal</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Info Card */}
                <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                    <CardHeader>
                        <CardTitle className="text-amber-800">Tentang Cagar Budaya</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Cagar budaya adalah hasil kegiatan kebudayaan di darat dan/atau di air berupa benda,
                            struktur bangunan, situs, kawasan arkeologi, dan benda alam yang memiliki nilai sejarah,
                            ilmu pengetahuan, dan kebudayaan untuk dipelihara.
                        </p>
                    </CardContent>
                </Card>

                {/* Cagar Budaya Grid */}
                {cagarBudaya.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Landmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Belum Ada Data</h3>
                            <p className="text-muted-foreground">
                                Data cagar budaya sedang dalam proses pemutakhiran.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cagarBudaya.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-600 relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Landmark className="h-16 w-16 text-white/30" />
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-white/90 text-amber-700 backdrop-blur-sm">
                                            Cagar Budaya
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">{item.nama}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {item.padukuhan && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                <span>{item.padukuhan.nama}</span>
                                            </div>
                                        )}
                                        {item.waktu && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                <span>Waktu: {item.waktu}</span>
                                            </div>
                                        )}
                                        {item.deskripsi && (
                                            <p className="text-sm text-muted-foreground line-clamp-4 mt-2">
                                                {item.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
