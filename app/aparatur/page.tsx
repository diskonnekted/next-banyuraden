import Link from "next/link";
import { Users, ArrowLeft, Mail, Phone, GraduationCap, Building } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

function getJabatanBadge(jabatan: string) {
    const colors: Record<string, string> = {
        LURAH: "bg-purple-100 text-purple-800 border-purple-200",
        CARIK: "bg-indigo-100 text-indigo-800 border-indigo-200",
        SEKRETARIS: "bg-blue-100 text-blue-800 border-blue-200",
        KAUR: "bg-cyan-100 text-cyan-800 border-cyan-200",
        KASI: "bg-teal-100 text-teal-800 border-teal-200",
        JAGABAYA: "bg-amber-100 text-amber-800 border-amber-200",
        DUKUH: "bg-emerald-100 text-emerald-800 border-emerald-200",
        BPKAL: "bg-violet-100 text-violet-800 border-violet-200",
        STAFF: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[jabatan] || "bg-gray-100 text-gray-800 border-gray-200";
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

function getKelompokIcon(kelompok: string | null) {
    switch (kelompok) {
        case "PEMERINTAH":
            return "bg-purple-600";
        case "BPKAL":
            return "bg-violet-600";
        case "DUKUH":
            return "bg-emerald-600";
        case "STAFF":
            return "bg-gray-600";
        default:
            return "bg-blue-600";
    }
}

export default async function AparaturPage() {
    const aparatur = await prisma.aparaturPamong.findMany({
        where: { aktif: true },
        orderBy: [
            { kelompok: "asc" },
            { urutan: "asc" },
        ],
    });

    const kelompoks = aparatur.reduce<Record<string, typeof aparatur>>((acc, a) => {
        const key = a.kelompok || "LAINNYA";
        if (!acc[key]) acc[key] = [];
        acc[key].push(a);
        return acc;
    }, {});

    const kelompokLabels: Record<string, { icon: string; title: string; description: string }> = {
        PEMERINTAH: {
            icon: "🏛️",
            title: "Pemerintah Kalurahan",
            description: "Lurah, Carik, Sekretaris, Kasi, dan Kaur",
        },
        BPKAL: {
            icon: "🏛️",
            title: "BPKal",
            description: "Badan Permusyawaratan Kalurahan",
        },
        DUKUH: {
            icon: "🏘️",
            title: "Kepala Dusun",
            description: "Kepala Dusun / Kepala Padukuhan",
        },
        STAFF: {
            icon: "👥",
            title: "Staff",
            description: "Perangkat Kalurahan lainnya",
        },
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full">
                        <Users className="h-10 w-10 text-purple-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Aparatur Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Perangkat pemerintahan Kalurahan Banyuraden yang bertugas melayani masyarakat
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/aparatur">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 text-center">
                                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-purple-900">{aparatur.length}</div>
                                <p className="text-xs text-muted-foreground">Total Aparatur</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/aparatur/bpkal">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 text-center">
                                <Building className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-violet-900">
                                    {aparatur.filter((a) => a.kelompok === "BPKAL").length}
                                </div>
                                <p className="text-xs text-muted-foreground">Anggota BPKal</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/aparatur/dukh">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 text-center">
                                <Building className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-emerald-900">
                                    {aparatur.filter((a) => a.kelompok === "DUKUH").length}
                                </div>
                                <p className="text-xs text-muted-foreground">Kepala Dusun</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/aparatur/staf">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 text-center">
                                <GraduationCap className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900">
                                    {aparatur.filter((a) => a.kelompok === "STAFF").length}
                                </div>
                                <p className="text-xs text-muted-foreground">Staff</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Aparatur by Kelompok */}
                {Object.entries(kelompoks).map(([kelompok, items]) => {
                    const info = kelompokLabels[kelompok] || { title: kelompok, description: "" };
                    return (
                        <div key={kelompok}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">{info.icon}</span>
                                <div>
                                    <h2 className="text-2xl font-bold text-primary">{info.title}</h2>
                                    <p className="text-sm text-muted-foreground">{info.description}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {items.map((a) => (
                                    <Card key={a.id}>
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col items-center text-center">
                                                <Avatar className="h-20 w-20 mb-4 ring-4 ring-offset-2 ring-blue-100">
                                                    <AvatarImage
                                                        src={a.foto || undefined}
                                                        alt={a.namaLengkap}
                                                    />
                                                    <AvatarFallback className={getKelompokIcon(a.kelompok)}>
                                                        {getInitials(a.namaLengkap)}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <h3 className="font-semibold text-lg">{a.namaLengkap}</h3>
                                                {a.gelar && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {a.gelar}
                                                    </p>
                                                )}
                                                <Badge className={`mt-2 border ${getJabatanBadge(a.jabatan)}`}>
                                                    {getJabatanLabel(a.jabatan)}
                                                </Badge>

                                                <div className="mt-4 space-y-2 w-full">
                                                    {a.pendidikan && (
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                                                            <GraduationCap className="h-3 w-3" />
                                                            <span>{a.pendidikan}</span>
                                                        </div>
                                                    )}
                                                    {a.telepon && (
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                                                            <Phone className="h-3 w-3" />
                                                            <span>{a.telepon}</span>
                                                        </div>
                                                    )}
                                                    {a.email && (
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                                                            <Mail className="h-3 w-3" />
                                                            <span className="truncate">{a.email}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
