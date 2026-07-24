import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Users, Home, Building2, School, Heart, Store, Landmark, Map } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

function formatNumber(num: number | null): string {
    if (num === null) return "-";
    return new Intl.NumberFormat("id-ID").format(num);
}

function formatCurrency(amount: number | null | undefined): string {
    if (amount === null || amount === undefined) return "-";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
}

export default async function DetailPadukuhanPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const padukuhan = await prisma.padukuhan.findUnique({
        where: { slug },
        include: {
            fasilitas: true,
            umkm: true,
            traditions: true,
            wisatas: true,
            pertanahan: true,
            aparatur: {
                where: { kelompok: "DUKUH" },
                orderBy: { urutan: "asc" },
            },
        },
    });

    if (!padukuhan) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Back Button */}
                <Link href="/profil-padukuhan">
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali ke Daftar Padukuhan
                    </Button>
                </Link>

                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <MapPin className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">{padukuhan.nama}</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Profil lengkap padukuhan yang mencakup data kependudukan, fasilitas, dan potensi wilayah
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Penduduk
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-blue-900">
                                {formatNumber(padukuhan.totalPenduduk)}
                            </div>
                            <p className="text-xs text-blue-700">jiwa</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-200 border-0">
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Kartu Keluarga
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-emerald-900">{formatNumber(padukuhan.jumlahKK)}</div>
                            <p className="text-xs text-emerald-700">KK</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden bg-linear-to-br from-violet-100 to-violet-200 border-0">
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-violet-800 flex items-center gap-2">
                                <Map className="h-4 w-4" />
                                Luas Wilayah
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-violet-900">
                                {padukuhan.luasHa ? `${padukuhan.luasHa.toFixed(1)}` : "-"}
                            </div>
                            <p className="text-xs text-violet-700">hektar</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden bg-linear-to-br from-amber-100 to-amber-200 border-0">
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                RW / RT
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-2xl font-bold text-amber-900">
                                {padukuhan.jumlahRW || 0} / {padukuhan.jumlahRT || 0}
                            </div>
                            <p className="text-xs text-amber-700">RW / RT</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Description & Kepala Dusun */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-blue-600" />
                                Tentang {padukuhan.nama}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm max-w-none">
                                {padukuhan.deskripsi ? (
                                    <p className="text-muted-foreground whitespace-pre-line">
                                        {padukuhan.deskripsi}
                                    </p>
                                ) : (
                                    <p className="text-muted-foreground">Data deskripsi padukuhan belum tersedia.</p>
                                )}
                            </div>
                            {padukuhan.kampung && (
                                <div className="mt-4 pt-4 border-t">
                                    <h4 className="font-semibold mb-2">Kampung & Perumahan</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                                        {padukuhan.kampung}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Data Kependudukan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Total Penduduk</TableCell>
                                        <TableCell className="text-right">
                                            {formatNumber(padukuhan.totalPenduduk)} jiwa
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Laki-laki</TableCell>
                                        <TableCell className="text-right text-blue-600">
                                            {formatNumber(padukuhan.jumlahLakiLaki)} jiwa
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Perempuan</TableCell>
                                        <TableCell className="text-right text-pink-600">
                                            {formatNumber(padukuhan.jumlahPerempuan)} jiwa
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Kartu Keluarga</TableCell>
                                        <TableCell className="text-right">
                                            {formatNumber(padukuhan.jumlahKK)} KK
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">RW</TableCell>
                                        <TableCell className="text-right">{padukuhan.jumlahRW || 0}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">RT</TableCell>
                                        <TableCell className="text-right">{padukuhan.jumlahRT || 0}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Facilities per Category */}
                {padukuhan.fasilitas.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-blue-600" />
                                Fasilitas di {padukuhan.nama}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Group by jenis */}
                            {(() => {
                                const groups: Record<string, typeof padukuhan.fasilitas> = {};
                                padukuhan.fasilitas.forEach((f) => {
                                    const key = f.jenis;
                                    if (!groups[key]) groups[key] = [];
                                    groups[key].push(f);
                                });

                                const jenisLabels: Record<string, { icon: typeof Building2; color: string; label: string }> = {
                                    SD: { icon: School, color: "blue", label: "Sekolah Dasar" },
                                    SMP: { icon: School, color: "blue", label: "Sekolah Menengah Pertama" },
                                    SMA: { icon: School, color: "blue", label: "Sekolah Menengah Atas" },
                                    SMK: { icon: School, color: "blue", label: "Sekolah Menengah Kejuruan" },
                                    TK: { icon: School, color: "blue", label: "Taman Kanak-kanak" },
                                    PAUD: { icon: School, color: "blue", label: "Pendidikan Anak Usia Dini" },
                                    KLINIK: { icon: Heart, color: "red", label: "Klinik" },
                                    POSYANDU: { icon: Heart, color: "red", label: "Posyandu" },
                                    MASJID: { icon: Landmark, color: "emerald", label: "Masjid" },
                                    MUSHOLA: { icon: Landmark, color: "emerald", label: "Mushola" },
                                };

                                return Object.entries(groups).map(([jenis, facilities]) => {
                                    const info = jenisLabels[jenis] || { icon: Building2, color: "gray", label: jenis };
                                    const Icon = info.icon;
                                    return (
                                        <div key={jenis} className="mb-6 last:mb-0">
                                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                                <Icon className={`h-5 w-5 text-${info.color}-600`} />
                                                {info.label}
                                            </h3>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Nama</TableHead>
                                                        <TableHead>Alamat</TableHead>
                                                        <TableHead className="text-right">Kontak</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {facilities.map((f) => (
                                                        <TableRow key={f.id}>
                                                            <TableCell className="font-medium">{f.nama}</TableCell>
                                                            <TableCell className="text-sm">
                                                                {f.alamat || "-"}
                                                            </TableCell>
                                                            <TableCell className="text-right text-sm">
                                                                {f.telepon || "-"}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    );
                                });
                            })()}
                        </CardContent>
                    </Card>
                )}

                {/* UMKM Section */}
                {padukuhan.umkm.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Store className="h-5 w-5 text-blue-600" />
                                UMKM di {padukuhan.nama}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {padukuhan.umkm.map((umkm) => (
                                    <Card key={umkm.id}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{umkm.nama}</CardTitle>
                                            <CardDescription>
                                                <Badge variant="secondary">{umkm.jenis}</Badge>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {umkm.deskripsi || "Belum ada deskripsi."}
                                            </p>
                                            <div className="mt-3 pt-3 border-t space-y-1 text-xs text-muted-foreground">
                                                {umkm.pemilik && (
                                                    <p>Pemilik: {umkm.pemilik}</p>
                                                )}
                                                {umkm.telepon && (
                                                    <p>Telepon: {umkm.telepon}</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Tradisi & Budaya */}
                {padukuhan.traditions.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Landmark className="h-5 w-5 text-blue-600" />
                                Tradisi & Budaya
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {padukuhan.traditions.map((tradisi) => (
                                    <Card key={tradisi.id}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{tradisi.nama}</CardTitle>
                                            <CardDescription>
                                                <Badge variant="outline">{tradisi.jenis}</Badge>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {tradisi.deskripsi}
                                            </p>
                                            {tradisi.waktu && (
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    Waktu: {tradisi.waktu}
                                                </p>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Links */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Link href={`/potensi-desa/umkm`}>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm">
                                    <Store className="h-4 w-4 text-blue-600" />
                                    UMKM Kalurahan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">Lihat seluruh UMKM di Kalurahan Banyuraden</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href={`/potensi-desa/tradisi`}>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm">
                                    <Landmark className="h-4 w-4 text-blue-600" />
                                    Tradisi & Budaya
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">Warisan budaya dan tradisi lokal</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href={`/fasilitas/pendidikan`}>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm">
                                    <School className="h-4 w-4 text-blue-600" />
                                    Fasilitas Pendidikan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">Informasi fasilitas pendidikan</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
