import Link from "next/link";
import { Store, Landmark, Sprout } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function PotensiDesaPage() {
    const [umkmCount, tradisiCount, cagarBudayaCount] = await Promise.all([
        (prisma && prisma.umkm) ? prisma.umkm.count({ where: { aktif: true } }) : 0,
        (prisma && prisma.tradisiBudaya) ? prisma.tradisiBudaya.count({
            where: { aktif: true, jenis: { in: ["TRADISI", "SENI"] } },
        }) : 0,
        (prisma && prisma.tradisiBudaya) ? prisma.tradisiBudaya.count({
            where: { aktif: true, jenis: "CAGAR_BUDAYA" },
        }) : 0,
    ]);

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full">
                        <Sprout className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Potensi Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kekayaan potensi Kalurahan Banyuraden yang mencakup UMKM, tradisi & budaya, serta cagar budaya
                    </p>
                </div>

                {/* Info Card */}
                <Card className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200">
                    <CardHeader>
                        <CardTitle className="text-emerald-800">Potensi Kalurahan Banyuraden</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Kalurahan Banyuraden memiliki berbagai potensi yang dapat dikembangkan, mulai dari UMKM,
                            tradisi & budaya lokal, hingga cagar budaya yang menjadi identitas masyarakat. Setiap
                            potensi memiliki peran penting dalam perekonomian dan kearifan lokal.
                        </p>
                    </CardContent>
                </Card>

                {/* Category Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* UMKM Card */}
                    <Link href="/potensi-desa/umkm">
                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                            <div className="relative h-48 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-t-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Store className="h-20 w-20 text-white/30" />
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-emerald-800">
                                        {umkmCount} UMKM
                                    </span>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-emerald-700 flex items-center gap-2">
                                    <Store className="h-5 w-5" />
                                    UMKM
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Usaha Mikro, Kecil, dan Menengah yang menjadi tulang punggung perekonomian
                                    masyarakat di setiap padukuhan.
                                </p>
                                <div className="mt-4">
                                    <Button variant="outline" className="w-full">
                                        Lihat UMKM &rarr;
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Tradisi & Budaya Card */}
                    <Link href="/potensi-desa/tradisi">
                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                            <div className="relative h-48 bg-gradient-to-br from-violet-400 to-purple-600 rounded-t-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Landmark className="h-20 w-20 text-white/30" />
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-violet-800">
                                        {tradisiCount} Tradisi
                                    </span>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-violet-700 flex items-center gap-2">
                                    <Landmark className="h-5 w-5" />
                                    Tradisi & Budaya
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Tradisi dan budaya yang menjadi identitas masyarakat Banyuraden dan terus
                                    dilestarinkan hingga saat ini.
                                </p>
                                <div className="mt-4">
                                    <Button variant="outline" className="w-full">
                                        Lihat Tradisi &rarr;
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Cagar Budaya Card */}
                    <Link href="/potensi-desa/cagar-budaya">
                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                            <div className="relative h-48 bg-gradient-to-br from-amber-400 to-orange-600 rounded-t-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Landmark className="h-20 w-20 text-white/30" />
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-amber-800">
                                        {cagarBudayaCount} Cagar Budaya
                                    </span>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-amber-700 flex items-center gap-2">
                                    <Landmark className="h-5 w-5" />
                                    Cagar Budaya
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Bangunan, situs, atau objek yang memiliki nilai sejarah dan budaya tinggi
                                    untuk dilestarinkan.
                                </p>
                                <div className="mt-4">
                                    <Button variant="outline" className="w-full">
                                        Lihat Cagar Budaya &rarr;
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Additional Info */}
                <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-800">Tentang Potensi Desa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <p>
                                Potensi desa adalah segala sumber daya, baik alam maupun manusia, yang dapat
                                dikembangkan untuk meningkatkan kesejahteraan masyarakat dan kemajuan kalurahan.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">UMKM</h4>
                                    <ul className="space-y-1">
                                        <li>• Kuliner & minuman</li>
                                        <li>• Pertanian & peternakan</li>
                                        <li>• Pengolahan hasil tani</li>
                                        <li>• Kerajinan tangan</li>
                                        <li>• Jasa & perdagangan</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Tradisi & Budaya</h4>
                                    <ul className="space-y-1">
                                        <li>• Upacara adat</li>
                                        <li>• Seni tradisional</li>
                                        <li>• Festival tahunan</li>
                                        <li>• Kearifan lokal</li>
                                        <li>• Lagu & cerita rakyat</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Cagar Budaya</h4>
                                    <ul className="space-y-1">
                                        <li>• Bangunan bersejarah</li>
                                        <li>• Situs arkeologi</li>
                                        <li>• Objek alam bersejarah</li>
                                        <li>• Taman budaya</li>
                                        <li>• Jejak sejarah</li>
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
