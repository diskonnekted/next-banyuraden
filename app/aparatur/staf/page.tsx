import { Users, GraduationCap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

function getJabatanLabel(jabatan: string): string {
    const labels: Record<string, string> = {
        LURAH: "Lurah",
        CARIK: "Carik",
        SEKRETARIS: "Sekretaris",
        KAUR: "Kepala Urusan",
        KASI: "Kepala Seksi",
        JAGABAYA: "Jagabaya",
        DUKUH: "Kepala Dusun",
        BPKAL: "Anggota BPKal",
        STAFF: "Staff",
        ULU_ULU: "Ulu-Ulu",
    };
    return labels[jabatan] || jabatan;
}

export default async function StafPage() {
    const stafList = await prisma.aparaturPamong.findMany({
        where: { aktif: true },
        orderBy: [
            { kelompok: "asc" },
            { urutan: "asc" },
        ],
    });

    const stafFiltered = stafList.filter((a) => a.kelompok !== "DUKUH" && a.kelompok !== "BPKAL");

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full">
                        <Users className="h-10 w-10 text-gray-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Perangkat Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Seluruh perangkat kalurahan termasuk Lurah, Carik, Sekretaris, Kasi, Kaur, Jagabaya, dan Staf
                    </p>
                </div>

                {/* Info Card */}
                <Card className="bg-linear-to-r from-gray-50 to-slate-50 border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-gray-800">Struktur Perangkat Kalurahan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Perangkat kalurahan bertanggung jawab atas penyelenggaraan pemerintahan, pelaksanaan
                            pembangunan, dan pelayanan publik di Kalurahan Banyuraden. Perangkat kalurahan terdiri dari
                            Lurah, Perangkat kalurahan, dan Kepala Dusun.
                        </p>
                    </CardContent>
                </Card>

                {/* Grouped by Kelompok */}
                {Object.entries(
                    stafFiltered.reduce<Record<string, typeof stafList>>((acc, a) => {
                        const key = a.kelompok || "LAINNYA";
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(a);
                        return acc;
                    }, {})
                ).map(([kelompok, items]) => (
                    <Card key={kelompok}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-gray-600" />
                                {kelompok === "PEMERINTAH" && "Pemerintah Kalurahan"}
                                {kelompok === "STAFF" && "Staff"}
                                {kelompok === "BPKAL" && "Anggota BPKal"}
                                {kelompok === "DUKUH" && "Kepala Dusun"}
                                {kelompok === "LAINNYA" && kelompok}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {items.map((a) => (
                                    <Card key={a.id}>
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col items-center text-center">
                                                <Avatar className="h-16 w-16 mb-3 ring-4 ring-offset-2 ring-gray-100">
                                                    <AvatarImage
                                                        src={a.foto || undefined}
                                                        alt={a.namaLengkap}
                                                    />
                                                    <AvatarFallback className="bg-gray-600 text-white">
                                                        {getInitials(a.namaLengkap)}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <h3 className="font-semibold">{a.namaLengkap}</h3>
                                                {a.gelar && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {a.gelar}
                                                    </p>
                                                )}
                                                <Badge variant="secondary" className="mt-2">
                                                    {getJabatanLabel(a.jabatan)}
                                                </Badge>

                                                <div className="mt-3 space-y-1 w-full">
                                                    {a.pendidikan && (
                                                        <div className="text-xs text-muted-foreground">
                                                            Pendidikan: {a.pendidikan}
                                                        </div>
                                                    )}
                                                    {a.telepon && (
                                                        <div className="text-xs text-muted-foreground">
                                                            Telp: {a.telepon}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
