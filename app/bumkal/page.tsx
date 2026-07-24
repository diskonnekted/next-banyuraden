import { Building2, Users, Store, Award, Phone, MapPin, Globe, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

function getJabatanBadge(jabatan: string) {
    const styles: Record<string, string> = {
        PENASEHAT: "bg-yellow-100 text-yellow-800 border-yellow-200",
        KETUA_PENGAWAS: "bg-amber-100 text-amber-800 border-amber-200",
        DIREKTUR: "bg-blue-100 text-blue-800 border-blue-200",
        SEKRETARIS: "bg-indigo-100 text-indigo-800 border-indigo-200",
        BENDAHARA: "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
    return styles[jabatan] || "bg-gray-100 text-gray-800 border-gray-200";
}

function getJabatanLabel(jabatan: string): string {
    const labels: Record<string, string> = {
        PENASEHAT: "Penasehat",
        KETUA_PENGAWAS: "Ketua Pengawas",
        DIREKTUR: "Direktur",
        SEKRETARIS: "Sekretaris",
        BENDAHARA: "Bendahara",
    };
    return labels[jabatan] || jabatan;
}

export default async function BumkalPage() {
    const bumkal = await prisma.bumkal.findFirst({
        where: { slug: "bgr" },
        include: {
            pengurus: { orderBy: { id: "asc" } },
            unitUsaha: { where: { aktif: true }, orderBy: { urutan: "asc" } },
        },
    });

    if (!bumkal) {
        return (
            <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-2">BUMKal BGR</h1>
                    <p className="text-muted-foreground">Data BUMKal sedang dalam proses pemutakhiran.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full">
                        <Building2 className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">{bumkal.nama}</h1>
                    {bumkal.tagline && (
                        <p className="text-xl text-muted-foreground italic">"{bumkal.tagline}"</p>
                    )}
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Badan Usaha Milik Kalurahan yang mengelola potensi ekonomi dan pemberdayaan masyarakat
                    </p>
                </div>

                {/* Profile Section */}
                <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-emerald-600" />
                            Profil BUMKal
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-sm max-w-none">
                            {bumkal.deskripsi ? (
                                <p className="text-muted-foreground whitespace-pre-line">{bumkal.deskripsi}</p>
                            ) : (
                                <p className="text-muted-foreground">Belum ada deskripsi.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="p-4 text-center">
                            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                            <div className="text-sm font-medium">Badan Hukum</div>
                            <div className="text-xs text-muted-foreground mt-1">{bumkal.badanHukum || "-"}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
                        <CardContent className="p-4 text-center">
                            <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <div className="text-sm font-medium">NPWP</div>
                            <div className="text-xs text-muted-foreground mt-1 break-all">{bumkal.npwp || "-"}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
                        <CardContent className="p-4 text-center">
                            <Globe className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                            <div className="text-sm font-medium">NIB</div>
                            <div className="text-xs text-muted-foreground mt-1">{bumkal.nib || "-"}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-linear-to-br from-amber-50 to-amber-100 border-amber-200">
                        <CardContent className="p-4 text-center">
                            <Store className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                            <div className="text-sm font-medium">Unit Usaha</div>
                            <div className="text-xs text-muted-foreground mt-1">{bumkal.unitUsaha.length} unit</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Dasar Hukum */}
                {bumkal.dasarHukum && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-blue-600" />
                                Dasar Hukum
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">
                                {bumkal.dasarHukum}
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pengurus Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Pengurus BUMKal
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {bumkal.pengurus.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                Data pengurus sedang dalam proses pemutakhiran.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Jabatan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bumkal.pengurus.map((p, index) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell className="font-medium">{p.namaLengkap}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={getJabatanBadge(p.jabatan)}>
                                                    {getJabatanLabel(p.jabatan)}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Unit Usaha Cards */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                            Unit Usaha
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {bumkal.unitUsaha.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                Data unit usaha sedang dalam proses pemutakhiran.
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {bumkal.unitUsaha.map((unit) => (
                                    <Card key={unit.id}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{unit.nama}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {unit.deskripsi && (
                                                <p className="text-sm text-muted-foreground line-clamp-3">
                                                    {unit.deskripsi}
                                                </p>
                                            )}
                                            <div className="mt-3">
                                                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                                                    Aktif
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
