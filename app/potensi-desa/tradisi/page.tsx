import { Landmark, MapPin, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

function getJenisBadge(jenis: string) {
    const styles: Record<string, string> = {
        TRADISI: "bg-violet-100 text-violet-800 border-violet-200",
        SENI: "bg-indigo-100 text-indigo-800 border-indigo-200",
        CAGAR_BUDAYA: "bg-amber-100 text-amber-800 border-amber-200",
        KEGIATAN_KEAGAMAAN: "bg-blue-100 text-blue-800 border-blue-200",
        WISATA: "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
    return styles[jenis] || "bg-gray-100 text-gray-800 border-gray-200";
}

function getJenisLabel(jenis: string): string {
    const labels: Record<string, string> = {
        TRADISI: "Tradisi",
        SENI: "Seni",
        CAGAR_BUDAYA: "Cagar Budaya",
        KEGIATAN_KEAGAMAAN: "Keagamaan",
        WISATA: "Wisata",
    };
    return labels[jenis] || jenis;
}

export default async function TradisiPage() {
    const traditions = await prisma.tradisiBudaya.findMany({
        where: {
            aktif: true,
            jenis: { in: ["TRADISI", "SENI"] },
        },
        include: {
            padukuhan: { select: { nama: true, slug: true } },
        },
        orderBy: { nama: "asc" },
    });

    // Group by padukuhan
    const grouped = traditions.reduce<Record<string, typeof traditions>>((acc, t) => {
        const key = t.padukuhan?.nama || "Tanpa Padukuhan";
        if (!acc[key]) acc[key] = [];
        acc[key].push(t);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-100 rounded-full">
                        <Landmark className="h-10 w-10 text-violet-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Tradisi & Budaya</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Tradisi dan budaya lokal yang menjadi identitas dan kebanggaan masyarakat Kalurahan Banyuraden
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-violet-100 to-violet-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Landmark className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-violet-900">{traditions.length}</div>
                            <p className="text-xs text-violet-700">Total Tradisi & Budaya</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-200 border-0">
                        <CardContent className="p-4 text-center">
                            <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-emerald-900">
                                {Object.keys(grouped).length}
                            </div>
                            <p className="text-xs text-emerald-700">Padukuhan</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-blue-900">{traditions.filter((t) => t.waktu).length}</div>
                            <p className="text-xs text-blue-700">Ada Jadwal</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tradisi by Padukuhan */}
                {Object.entries(grouped).map(([padukuhan, items]) => (
                    <Card key={padukuhan}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-violet-600" />
                                {padukuhan}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map((tradisi) => (
                                    <Card key={tradisi.id}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{tradisi.nama}</CardTitle>
                                            <CardDescription>
                                                <Badge className={getJenisBadge(tradisi.jenis)}>
                                                    {getJenisLabel(tradisi.jenis)}
                                                </Badge>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                                                {tradisi.deskripsi}
                                            </p>
                                            {tradisi.waktu && (
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>Waktu: {tradisi.waktu}</span>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Info */}
                <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
                    <CardHeader>
                        <CardTitle className="text-violet-800">Tentang Tradisi & Budaya</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Tradisi dan budaya di Kalurahan Banyuraden merupakan warisan leluhur yang masih terus
                            dilestarinkan. Setiap tradisi memiliki makna dan filosofi yang mendalam tentang kehidupan
                            masyarakat. Pelestarian tradisi ini penting untuk menjaga identitas dan kearifan lokal.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
