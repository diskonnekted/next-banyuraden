import { School, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

function getJenisBadge(jenis: string) {
    const styles: Record<string, string> = {
        SD: "bg-blue-100 text-blue-800 border-blue-200",
        SMP: "bg-indigo-100 text-indigo-800 border-indigo-200",
        SMA: "bg-violet-100 text-violet-800 border-violet-200",
        SMK: "bg-purple-100 text-purple-800 border-purple-200",
        TK: "bg-pink-100 text-pink-800 border-pink-200",
        PAUD: "bg-rose-100 text-rose-800 border-rose-200",
        PONDOK_PESANTREN: "bg-emerald-100 text-emerald-800 border-emerald-200",
        PERGURUAN_TINGGI: "bg-sky-100 text-sky-800 border-sky-200",
    };
    return styles[jenis] || "bg-gray-100 text-gray-800 border-gray-200";
}

function getJenisLabel(jenis: string): string {
    const labels: Record<string, string> = {
        SD: "Sekolah Dasar",
        SMP: "Sekolah Menengah Pertama",
        SMA: "Sekolah Menengah Atas",
        SMK: "Sekolah Menengah Kejuruan",
        TK: "Taman Kanak-kanak",
        PAUD: "Pendidikan Anak Usia Dini",
        PONDOK_PESANTREN: "Pondok Pesantren",
        PERGURUAN_TINGGI: "Perguruan Tinggi",
    };
    return labels[jenis] || jenis;
}

export default async function PendidikanPage() {
    const fasilitas = await prisma.fasilitasPadukuhan.findMany({
        where: {
            aktif: true,
            jenis: {
                in: ["SD", "SMP", "SMA", "SMK", "TK", "PAUD", "PONDOK_PESANTREN", "PERGURUAN_TINGGI"],
            },
        },
        include: {
            padukuhan: { select: { nama: true, slug: true } },
        },
        orderBy: { nama: "asc" },
    });

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
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <School className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Fasilitas Pendidikan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Lembaga pendidikan dari tingkat dini hingga menengah di wilayah Kalurahan Banyuraden
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <School className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-blue-900">{fasilitas.length}</div>
                            <p className="text-xs text-blue-700">Total Fasilitas</p>
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
                    <Card className="relative overflow-hidden bg-linear-to-br from-purple-100 to-purple-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Badge variant="outline">SD</Badge>
                            <div className="text-xs text-purple-700 mt-2">
                                {fasilitas.filter((f) => f.jenis === "SD").length} sekolah
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-amber-100 to-amber-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Badge variant="outline">TK/PAUD</Badge>
                            <div className="text-xs text-amber-700 mt-2">
                                {fasilitas.filter((f) => ["TK", "PAUD"].includes(f.jenis)).length} lembaga
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Pendidikan per Padukuhan */}
                {Object.entries(grouped).map(([padukuhan, items]) => (
                    <Card key={padukuhan}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-blue-600" />
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
                                                    <div className="text-xs">Jam: {f.jamOperasi}</div>
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
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-800">Tentang Fasilitas Pendidikan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Fasilitas pendidikan di Kalurahan Banyuraden mencakup berbagai jenjang dari Taman Kanak-kanak,
                            Sekolah Dasar, Sekolah Menengah Pertama, hingga Sekolah Menengah Atas. Fasilitas ini menjadi
                            tulang punggung dalam pengembangan sumber daya manusia kalurahan.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
