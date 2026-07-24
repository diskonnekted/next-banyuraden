import {
    Users,
    MapPin,
    Calendar,
    Mountain,
    Thermometer,
    CloudRain,
    TreePine,
    Building,
    Trophy,
    Award,
    History,
    TrendingUp,
    Route,
    Layers,
    Flag,
    ChevronRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { PegawaiDisplay } from "@/components/ui/custom/PegawaiDisplay";

async function getLurahData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5091'}/api/lurah`, {
            next: { revalidate: 3600 }
        });
        const data = await res.json();
        return data.current || null;
    } catch (error) {
        console.error("Error fetching lurah data:", error);
        return null;
    }
}

export default async function ProfilPage() {
    const lurahData = await getLurahData();
    const lurahName = lurahData?.nama_lurah || "Sudarisman, S.T.";
    const lurahGelar = lurahData?.gelar || "";
    const periode = lurahData ? `${lurahData.periode_awal}-${lurahData.periode_akhir || 'Sekarang'}` : "2021-2028";

    const kalurahanData = {
        nama: "Banyuraden",
        kapanewon: "Gamping",
        kabupaten: "Sleman",
        provinsi: "D.I Yogyakarta",
        kodePos: "55293",
        luasTotal: "400 Ha",
        tinggiDaerah: "143 mdpl",
        suhuRange: "24-33°C",
        curahHujan: "1.776 mm/th",
        penduduk: "20.286 jiwa",
        kk: "6.785 KK",
        government: {
            padukuhan: 8,
            rw: 22,
            rt: 78,
        },
        batasWilayah: {
            utara: "Kal. Nogotirto",
            timur: "Kal. Ngestiharjo",
            selatan: "Kal. Ngestiharjo",
            barat: "Kal. Ambarketawang",
        },
        sejarah: {
            tahun: "1946",
            deskripsi: "Penggabungan Kalurahan Banyumeneng dan Kradenan",
        },
        lurah: {
            nama: lurahName,
        },
        lurahPhoto: "/uploads/perangkat-desa/lurah.svg",
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="text-center space-y-6">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-4">
                            <Flag className="w-3 h-3 mr-1" />
                            Portal Resmi Pemerintah Kalurahan
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Kalurahan {kalurahanData.nama}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            Kapanewon {kalurahanData.kapanewon}, {kalurahanData.kabupaten}, {kalurahanData.provinsi}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Kode Pos {kalurahanData.kodePos}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Est. {kalurahanData.sejarah.tahun}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-8 pb-16">
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{kalurahanData.penduduk}</p>
                        <p className="text-xs text-slate-500 mt-1">Total Penduduk</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <TreePine className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{kalurahanData.luasTotal}</p>
                        <p className="text-xs text-slate-500 mt-1">Luas Wilayah</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Building className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{kalurahanData.government.padukuhan}</p>
                        <p className="text-xs text-slate-500 mt-1">Padukuhan</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <TrendingUp className="w-6 h-6 text-orange-600" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{kalurahanData.government.rw}/{kalurahanData.government.rt}</p>
                        <p className="text-xs text-slate-500 mt-1">RW / RT</p>
                    </div>
                </div>

                {/* Lurah Section - Modern Card */}
                <Card className="bg-gradient-to-r from-slate-50 to-white border-slate-200 shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 relative">
                            <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
                                    <Image
                                        src={kalurahanData.lurahPhoto}
                                        alt={kalurahanData.lurah.nama}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-3">
                                        <Users className="w-3 h-3 mr-1" />
                                        Pimpinan Kalurahan
                                    </Badge>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{kalurahanName}</h2>
                                    <p className="text-lg text-slate-600">Lurah/Kepala Kalurahan</p>
                                </div>
                                <div className="hidden md:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-700">Periode {periode}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-6">
                                <Link
                                    href="/aparatur"
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    <Users className="w-4 h-4" />
                                    Lihat Perangkat
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/profil-padukuhan"
                                    className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Profil Padukuhan
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Geography & Boundaries - Split Layout */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-100">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <Mountain className="w-5 h-5 text-white" />
                                </div>
                                Geografi & Iklim
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Mountain className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium text-slate-700">Ketinggian</span>
                                </div>
                                <span className="font-bold text-slate-900">{kalurahanData.tinggiDaerah}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Thermometer className="w-5 h-5 text-red-500" />
                                    <span className="text-sm font-medium text-slate-700">Suhu Udara</span>
                                </div>
                                <span className="font-bold text-slate-900">{kalurahanData.suhuRange}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <CloudRain className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm font-medium text-slate-700">Curah Hujan</span>
                                </div>
                                <span className="font-bold text-slate-900">{kalurahanData.curahHujan}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-100">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                Batas Wilayah
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                            {Object.entries(kalurahanData.batasWilayah).map(([direction, value]) => (
                                <div key={direction} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${
                                            direction === 'utara' ? 'bg-blue-500' :
                                            direction === 'timur' ? 'bg-green-500' :
                                            direction === 'selatan' ? 'bg-red-500' : 'bg-purple-500'
                                        }`} />
                                        <span className="text-sm font-semibold text-slate-700 capitalize">{direction}</span>
                                    </div>
                                    <span className="text-sm font-medium text-slate-900">{value}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Land Use & Government Structure */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 border-slate-200 shadow-md">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-100">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                    <Layers className="w-5 h-5 text-white" />
                                </div>
                                Penggunaan Lahan
                            </CardTitle>
                            <CardDescription>Total: {kalurahanData.luasTotal}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                                    <p className="text-2xl font-bold text-green-700">199.6 Ha</p>
                                    <p className="text-xs text-green-600 mt-1">Tanah Sawah</p>
                                </div>
                                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <p className="text-2xl font-bold text-blue-700">120 Ha</p>
                                    <p className="text-xs text-blue-600 mt-1">Pekarangan</p>
                                </div>
                                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                                    <p className="text-2xl font-bold text-orange-700">3 Ha</p>
                                    <p className="text-xs text-orange-600 mt-1">Olahraga</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-2xl font-bold text-slate-700">72.4 Ha</p>
                                    <p className="text-xs text-slate-600 mt-1">Lainnya</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-md">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-100">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                    <Route className="w-5 h-5 text-white" />
                                </div>
                                Administrasi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-700">Padukuhan</span>
                                <span className="font-bold text-lg text-purple-600">{kalurahanData.government.padukuhan}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-700">RW</span>
                                <span className="font-bold text-lg text-purple-600">{kalurahanData.government.rw}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-700">RT</span>
                                <span className="font-bold text-lg text-purple-600">{kalurahanData.government.rt}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* History Section */}
                <Card className="border-slate-200 shadow-md overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-100">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                                <History className="w-5 h-5 text-white" />
                            </div>
                            Sejarah Kalurahan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-shrink-0 w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center">
                                <span className="text-3xl font-bold text-amber-600">{kalurahanData.sejarah.tahun}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    Terbentuknya Kalurahan {kalurahanData.nama}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Kalurahan {kalurahanData.nama} terbentuk pada {kalurahanData.sejarah.tahun} melalui{" "}
                                    <strong className="text-slate-900">{kalurahanData.sejarah.deskripsi}</strong>. 
                                    Penggabungan ini berdasarkan Maklumat Pemerintah Provinsi Yogyakarta yang menandai 
                                    awal pemerintahan kalurahan modern di wilayah ini.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Awards Section */}
                <Card className="border-slate-200 shadow-md">
                    <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-slate-100">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-white" />
                            </div>
                            Prestasi & Penghargaan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200">
                                <Award className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                                <p className="text-lg font-bold text-slate-900">Juara I</p>
                                <p className="text-sm text-slate-600 mt-1">Lomba Kalurahan DIY 2025</p>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                                <Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <p className="text-lg font-bold text-slate-900">Peringkat II</p>
                                <p className="text-sm text-slate-600 mt-1">Kalurahan Award Nasional 2025</p>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                                <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                <p className="text-lg font-bold text-slate-900">Kampung Hijau</p>
                                <p className="text-sm text-slate-600 mt-1">Sleman 2025</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pegawai Section */}
                <PegawaiDisplay />
            </div>
        </div>
    );
}
