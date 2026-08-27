import { Lightbulb, Flame, ShoppingCart, Utensils, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

function getKategoriBadge(kategori: string) {
    const styles: Record<string, string> = {
        TEKNOLOGI: "bg-blue-100 text-blue-800 border-blue-200",
        PANGAN: "bg-green-100 text-green-800 border-green-200",
        PERTANAHAN: "bg-emerald-100 text-emerald-800 border-emerald-200",
        PELAYANAN: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return styles[kategori] || "bg-gray-100 text-gray-800 border-gray-200";
}

function getKategoriIcon(kategori: string | null) {
    const k = kategori || "TEKNOLOGI";
    switch (k) {
        case "TEKNOLOGI":
            return <Lightbulb className="h-6 w-6 text-blue-600" />;
        case "PANGAN":
            return <ShoppingCart className="h-6 w-6 text-green-600" />;
        case "PERTANAHAN":
            return <Users className="h-6 w-6 text-emerald-600" />;
        case "PELAYANAN":
            return <Utensils className="h-6 w-6 text-purple-600" />;
        default:
            return <Lightbulb className="h-6 w-6 text-gray-600" />;
    }
}

function getKategoriLabel(kategori: string | null): string {
    const k = kategori || "TEKNOLOGI";
    const labels: Record<string, string> = {
        TEKNOLOGI: "Teknologi",
        PANGAN: "Pangan",
        PERTANAHAN: "Pertanahan",
        PELAYANAN: "Pelayanan",
    };
    return labels[k] || k;
}

export default async function InovasiPage() {
    const inovasiList = prisma.inovasi ? await prisma.inovasi.findMany({
        where: { aktif: true },
        orderBy: { nama: "asc" },
    }) : [];

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <Lightbulb className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Inovasi Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Program inovasi pelayanan dan pembangunan yang diterapkan di Kalurahan Banyuraden
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Lightbulb className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-blue-900">{inovasiList.length}</div>
                            <p className="text-xs text-blue-700">Total Inovasi</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-green-100 to-green-200 border-0">
                        <CardContent className="p-4 text-center">
                            <ShoppingCart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-green-900">
                                {inovasiList.filter((i) => i.kategori === "PANGAN").length}
                            </div>
                            <p className="text-xs text-green-700">Inovasi Pangan</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-purple-100 to-purple-200 border-0">
                        <CardContent className="p-4 text-center">
                            <Utensils className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-purple-900">
                                {inovasiList.filter((i) => i.kategori === "PELAYANAN").length}
                            </div>
                            <p className="text-xs text-purple-700">Inovasi Pelayanan</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Info */}
                <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-800">Program Inovasi Unggulan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
                                    <Flame className="h-5 w-5" />
                                    Thermal Decomposer
                                </h4>
                                <p className="text-sm text-blue-700">
                                    Teknologi pengolah sampah menggunakan prinsip dekomposisi termal untuk mengurangi
                                    volume sampah secara signifikan.
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-900 flex items-center gap-2 mb-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    Lumbung Pangan
                                </h4>
                                <p className="text-sm text-green-700">
                                    Program ketahanan pangan masyarakat melalui pengelolaan dan distribusi pangan
                                    dari hasil pertanian lokal.
                                </p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-purple-900 flex items-center gap-2 mb-2">
                                    <Users className="h-5 w-5" />
                                    Siap Raden
                                </h4>
                                <p className="text-sm text-purple-700">
                                    Sistem informasi pelayanan publik terintegrasi yang memudahkan warga mengakses
                                    layanan kalurahan secara cepat dan transparan.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Inovasi Cards */}
                {inovasiList.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Belum Ada Data</h3>
                            <p className="text-muted-foreground">Data inovasi sedang dalam proses pemutakhiran.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inovasiList.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                                <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-600 relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {getKategoriIcon(item.kategori || "TEKNOLOGI")}
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm">
                                            {getKategoriLabel(item.kategori || "TEKNOLOGI")}
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-lg">{item.nama}</CardTitle>
                                    {item.tahun && (
                                        <CardDescription>Tahun {item.tahun}</CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-4">
                                        {item.deskripsi}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
