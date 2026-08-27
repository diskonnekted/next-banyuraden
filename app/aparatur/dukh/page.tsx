import { Building2, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

function getInitials(name: string): string {
    return name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export default async function DukuPage() {
    const dukuhList = await prisma.aparaturPamong.findMany({
        where: {
            kelompok: "DUKUH",
            aktif: true,
        },
        orderBy: { urutan: "asc" },
    });

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full">
                        <Building2 className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Kepala Dusun / Kepala Padukuhan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kepala Dusun yang memimpin setiap padukuhan di wilayah Kalurahan Banyuraden
                    </p>
                </div>

                {/* Info Card */}
                <Card className="bg-linear-to-r from-emerald-50 to-teal-50 border-emerald-200">
                    <CardHeader>
                        <CardTitle className="text-emerald-800">Tentang Kepala Dusun</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Kepala Dusun (Kadu) atau Kepala Padukuhan adalah pemimpin tingkat dusun yang bertanggung
                            jawab atas penyelenggaraan pemerintahan di wilayah dusun. Kadu bertugas membantu Lurah
                            dalam melaksanakan pemerintahan dan pembangunan di tingkat dusun.
                        </p>
                    </CardContent>
                </Card>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-200 border-0">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Total Kepala Dusun
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-emerald-900">{dukuhList.length}</div>
                            <p className="text-xs text-emerald-700">seluruh padukuhan</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Padukuhan Terlayani
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-900">{dukuhList.length}</div>
                            <p className="text-xs text-blue-700">wilayah padukuhan</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Detail Table */}
                {dukuhList.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Belum Ada Data</h3>
                            <p className="text-muted-foreground">Data Kepala Dusun sedang dalam proses pemutakhiran.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Kepala Dusun</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">No</TableHead>
                                        <TableHead>Foto</TableHead>
                                        <TableHead>Nama Lengkap</TableHead>
                                        <TableHead>Telepon</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Pendidikan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dukuhList.map((dukuh, index) => (
                                        <TableRow key={dukuh.id}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={dukuh.foto || undefined}
                                                        alt={dukuh.namaLengkap}
                                                    />
                                                    <AvatarFallback className="bg-emerald-600 text-white text-xs">
                                                        {getInitials(dukuh.namaLengkap)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{dukuh.namaLengkap}</div>
                                                    {dukuh.gelar && (
                                                        <div className="text-xs text-muted-foreground">
                                                            {dukuh.gelar}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{dukuh.telepon || "-"}</TableCell>
                                            <TableCell className="text-sm">{dukuh.email || "-"}</TableCell>
                                            <TableCell className="text-sm">
                                                <Badge variant="outline">{dukuh.pendidikan || "-"}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
