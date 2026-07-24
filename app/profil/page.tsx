import {
    History,
    Users,
    MapPin,
    Calendar,
    TrendingUp,
    Thermometer,
    Mountain,
    TreePine,
    Building,
    Trophy,
    CloudRain,
    Award,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { PegawaiDisplay } from "@/components/ui/custom/PegawaiDisplay";

async function getLurahData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5091'}/api/lurah`, {
            next: { revalidate: 3600 } // Cache for 1 hour
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
    const periode = lurahData ? `${lurahData.periode_awal}-${lurahData.periode_akhir || 'Sekarang'}` : "2021-2028";
    
    // Real comprehensive data Kalurahan Banyuraden
    const kalurahanData = {
        // Basic Info
        nama: "Banyuraden",
        kapanewon: "Gamping",
        kabupaten: "Sleman",
        provinsi: "D.I Yogyakarta",
        tahunSemester: "II/2024",

        // Geography & Climate - Updated for Banyuraden
        tinggiDaerah: "143 mdpl",
        suhuMax: "33°C",
        suhuMin: "24°C",
        bentukWilayah: "Datar, sedikit kemiringan ke selatan",
        jumlahCurahHujan: "1.776 mm/th",
        hariCurahHujan: "12 hari/bulan",

        batasWilayah: {
            utara: "Kalurahan Nogotirto, Kapanewon Gamping",
            timur: "Kalurahan Ngestiharjo",
            selatan: "Kalurahan Ngestiharjo",
            barat: "Kalurahan Ambarketawang, Kapanewon Gamping",
        },

        jarak: {
            padukuhanTerjauh: "15 menit",
            keKapanewon: "5 km; 10 menit",
            keKabupaten: "10 km; 20 menit",
            keProvinsi: "15 km; 30 menit",
        },

        // Kalurahan Categories
        kalurahanStatus: {
            swadaya: {
                mula: 0,
                madya: 0,
                lanjut: 0,
            },
            swakarsa: {
                mula: 0,
                madya: 0,
                lanjut: 0,
            },
            swasembada: {
                mula: 0,
                madya: 0,
                lanjut: 0,
            },
            idt: 0,
        },

        // Kejuaraan
        kejuaraan: {
            kapanewon: { i: 0, ii: 0, iii: 0 },
            kabupaten: { i: 0, ii: 0, iii: 0 },
            provinsi: { i: 0, ii: 0, iii: 0 },
        },

        // Land Use - Updated for Banyuraden (400 Ha total)
        luasTotal: "400 Ha",
        tanahSawah: {
            total: "199.645 Ha",
            irigasiTeknis: "150 Ha",
            irigasiSetengahTeknis: "30 Ha",
            irigasiSederhana: "15 Ha",
            tadahHujan: "4.645 Ha",
        },
        pekarangan: "120 Ha",
        lapanganOlahraga: "3 Ha",
        kuburan: "5 Ha",
        lainnya: "72.355 Ha",

        // LPMK Data
        lpmk: {
            kategoriI: 1,
            kategoriII: 11,
            kategoriIII: 0,
        },

        // Lurah Info
        lurah: {
            nama: lurahName,
            jabatan: "Lurah/Kepala Kalurahan",
            periode: periode,
            foto: "/uploads/perangkat-desa/lurah.svg",
        },

        // Government Structure - Updated for Banyuraden
        government: {
            padukuhan: 8,
            rw: 22,
            rt: 78,
        },

        // Historical Data - Updated for Banyuraden
        sejarah: {
            maklumat: "Maklumat Pemerintah Provinsi Yogyakarta",
            nomor: "",
            tahun: "1946",
            deskripsi:
                "Kalurahan Banyuraden terbentuk pada 11 Desember 1946 melalui penggabungan dua kalurahan lama, yaitu Kalurahan Banyumeneng dan Kalurahan Kradenan.",
        },
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <Building className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Profil Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Profil lengkap Kalurahan {kalurahanData.nama}, {kalurahanData.kapanewon},{" "}
                        {kalurahanData.kabupaten} - Data komprehensif mengenai geografi, pemerintahan, dan administrasi
                        kalurahan
                    </p>
                </div>

                {/* Section 1: Leader & Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Lurah Card */}
                    <Card className="md:col-span-2 overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Pimpinan Kalurahan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative w-48 h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                    <Image
                                        src={kalurahanData.lurah.foto}
                                        alt={kalurahanData.lurah.nama}
                                        fill
                                        className="object-cover"
                                        sizes="192px"
                                    />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        {kalurahanData.lurah.nama}
                                    </h2>
                                    <p className="text-xl text-gray-700 mb-3">{kalurahanData.lurah.jabatan}</p>
                                    <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                                        <Calendar className="h-4 w-4 text-purple-600" />
                                        <span className="text-sm font-medium text-purple-800">
                                            Periode {kalurahanData.lurah.periode}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Statistik Cepat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-muted p-3 rounded-lg text-center">
                                    <h4 className="text-xs font-semibold text-muted-foreground">Luas</h4>
                                    <p className="text-xl font-bold text-foreground">{kalurahanData.luasTotal}</p>
                                </div>
                                <div className="bg-muted p-3 rounded-lg text-center">
                                    <h4 className="text-xs font-semibold text-muted-foreground">Ketinggian</h4>
                                    <p className="text-xl font-bold text-foreground">{kalurahanData.tinggiDaerah}</p>
                                </div>
                                <div className="bg-muted p-3 rounded-lg text-center">
                                    <h4 className="text-xs font-semibold text-muted-foreground">Padukuhan</h4>
                                    <p className="text-xl font-bold text-foreground">
                                        {kalurahanData.government.padukuhan}
                                    </p>
                                </div>
                                <div className="bg-muted p-3 rounded-lg text-center">
                                    <h4 className="text-xs font-semibold text-muted-foreground">RW/RT</h4>
                                    <p className="text-xl font-bold text-foreground">
                                        {kalurahanData.government.rw}/{kalurahanData.government.rt}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section 2: Geography & Boundaries */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Geographic Data */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Mountain className="h-4 w-4 text-blue-600" />
                                Geografi & Iklim
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold">Ketinggian</span>
                                    <Mountain className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-xl font-bold text-primary">{kalurahanData.tinggiDaerah}</p>
                                <p className="text-xs text-muted-foreground">dari permukaan air laut</p>
                            </div>

                            <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold">Suhu Udara</span>
                                    <Thermometer className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-xl font-bold text-primary">
                                    {kalurahanData.suhuMin} - {kalurahanData.suhuMax}
                                </p>
                            </div>

                            <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold">Curah Hujan</span>
                                    <CloudRain className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-xl font-bold text-primary">{kalurahanData.jumlahCurahHujan}</p>
                                <p className="text-xs text-muted-foreground">
                                    Jumlah hari hujan: {kalurahanData.hariCurahHujan}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Boundaries */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <MapPin className="h-4 w-4 text-primary" />
                                Batas Wilayah
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary/40 rounded-full" />
                                        <span className="text-sm font-medium">Utara</span>
                                    </div>
                                    <span className="text-sm font-semibold text-right">
                                        {kalurahanData.batasWilayah.utara}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary/40 rounded-full" />
                                        <span className="text-sm font-medium">Timur</span>
                                    </div>
                                    <span className="text-sm font-semibold text-right">
                                        {kalurahanData.batasWilayah.timur}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary/40 rounded-full" />
                                        <span className="text-sm font-medium">Selatan</span>
                                    </div>
                                    <span className="text-sm font-semibold text-right">
                                        {kalurahanData.batasWilayah.selatan}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary/40 rounded-full" />
                                        <span className="text-sm font-medium">Barat</span>
                                    </div>
                                    <span className="text-sm font-semibold text-right">
                                        {kalurahanData.batasWilayah.barat}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section 3: Land Use */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <TreePine className="h-4 w-4 text-green-600" />
                            Luas Daerah/Wilayah Kalurahan
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">Total: {kalurahanData.luasTotal}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid lg:grid-cols-3 gap-4">
                            {/* Tanah Sawah */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-primary/40 rounded" />
                                    Tanah Sawah
                                </h3>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                        <span className="text-xs">Irigasi Teknis</span>
                                        <span className="text-sm font-semibold">32.5 Ha</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                        <span className="text-xs">Irigasi Sederhana</span>
                                        <span className="text-sm font-semibold">7.5 Ha</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                        <span className="text-xs">Tadah Hujan</span>
                                        <span className="text-sm font-semibold">10 Ha</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-muted/50 rounded-lg border border-primary/20">
                                        <span className="text-xs font-semibold">Total Sawah</span>
                                        <span className="font-bold text-sm text-primary">52.5 Ha</span>
                                    </div>
                                </div>
                            </div>

                            {/* Penggunaan Lain */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-primary/40 rounded" />
                                    Penggunaan Lain
                                </h3>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                        <span className="text-xs">Pekarangan/Bangunan</span>
                                        <span className="text-sm font-semibold">{kalurahanData.pekarangan}</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                        <span className="text-xs">Lapangan Olahraga</span>
                                        <span className="text-sm font-semibold">{kalurahanData.lapanganOlahraga}</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                        <span className="text-xs">Kuburan</span>
                                        <span className="text-sm font-semibold">{kalurahanData.kuburan}</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                        <span className="text-xs">Lainnya</span>
                                        <span className="text-sm font-semibold">{kalurahanData.lainnya}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Jarak */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-primary/40 rounded" />
                                    Jarak Strategis
                                </h3>
                                <div className="space-y-1.5">
                                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                                        <h4 className="text-xs font-semibold mb-0.5">Padukuhan Terjauh</h4>
                                        <p className="text-lg font-bold text-primary">
                                            {kalurahanData.jarak.padukuhanTerjauh}
                                        </p>
                                    </div>
                                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                                        <h4 className="text-xs font-semibold mb-0.5">Ke Kapanewon</h4>
                                        <p className="text-lg font-bold text-primary">
                                            {kalurahanData.jarak.keKapanewon}
                                        </p>
                                    </div>
                                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                                        <h4 className="text-xs font-semibold mb-0.5">Ke Kabupaten</h4>
                                        <p className="text-lg font-bold text-primary">
                                            {kalurahanData.jarak.keKabupaten}
                                        </p>
                                    </div>
                                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                                        <h4 className="text-xs font-semibold mb-0.5">Ke Provinsi</h4>
                                        <p className="text-lg font-bold text-primary">
                                            {kalurahanData.jarak.keProvinsi}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 4: Government & LPMK */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Government Structure */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Building className="h-4 w-4 text-purple-600" />
                                Struktur Pemerintahan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                                <span className="text-sm font-medium">Padukuhan/Dusun</span>
                                <span className="text-xl font-bold text-primary">
                                    {kalurahanData.government.padukuhan}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                                <span className="text-sm font-medium">Rukun Warga (RW)</span>
                                <span className="text-xl font-bold text-primary">{kalurahanData.government.rw}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                                <span className="text-sm font-medium">Rukun Tetangga (RT)</span>
                                <span className="text-xl font-bold text-primary">{kalurahanData.government.rt}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* LPMK Data */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Trophy className="h-4 w-4 text-yellow-600" />
                                LPMK (Lembaga Pemberdayaan Masyarakat)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                                <span className="text-sm font-medium">Kategori I</span>
                                <span className="text-xl font-bold text-primary">{kalurahanData.lpmk.kategoriI}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                                <span className="text-sm font-medium">Kategori II</span>
                                <span className="text-xl font-bold text-primary">{kalurahanData.lpmk.kategoriII}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                                <span className="text-sm font-medium">Kategori III</span>
                                <span className="text-xl font-bold text-muted-foreground">
                                    {kalurahanData.lpmk.kategoriIII}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section 5: Kalurahan Status & Kejuaraan */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Kalurahan Categories */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Award className="h-4 w-4 text-amber-600" />
                                Status Kalurahan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <h4 className="text-sm font-semibold mb-1.5">Kalurahan Swadaya</h4>
                                <div className="grid grid-cols-3 gap-1.5">
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Mula</p>
                                        <p className="text-lg font-bold">
                                            {kalurahanData.kalurahanStatus.swadaya.mula}
                                        </p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Madya</p>
                                        <p className="text-lg font-bold">
                                            {kalurahanData.kalurahanStatus.swadaya.madya}
                                        </p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Lanjut</p>
                                        <p className="text-lg font-bold">
                                            {kalurahanData.kalurahanStatus.swadaya.lanjut}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1.5">Kalurahan Swakarsa</h4>
                                <div className="grid grid-cols-3 gap-1.5">
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Mula</p>
                                        <p className="text-lg font-bold">
                                            {kalurahanData.kalurahanStatus.swakarsa.mula}
                                        </p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Madya</p>
                                        <p className="text-lg font-bold">
                                            {kalurahanData.kalurahanStatus.swakarsa.madya}
                                        </p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Lanjut</p>
                                        <p className="text-lg font-bold">
                                            {kalurahanData.kalurahanStatus.swakarsa.lanjut}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1.5">Kalurahan Swasembada</h4>
                                <div className="grid grid-cols-3 gap-1.5">
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Mula</p>
                                        <p className="text-lg font-bold">
                                            {kalurahanData.kalurahanStatus.swasembada.mula}
                                        </p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Madya</p>
                                        <p className="text-lg font-bold">
                                            {kalurahanData.kalurahanStatus.swasembada.madya}
                                        </p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Lanjut</p>
                                        <p className="text-lg font-bold">
                                            {kalurahanData.kalurahanStatus.swasembada.lanjut}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2 border-t">
                                <div className="text-center p-2 bg-muted/30 rounded-lg">
                                    <p className="text-xs mb-0.5">Kalurahan IDT</p>
                                    <p className="text-xl font-bold text-primary">
                                        {kalurahanData.kalurahanStatus.idt}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Kejuaraan Lomba */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Trophy className="h-4 w-4 text-yellow-600" />
                                Kejuaraan Lomba Kalurahan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <h4 className="text-sm font-semibold mb-1.5">Tingkat Kapanewon</h4>
                                <div className="grid grid-cols-3 gap-1.5">
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Juara I</p>
                                        <p className="text-lg font-bold">{kalurahanData.kejuaraan.kapanewon.i}</p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Juara II</p>
                                        <p className="text-lg font-bold">{kalurahanData.kejuaraan.kapanewon.ii}</p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Juara III</p>
                                        <p className="text-lg font-bold">{kalurahanData.kejuaraan.kapanewon.iii}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1.5">Tingkat Kabupaten</h4>
                                <div className="grid grid-cols-3 gap-1.5">
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Juara I</p>
                                        <p className="text-lg font-bold">{kalurahanData.kejuaraan.kabupaten.i}</p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Juara II</p>
                                        <p className="text-lg font-bold">{kalurahanData.kejuaraan.kabupaten.ii}</p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Juara III</p>
                                        <p className="text-lg font-bold">{kalurahanData.kejuaraan.kabupaten.iii}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1.5">Tingkat Provinsi</h4>
                                <div className="grid grid-cols-3 gap-1.5">
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Juara I</p>
                                        <p className="text-lg font-bold">{kalurahanData.kejuaraan.provinsi.i}</p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Juara II</p>
                                        <p className="text-lg font-bold">{kalurahanData.kejuaraan.provinsi.ii}</p>
                                    </div>
                                    <div className="text-center p-1.5 bg-muted/30 rounded">
                                        <p className="text-xs text-muted-foreground">Juara III</p>
                                        <p className="text-lg font-bold">{kalurahanData.kejuaraan.provinsi.iii}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section 6: Historical Reference */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <History className="h-4 w-4 text-blue-600" />
                            Dasar Pembentukan Kalurahan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted/30 border-l-4 border-primary/50 p-4 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold mb-1.5">{kalurahanData.sejarah.maklumat}</h3>
                                    <p className="text-xs mb-1.5">
                                        <span className="font-medium">
                                            Nomor: {kalurahanData.sejarah.nomor} Tahun {kalurahanData.sejarah.tahun}
                                        </span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {kalurahanData.sejarah.deskripsi}
                                        Kalurahan Ngentak (dengan pusat pemerintahan di Plotengan) dan Kalurahan
                                        Glagahombo (dengan pusat pemerintahan di Babadan/Banjarharjo).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 7: Pegawai & Perangkat Kalurahan */}
                <PegawaiDisplay />
            </div>
        </div>
    );
}
