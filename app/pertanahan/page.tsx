import { Map, Building2, Landmark } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

function formatNumber(num: number | null): string {
    if (num === null) return "-";
    return new Intl.NumberFormat("id-ID").format(num);
}

function formatPercent(num: number | null): string {
    if (num === null) return "-";
    return `${num.toFixed(1)}%`;
}

export default async function PertanahanPage() {
    const pertanahan = prisma.pertanahan ? await prisma.pertanahan.findMany({
        include: {
            padukuhan: { select: { nama: true, slug: true } },
        },
        orderBy: { padukuhan: { nama: "asc" } },
    }) : [];

    // Calculate totals
    const totalBidang = pertanahan.reduce((sum, p) => sum + (p.totalBidang || 0), 0);
    const bersertifikat = pertanahan.reduce((sum, p) => sum + (p.bersertifikat || 0), 0);
    const totalPenduduk = pertanahan.reduce((sum, p) => sum + (p.padukuhan ? 0 : 0), 0);

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full">
                        <Map className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Data Pertanahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Data pertanahan per padukuhan di wilayah Kalurahan Banyuraden meliputi kepemilikan tanah,
                        sertifikat, dan jenis-jenis tanah
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Map className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-emerald-900">{pertanahan.length}</div>
                            <p className="text-xs text-emerald-700">Padukuhan</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-blue-900">{formatNumber(totalBidang)}</div>
                            <p className="text-xs text-blue-700">Total Bidang</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-green-100 to-green-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Landmark className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-green-900">{formatNumber(bersertifikat)}</div>
                            <p className="text-xs text-green-700">Bersertifikat</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-violet-100 to-violet-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Landmark className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-violet-900">
                                {pertanahan.length > 0
                                    ? formatPercent((bersertifikat / totalBidang) * 100)
                                    : "-"}
                            </div>
                            <p className="text-xs text-violet-700">% Bersertifikat</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Map className="h-5 w-5 text-emerald-600" />
                            Ringkasan Pertanahan per Padukuhan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {pertanahan.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                Data pertanahan sedang dalam proses pemutakhiran.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Padukuhan</TableHead>
                                        <TableHead className="text-right">Total Bidang</TableHead>
                                        <TableHead className="text-right">Bersertifikat</TableHead>
                                        <TableHead className="text-right">% Bersertifikat</TableHead>
                                        <TableHead className="text-right">Bukan Hak Milik</TableHead>
                                        <TableHead className="text-right">% BHM</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pertanahan.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="font-medium">{p.padukuhan.nama}</TableCell>
                                            <TableCell className="text-right">
                                                {formatNumber(p.totalBidang)}
                                            </TableCell>
                                            <TableCell className="text-right text-green-600 font-medium">
                                                {formatNumber(p.bersertifikat)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatPercent(p.persenSertifikat)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatNumber(p.bukanHakMilik)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatPercent(p.persentaseBHM)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {/* Totals Row */}
                                    <TableRow className="font-bold bg-muted/50">
                                        <TableCell>Total</TableCell>
                                        <TableCell className="text-right">
                                            {formatNumber(totalBidang)}
                                        </TableCell>
                                        <TableCell className="text-right text-green-600">
                                            {formatNumber(bersertifikat)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatPercent(
                                                totalBidang > 0 ? (bersertifikat / totalBidang) * 100 : null
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">-</TableCell>
                                        <TableCell className="text-right">-</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Detail per Padukuhan */}
                {pertanahan.map((p) => {
                    const hasDetail = p.tanahSultan || p.tanahPalungguh || p.tanahWakaf || p.tanahPutih || p.tanahKasDesa;
                    if (!hasDetail) return null;

                    return (
                        <Card key={p.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Map className="h-5 w-5 text-emerald-600" />
                                    {p.padukuhan.nama}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {p.tanahSultan && (
                                        <div className="bg-emerald-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-sm text-emerald-800 mb-1">
                                                Tanah Sultan
                                            </h4>
                                            <p className="text-xs text-emerald-700 whitespace-pre-line">
                                                {p.tanahSultan}
                                            </p>
                                        </div>
                                    )}
                                    {p.tanahPalungguh && (
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-sm text-blue-800 mb-1">
                                                Tanah Palungguh
                                            </h4>
                                            <p className="text-xs text-blue-700 whitespace-pre-line">
                                                {p.tanahPalungguh}
                                            </p>
                                        </div>
                                    )}
                                    {p.tanahWakaf && (
                                        <div className="bg-purple-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-sm text-purple-800 mb-1">
                                                Tanah Wakaf
                                            </h4>
                                            <p className="text-xs text-purple-700 whitespace-pre-line">
                                                {p.tanahWakaf}
                                            </p>
                                        </div>
                                    )}
                                    {p.tanahPutih && (
                                        <div className="bg-amber-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-sm text-amber-800 mb-1">
                                                Tanah Putih
                                            </h4>
                                            <p className="text-xs text-amber-700 whitespace-pre-line">
                                                {p.tanahPutih}
                                            </p>
                                        </div>
                                    )}
                                    {p.tanahKasDesa && (
                                        <div className="bg-pink-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-sm text-pink-800 mb-1">
                                                Tanah Kas Desa
                                            </h4>
                                            <p className="text-xs text-pink-700 whitespace-pre-line">
                                                {p.tanahKasDesa}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {p.catatan && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold text-sm mb-1">Catatan</h4>
                                        <p className="text-xs text-muted-foreground whitespace-pre-line">
                                            {p.catatan}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}

                {/* Info */}
                <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                    <CardHeader>
                        <CardTitle className="text-emerald-800">Tentang Pertanahan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <p>
                                Data pertanahan mencatat kepemilikan, jenis, dan status sertifikat tanah di setiap
                                padukuhan. Data ini penting untuk perencanaan pembangunan dan pengelolaan aset kalurahan.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Jenis Tanah:</h4>
                                    <ul className="space-y-1">
                                        <li>• Tanah Sultan: Tanah warisan kerajaan</li>
                                        <li>• Tanah Palungguh: Tanah hak milik</li>
                                        <li>• Tanah Wakaf: Tanah untuk keagamaan</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Klasifikasi:</h4>
                                    <ul className="space-y-1">
                                        <li>• Tanah Putih: Tanah negara</li>
                                        <li>• Tanah Kas Desa: Aset kalurahan</li>
                                        <li>• Hak Milik: Kepemilikan penuh</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Sertifikat:</h4>
                                    <ul className="space-y-1">
                                        <li>• Status kepemilikan resmi</li>
                                        <li>• Dasar hukum kepemilikan</li>
                                        <li>• Potensi pengembangan aset</li>
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
