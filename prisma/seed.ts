import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Memulai seeding data Kalurahan Banyuraden...");

    // ===========================================
    // 1. PADUKUHAN (8 Dusun)
    // ===========================================
    console.log("\n📍 Menyeed data 8 Padukuhan...");

    const padukuhanDowangan = await prisma.padukuhan.upsert({
        where: { slug: "dowangan" },
        update: {},
        create: {
            nama: "Dowangan",
            slug: "dowangan",
            kepalaDukuh: "Sutarto",
            jumlahRW: 3,
            jumlahRT: 28,
            luasHa: 46.7,
            jumlahKK: 486,
            jumlahLakiLaki: 640,
            jumlahPerempuan: 679,
            totalPenduduk: 1319,
            deskripsi: "Padukuhan Dowangan merupakan salah satu padukuhan di wilayah Kalurahan Banyuraden, Kecamatan Mlati, Kabupaten Sleman, DIY. Wilayah terdiri dari kampung Dowangan dan Kradenan.",
            kampung: "Dowangan, Kradenan",
        },
    });

    const padukuhanKaliabu = await prisma.padukuhan.upsert({
        where: { slug: "kaliabu" },
        update: {},
        create: {
            nama: "Kaliabu",
            slug: "kaliabu",
            kepalaDukuh: "Parjuli",
            jumlahRW: 4,
            jumlahRT: 35,
            luasHa: 52,
            jumlahKK: 533,
            jumlahLakiLaki: 846,
            jumlahPerempuan: 873,
            totalPenduduk: 1719,
            deskripsi: "Padukuhan Kaliabu memiliki wilayah yang terdiri dari beberapa kampung dan perumahan. Terkenal dengan tradisi dan budaya masyarakatnya yang kuat.",
            kampung: "Kaliabu, Turusan, Patuk, Perum Kaliabu, Perum Turusan Permai",
        },
    });

    const padukuhanDukuh = await prisma.padukuhan.upsert({
        where: { slug: "dukuh" },
        update: {},
        create: {
            nama: "Dukuh",
            slug: "dukuh",
            kepalaDukuh: "Amin Achmadi",
            jumlahRW: 4,
            jumlahRT: 32,
            jumlahKK: 770,
            jumlahLakiLaki: 1072,
            jumlahPerempuan: 1073,
            totalPenduduk: 2145,
            deskripsi: "Padukuhan Dukuh terdiri dari kampung Dukuh, Tegalyoso, dan Sanggrahan. Wilayah ini merupakan pusat kegiatan ekonomi dan perdagangan masyarakat.",
            kampung: "Dukuh, Tegalyoso, Sanggrahan",
        },
    });

    const padukuhanSomodaran = await prisma.padukuhan.upsert({
        where: { slug: "somodaran" },
        update: {},
        create: {
            nama: "Somodaran",
            slug: "somodaran",
            kepalaDukuh: "Hadi Istanto",
            jumlahRW: 4,
            jumlahRT: 30,
            jumlahKK: 684,
            jumlahLakiLaki: 1012,
            jumlahPerempuan: 982,
            totalPenduduk: 1994,
            deskripsi: "Padukuhan Somodaran terdiri dari kampung Somodaran, Pelemgurih, dan Griya Banyuraden. Terkenal dengan usaha Tahu Putih Somodaran yang legendaris.",
            kampung: "Somodaran, Pelemgurih, Griya Banyuraden",
        },
    });

    const padukuhanSukunan = await prisma.padukuhan.upsert({
        where: { slug: "sukunan" },
        update: {},
        create: {
            nama: "Sukunan",
            slug: "sukunan",
            kepalaDukuh: "Subiyatna",
            jumlahRW: 6,
            jumlahRT: 45,
            jumlahKK: 805,
            jumlahLakiLaki: 1123,
            jumlahPerempuan: 1138,
            totalPenduduk: 2261,
            deskripsi: "Padukuhan Sukunan terdiri dari kampung Sukunan, Cokrowijayan, Perum Banyuraden Pratama, dan Perum Graha Banyuraden. Terkenal sebagai Desa Wisata Sukunan dengan konsep zero waste.",
            kampung: "Sukunan, Cokrowijayan, Perum Banyuraden Pratama, Perum Graha Banyuraden",
        },
    });

    const padukuhanKanoman = await prisma.padukuhan.upsert({
        where: { slug: "kanoman" },
        update: {},
        create: {
            nama: "Kanoman",
            slug: "kanoman",
            kepalaDukuh: "Jumakir",
            jumlahRW: 3,
            jumlahRT: 26,
            luasHa: 27.5,
            jumlahKK: 545,
            jumlahLakiLaki: 817,
            jumlahPerempuan: 767,
            totalPenduduk: 1584,
            deskripsi: "Padukuhan Kanoman terdiri dari kampung Kanoman, Geplakan, dan Perumahan Kanoman. Memiliki tanah luas dengan potensi pertanian yang baik.",
            kampung: "Kanoman, Geplakan, Perumahan Kanoman",
        },
    });

    const padukuhanBanyumeneng = await prisma.padukuhan.upsert({
        where: { slug: "banyumeneng" },
        update: {},
        create: {
            nama: "Banyumeneng",
            slug: "banyumeneng",
            kepalaDukuh: "Dymas Alfandy Saputra",
            jumlahRW: 8,
            jumlahRT: 55,
            jumlahKK: 1541,
            jumlahLakiLaki: 2197,
            jumlahPerempuan: 2145,
            totalPenduduk: 4342,
            deskripsi: "Padukuhan Banyumeneng merupakan padukuhan dengan penduduk terbanyak di Kalurahan Banyuraden. Terdiri dari kampung Patran, Perum Gadingsari & BIP, Gadingan, dan Banyumeneng.",
            kampung: "Patran, Perum Gadingsari & BIP, Gadingan, Banyumeneng",
        },
    });

    const padukuhanModinan = await prisma.padukuhan.upsert({
        where: { slug: "modinan" },
        update: {},
        create: {
            nama: "Modinan",
            slug: "modinan",
            kepalaDukuh: "Suhartono",
            jumlahRW: 5,
            jumlahRT: 38,
            jumlahKK: 1146,
            jumlahLakiLaki: 1578,
            jumlahPerempuan: 1504,
            totalPenduduk: 3082,
            deskripsi: "Padukuhan Modinan merupakan padukuhan dengan penduduk terbesar. Terdiri dari kampung Modinan, Asrama Kompi C Yonif 403, dan Perum Kikavser. Terkenal dengan tradisi Suran Mbah Demang.",
            kampung: "Modinan, Asrama Kompi C Yonif 403, Perum Kikavser",
        },
    });

    // ===========================================
    // 2. APARATUR PAMONG
    // ===========================================
    console.log("\n👥 Menyeed data Aparatur Pamong...");

    await prisma.aparaturPamong.upsert({ where: { id: 1 }, update: {}, create: { id: 1, namaLengkap: "Sudarisman", gelar: "S.T.", jabatan: "LURAH", kelompok: "PEMERINTAH", pendidikan: "Sarjana Teknik", pengalaman: "Periode 2013-2020 dan 2021-2028", foto: "/sudarisman.jpg", urutan: 1, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 2 }, update: {}, create: { id: 2, namaLengkap: "Hendy Indra Utama", gelar: "S.IP", jabatan: "CARIK", kelompok: "PEMERINTAH", pendidikan: "Sarjana Ilmu Pemerintahan", pengalaman: "Sekretariat Kalurahan", foto: "/CarikHendy.jpeg", urutan: 2, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 3 }, update: {}, create: { id: 3, namaLengkap: "Danarta Yuyun Afnan Anjar Purnomo", gelar: "S.E.", jabatan: "KAUR", kelompok: "PEMERINTAH", pendidikan: "Sarjana Ekonomi", pengalaman: "Bidang Administrasi dan Keuangan", foto: "/YuyunDanarta.jpeg", urutan: 3, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 4 }, update: {}, create: { id: 4, namaLengkap: "Pangripto Suryanto", gelar: "S.E.", jabatan: "KAUR", kelompok: "PEMERINTAH", pendidikan: "Sarjana Ekonomi", pengalaman: "Bidang Pembangunan dan Keuangan", foto: "/suryanto,_SE_pangripta.jpeg", urutan: 4, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 5 }, update: {}, create: { id: 5, namaLengkap: "Sidig Wijanarko", gelar: "A.Md", jabatan: "JAGABAYA", kelompok: "PEMERINTAH", pendidikan: "Diploma", pengalaman: "Penjaga dan Pengamanan Kalurahan", foto: "/Sidig_Jagabaya5.jpeg", urutan: 5, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 6 }, update: {}, create: { id: 6, namaLengkap: "Sulung Pramono", gelar: "", jabatan: "ULU_ULU", kelompok: "PEMERINTAH", pengalaman: "Ulu-ulu Kalurahan Banyuraden", urutan: 6, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 7 }, update: {}, create: { id: 7, namaLengkap: "Rahmat Fitri Haryanto", gelar: "S.E.", jabatan: "ULU_ULU", kelompok: "PEMERINTAH", pendidikan: "Sarjana Ekonomi", pengalaman: "Ulu-ulu Kalurahan Banyuraden", urutan: 7, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 8 }, update: {}, create: { id: 8, namaLengkap: "Muhajir", gelar: "", jabatan: "KAMITUWO", kelompok: "PEMERINTAH", pengalaman: "Kamituwo Kalurahan Banyuraden", urutan: 8, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 9 }, update: {}, create: { id: 9, namaLengkap: "Samiyanto", gelar: "Dr., Ir., H., MSc", jabatan: "BPKAL", kelompok: "BPKAL", pendidikan: "Doktor Pertanian", pengalaman: "Ketua BPKal Banyuraden", urutan: 9, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 10 }, update: {}, create: { id: 10, namaLengkap: "Agus Widodo", gelar: "", jabatan: "BPKAL", kelompok: "BPKAL", pengalaman: "Anggota BPKal Banyuraden", urutan: 10, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 11 }, update: {}, create: { id: 11, namaLengkap: "Suyatno", gelar: "", jabatan: "BPKAL", kelompok: "BPKAL", pengalaman: "Anggota BPKal Banyuraden", urutan: 11, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 12 }, update: {}, create: { id: 12, namaLengkap: "Suparjo", gelar: "", jabatan: "BPKAL", kelompok: "BPKAL", pengalaman: "Anggota BPKal Banyuraden", urutan: 12, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 13 }, update: {}, create: { id: 13, namaLengkap: "Wagino", gelar: "", jabatan: "BPKAL", kelompok: "BPKAL", pengalaman: "Anggota BPKal Banyuraden", urutan: 13, aktif: true } });

    // Kepala Dukuh per padukuhan
    await prisma.aparaturPamong.upsert({ where: { id: 14 }, update: {}, create: { id: 14, namaLengkap: "Sutarto", gelar: "", jabatan: "DUKUH", kelompok: "DUKUH", padukuhanId: padukuhanDowangan.id, foto: "/handoko_pamungkas_dukuh_dowangan.jpeg", urutan: 1, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 15 }, update: {}, create: { id: 15, namaLengkap: "Parjuli", gelar: "", jabatan: "DUKUH", kelompok: "DUKUH", padukuhanId: padukuhanKaliabu.id, foto: "/parjulikaliabu.jpeg", urutan: 2, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 16 }, update: {}, create: { id: 16, namaLengkap: "Amin Achmadi", gelar: "", jabatan: "DUKUH", kelompok: "DUKUH", padukuhanId: padukuhanDukuh.id, foto: "/Amin_Achmadi_Dukuh_dukuh.jpeg", urutan: 3, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 17 }, update: {}, create: { id: 17, namaLengkap: "Hadi Istanto", gelar: "", jabatan: "DUKUH", kelompok: "DUKUH", padukuhanId: padukuhanSomodaran.id, foto: "/hadi_istanto_dukuh_somodaran.jpeg", urutan: 4, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 18 }, update: {}, create: { id: 18, namaLengkap: "Subiyatna", gelar: "", jabatan: "DUKUH", kelompok: "DUKUH", padukuhanId: padukuhanSukunan.id, foto: "/subiyatna_dukuh_sukunan.jpeg", urutan: 5, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 19 }, update: {}, create: { id: 19, namaLengkap: "Jumakir", gelar: "", jabatan: "DUKUH", kelompok: "DUKUH", padukuhanId: padukuhanKanoman.id, foto: "/jumakir_kanoman.jpeg", urutan: 6, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 20 }, update: {}, create: { id: 20, namaLengkap: "Dymas Alfandy Saputra", gelar: "", jabatan: "DUKUH", kelompok: "DUKUH", padukuhanId: padukuhanBanyumeneng.id, foto: "/dymas_afamdy_S_dukuh_banyumeneng.jpeg", urutan: 7, aktif: true } });
    await prisma.aparaturPamong.upsert({ where: { id: 21 }, update: {}, create: { id: 21, namaLengkap: "Suhartono", gelar: "", jabatan: "DUKUH", kelompok: "DUKUH", padukuhanId: padukuhanModinan.id, foto: "/suhartono_dukuh_modinan.jpeg", urutan: 8, aktif: true } });

    // ===========================================
    // 3. PRODUK HUKUM
    // ===========================================
    console.log("\n📜 Menyeed data Produk Hukum...");

    await prisma.produkHukum.upsert({ where: { id: 1 }, update: {}, create: { id: 1, nomor: "Perkal No. 4/2022", jenis: "PERKAL", judul: "Tentang Kawasan Tanpa Rokok di Wilayah Kalurahan Banyuraden", deskripsi: "Peraturan Kalurahan tentang penetapan kawasan tanpa rokok di berbagai fasilitas publik termasuk sekolah, puskesmas, balai kalurahan, dan tempat ibadah.", tahun: 2022, tanggal: new Date("2022-03-15"), aktif: true } });
    await prisma.produkHukum.upsert({ where: { id: 2 }, update: {}, create: { id: 2, nomor: "Perlur No. 4/2024", jenis: "PERLUR", judul: "Tentang Anggaran Pendapatan dan Belanja Kalurahan (APBKal) Banyuraden Tahun 2025", deskripsi: "Peraturan Lurah tentang APBKal Banyuraden tahun 2025 yang meliputi pendapatan dari Dana Kalurahan, ADD, dan sumber lain serta belanja kalurahan.", tahun: 2024, tanggal: new Date("2024-11-20"), aktif: true } });
    await prisma.produkHukum.upsert({ where: { id: 3 }, update: {}, create: { id: 3, nomor: "Perkal No. 1/2023", jenis: "PERKAL", judul: "Tentang Pendayagunaan Dana Kalurahan Tahun 2023", deskripsi: "Peraturan Kalurahan tentang pendayagunaan Dana Kalurahan Banyuraden tahun anggaran 2023 sesuai ketentuan Permendagri nomor 117 tahun 2022.", tahun: 2023, tanggal: new Date("2023-01-10"), aktif: true } });
    await prisma.produkHukum.upsert({ where: { id: 4 }, update: {}, create: { id: 4, nomor: "Perkal No. 2/2023", jenis: "PERKAL", judul: "Tentang Penyelenggaraan Pemerintahan Kalurahan", deskripsi: "Peraturan Kalurahan tentang penyelenggaraan pemerintahan dan pelayanan publik di Kalurahan Banyuraden.", tahun: 2023, tanggal: new Date("2023-05-12"), aktif: true } });
    await prisma.produkHukum.upsert({ where: { id: 5 }, update: {}, create: { id: 5, nomor: "Perkal No. 3/2023", jenis: "PERKAL", judul: "Tentang Pembangunan Desa", deskripsi: "Peraturan Kalurahan tentang tata cara perencanaan, pelaksanaan, dan pengawasan pembangunan di tingkat kalurahan.", tahun: 2023, tanggal: new Date("2023-06-20"), aktif: true } });
    await prisma.produkHukum.upsert({ where: { id: 6 }, update: {}, create: { id: 6, nomor: "Perlur No. 1/2023", jenis: "PERLUR", judul: "Tentang Penetapan Harga Eceran Tertinggi Bahan Pokok", deskripsi: "Peraturan Lurah tentang penetapan harga eceran tertinggi untuk bahan pokok di pasar dan warung tradisional Kalurahan Banyuraden.", tahun: 2023, tanggal: new Date("2023-03-01"), aktif: true } });
    await prisma.produkHukum.upsert({ where: { id: 7 }, update: {}, create: { id: 7, nomor: "SK Lurah No. 01/2024", jenis: "SK", judul: "Tentang Pembentukan Tim Satgas Penanganan Covid-19 Kalurahan Banyuraden", deskripsi: "Surat Keputusan Lurah tentang pembentukan dan susunan tim satgas penanganan covid-19 di wilayah Kalurahan Banyuraden.", tahun: 2024, tanggal: new Date("2024-01-15"), aktif: true } });
    await prisma.produkHukum.upsert({ where: { id: 8 }, update: {}, create: { id: 8, nomor: "Perkal No. 5/2023", jenis: "PERKAL", judul: "Tentang Retribusi Pelayanan Publik Kalurahan", deskripsi: "Peraturan Kalurahan tentang retribusi atas pelayanan administrasi dan non-administrasi di Kantor Kalurahan Banyuraden.", tahun: 2023, tanggal: new Date("2023-09-05"), aktif: true } });

    // ===========================================
    // 4. BUMKAL - BANYU GOTRO RUMPOKO
    // ===========================================
    console.log("\n🏢 Menyeed data BUMKal Banyu Gotro Rumpoko...");

    const bumkal = await prisma.bumkal.upsert({
        where: { slug: "banyu-gatro-rumpoko" },
        update: {},
        create: {
            nama: "Banyu Gotro Rumpoko",
            slug: "banyu-gatro-rumpoko",
            tagline: "Bersama Mewujudkan Ekonomi Kalurahan yang Mandiri dan Berkelanjutan",
            deskripsi: "BumKal Banyu Gotro Rumpoko merupakan badan usaha milik kalurahan yang mengelola berbagai unit usaha untuk meningkatkan kesejahteraan masyarakat Kalurahan Banyuraden.",
            dasarHukum: "Dibentuk berdasarkan Peraturan Kalurahan Banyuraden tentang BumKal dan Surat Keputusan Lurah Banyuraden",
            npwp: "00.123.456.7-901.000",
            badanHukum: "Badan Hukum BumKal sesuai SK Kementerian Hukum dan HAM RI",
            nib: "51.01.123.4567.001",
            alamat: "Kantor Kalurahan Banyuraden, Jl. Kembang Sepatu, Banyuraden, Kec. Mlati, Kab. Sleman, DIY 55284",
            telepon: "0274-456789",
        },
    });

    await prisma.pengurusBumkal.create({ data: { bumkalId: bumkal.id, namaLengkap: "Sudarisman", jabatan: "PENASEHAT" } });
    await prisma.pengurusBumkal.create({ data: { bumkalId: bumkal.id, namaLengkap: "Samiyanto", jabatan: "KETUA_PENGAWAS" } });
    await prisma.pengurusBumkal.create({ data: { bumkalId: bumkal.id, namaLengkap: "Suhartono", jabatan: "DIREKTUR" } });
    await prisma.pengurusBumkal.create({ data: { bumkalId: bumkal.id, namaLengkap: "Danarta Yuyun Afnan Anjar Purnomo", jabatan: "SEKRETARIS" } });
    await prisma.pengurusBumkal.create({ data: { bumkalId: bumkal.id, namaLengkap: "Pangripto Suryanto", jabatan: "BENDAHARA" } });

    await prisma.unitUsaha.create({ data: { bumkalId: bumkal.id, nama: "Koperasi Simpan Pinjam", deskripsi: "Unit usaha koperasi simpan pinjam untuk anggota masyarakat", urutan: 1 } });
    await prisma.unitUsaha.create({ data: { bumkalId: bumkal.id, nama: "Toko Kalurahan", deskripsi: "Toko kelontong yang menjual barang kebutuhan pokok dengan harga terjangkau", urutan: 2 } });
    await prisma.unitUsaha.create({ data: { bumkalId: bumkal.id, nama: "Unit Pengelolaan Wisata", deskripsi: "Unit pengelola wisata desa dan budaya di Kalurahan Banyuraden", urutan: 3 } });
    await prisma.unitUsaha.create({ data: { bumkalId: bumkal.id, nama: "Unit Pengolahan Hasil Pertanian", deskripsi: "Unit pengolahan produk hasil pertanian seperti empon-empon dan keripik", urutan: 4 } });

    // ===========================================
    // 5. FASILITAS PADUKUHAN
    // ===========================================
    console.log("\n🏫 Menyeed data Fasilitas Padukuhan...");

    const fasilitasData = [
        { nama: "SDN Banyuraden 01", jenis: "SD" as const, alamat: "Jl. Kembang Sepatu, Banyuraden, Mlati, Sleman", padukuhanId: padukuhanBanyumeneng.id, telepon: "0274-456701", jamOperasi: "Senin-Jumat: 07:00-13:00 WIB", deskripsi: "Sekolah Dasar Negeri Banyuraden 01." },
        { nama: "SDN Banyuraden 02", jenis: "SD" as const, alamat: "Jl. Kembang Sepatu, Sukunan, Mlati, Sleman", padukuhanId: padukuhanSukunan.id, telepon: "0274-456702", jamOperasi: "Senin-Jumat: 07:00-13:00 WIB", deskripsi: "Sekolah Dasar Negeri Banyuraden 02." },
        { nama: "SDN Tegalyoso 01", jenis: "SD" as const, alamat: "Jl. Tegalyoso, Dukuh, Mlati, Sleman", padukuhanId: padukuhanDukuh.id, telepon: "0274-456703", jamOperasi: "Senin-Jumat: 07:00-13:00 WIB", deskripsi: "Sekolah Dasar Negeri Tegalyoso 01." },
        { nama: "SMPN 2 Mlati (Kampus 2)", jenis: "SMP" as const, alamat: "Jl. Kembang Sepatu, Banyuraden, Mlati, Sleman", padukuhanId: padukuhanBanyumeneng.id, telepon: "0274-456710", jamOperasi: "Senin-Jumat: 07:00-14:00 WIB", deskripsi: "SMP Negeri 2 Mlati cabang Banyuraden." },
        { nama: "SMAN 1 Gamping", jenis: "SMA" as const, alamat: "Jl. Parangtrisi KM 5, Gamping, Sleman", padukuhanId: padukuhanKaliabu.id, telepon: "0274-456801", jamOperasi: "Senin-Jumat: 07:00-15:00 WIB", deskripsi: "SMA Negeri 1 Gamping." },
        { nama: "STTN (Sekolah Tinggi Teknologi Nuklir)", jenis: "PERGURUAN_TINGGI" as const, alamat: "Jl. Abdi Nuswantara, Bangunjiwo, Sewon, Sleman (dekat Banyuraden)", padukuhanId: padukuhanBanyumeneng.id, telepon: "0274-513190", jamOperasi: "Senin-Jumat: 08:00-16:00 WIB", deskripsi: "Sekolah Tinggi Teknologi Nuklir BATAN." },
        { nama: "Poltekkes Kemenkes Yogyakarta", jenis: "PERGURUAN_TINGGI" as const, alamat: "Jl. Kesehatan No. 1, Vetoran, Depok, Sleman", padukuhanId: padukuhanBanyumeneng.id, telepon: "0274-512018", jamOperasi: "Senin-Jumat: 08:00-15:00 WIB", deskripsi: "Perguruan Tinggi Kesehatan Kemenkes RI." },
        { nama: "Klinik Pratama Banyuraden", jenis: "KLINIK" as const, alamat: "Jl. Kembang Sepatu, Banyuraden, Mlati, Sleman", padukuhanId: padukuhanBanyumeneng.id, telepon: "0274-456720", jamOperasi: "Senin-Sabtu: 08:00-14:00 WIB", deskripsi: "Klinik pratama yang melayani kesehatan dasar." },
        { nama: "Praktik Dokter Umum dr. Amin", jenis: "PRATIKA_DOKTER" as const, alamat: "Jl. Dukuh, Dukuh, Mlati, Sleman", padukuhanId: padukuhanDukuh.id, telepon: "0274-456725", jamOperasi: "Senin-Sabtu: 08:00-12:00 WIB", deskripsi: "Praktik dokter umum di wilayah Dukuh." },
        { nama: "Posyandu Melati (Dowangan)", jenis: "POSYANDU" as const, alamat: "Kampung Dowangan, Dowangan", padukuhanId: padukuhanDowangan.id, jamOperasi: "Setiap hari Selasa: 08:00-11:00 WIB", deskripsi: "Posyandu Melati di wilayah Dowangan." },
        { nama: "Posyandu Mawar (Somodaran)", jenis: "POSYANDU" as const, alamat: "Kampung Somodaran, Somodaran", padukuhanId: padukuhanSomodaran.id, jamOperasi: "Setiap hari Kamis: 08:00-11:00 WIB", deskripsi: "Posyandu Mawar di wilayah Somodaran." },
        { nama: "Posyandu Anggrek (Banyumeneng)", jenis: "POSYANDU" as const, alamat: "Kampung Patran, Banyumeneng", padukuhanId: padukuhanBanyumeneng.id, jamOperasi: "Setiap hari Rabu: 08:00-11:00 WIB", deskripsi: "Posyandu Anggrek di wilayah Banyumeneng." },
        { nama: "Posyandu Dahlia (Modinan)", jenis: "POSYANDU" as const, alamat: "Kampung Modinan, Modinan", padukuhanId: padukuhanModinan.id, jamOperasi: "Setiap hari Senin: 08:00-11:00 WIB", deskripsi: "Posyandu Dahlia di wilayah Modinan." },
        { nama: "Posyandu Begonia (Sukunan)", jenis: "POSYANDU" as const, alamat: "Kampung Sukunan, Sukunan", padukuhanId: padukuhanSukunan.id, jamOperasi: "Setiap hari Jumat: 08:00-11:00 WIB", deskripsi: "Posyandu Begonia di wilayah Sukunan." },
        { nama: "Masjid Jami' Al-Mubarok Banyuraden", jenis: "MASJID" as const, alamat: "Jl. Kembang Sepatu, Banyumeneng, Banyuraden", padukuhanId: padukuhanBanyumeneng.id, telepon: "0274-456730", jamOperasi: "24 jam", deskripsi: "Masjid utama kalurahan Banyuraden." },
        { nama: "Masjid Jami' Somodaran", jenis: "MASJID" as const, alamat: "Kampung Somodaran, Somodaran", padukuhanId: padukuhanSomodaran.id, telepon: "0274-456731", jamOperasi: "24 jam", deskripsi: "Masjid utama padukuhan Somodaran." },
        { nama: "Masjid Jami' Sukunan", jenis: "MASJID" as const, alamat: "Kampung Sukunan, Sukunan", padukuhanId: padukuhanSukunan.id, telepon: "0274-456732", jamOperasi: "24 jam", deskripsi: "Masjid utama padukuhan Sukunan." },
        { nama: "Masjid Jami' Modinan", jenis: "MASJID" as const, alamat: "Kampung Modinan, Modinan", padukuhanId: padukuhanModinan.id, telepon: "0274-456733", jamOperasi: "24 jam", deskripsi: "Masjid utama padukuhan Modinan." },
        { nama: "Masjid Jami' Dowangan", jenis: "MASJID" as const, alamat: "Kampung Dowangan, Dowangan", padukuhanId: padukuhanDowangan.id, telepon: "0274-456734", jamOperasi: "24 jam", deskripsi: "Masjid utama padukuhan Dowangan." },
        { nama: "Masjid Jami' Kaliabu", jenis: "MASJID" as const, alamat: "Kampung Kaliabu, Kaliabu", padukuhanId: padukuhanKaliabu.id, telepon: "0274-456735", jamOperasi: "24 jam", deskripsi: "Masjid utama padukuhan Kaliabu." },
        { nama: "Masjid Jami' Dukuh", jenis: "MASJID" as const, alamat: "Kampung Dukuh, Dukuh", padukuhanId: padukuhanDukuh.id, telepon: "0274-456736", jamOperasi: "24 jam", deskripsi: "Masjid utama padukuhan Dukuh." },
        { nama: "Masjid Jami' Kanoman", jenis: "MASJID" as const, alamat: "Kampung Kanoman, Kanoman", padukuhanId: padukuhanKanoman.id, telepon: "0274-456737", jamOperasi: "24 jam", deskripsi: "Masjid utama padukuhan Kanoman." },
        { nama: "Musholla Al-Ikhlas Dowangan", jenis: "MUSHOLA" as const, alamat: "Kampung Kradenan, Dowangan", padukuhanId: padukuhanDowangan.id, jamOperasi: "24 jam", deskripsi: "Musholla di Kampung Kradenan, Dowangan." },
        { nama: "Musholla Turusan", jenis: "MUSHOLA" as const, alamat: "Kampung Turusan, Kaliabu", padukuhanId: padukuhanKaliabu.id, jamOperasi: "24 jam", deskripsi: "Musholla di Kampung Turusan, Kaliabu." },
        { nama: "Musholla Pelemgurih", jenis: "MUSHOLA" as const, alamat: "Kampung Pelemgurih, Somodaran", padukuhanId: padukuhanSomodaran.id, jamOperasi: "24 jam", deskripsi: "Musholla di Kampung Pelemgurih, Somodaran." },
        { nama: "Musholla Perum Banyuraden Pratama", jenis: "MUSHOLA" as const, alamat: "Perumahan Banyuraden Pratama, Sukunan", padukuhanId: padukuhanSukunan.id, jamOperasi: "24 jam", deskripsi: "Musholla di Perumahan Banyuraden Pratama." },
        { nama: "Musholla Geplakan", jenis: "MUSHOLA" as const, alamat: "Kampung Geplakan, Kanoman", padukuhanId: padukuhanKanoman.id, jamOperasi: "24 jam", deskripsi: "Musholla di Kampung Geplakan, Kanoman." },
        { nama: "Musholla Perum Gadingsari", jenis: "MUSHOLA" as const, alamat: "Perum Gadingsari, Banyumeneng", padukuhanId: padukuhanBanyumeneng.id, jamOperasi: "24 jam", deskripsi: "Musholla di Perum Gadingsari, Banyumeneng." },
        { nama: "Musholla Perum Kikavser", jenis: "MUSHOLA" as const, alamat: "Perum Kikavser, Modinan", padukuhanId: padukuhanModinan.id, jamOperasi: "24 jam", deskripsi: "Musholla di Perum Kikavser, Modinan." },
        { nama: "Musholla Tegalyoso", jenis: "MUSHOLA" as const, alamat: "Kampung Tegalyoso, Dukuh", padukuhanId: padukuhanDukuh.id, jamOperasi: "24 jam", deskripsi: "Musholla di Kampung Tegalyoso, Dukuh." },
        { nama: "Musholla Sanggrahan", jenis: "MUSHOLA" as const, alamat: "Kampung Sanggrahan, Dukuh", padukuhanId: padukuhanDukuh.id, jamOperasi: "24 jam", deskripsi: "Musholla di Kampung Sanggrahan, Dukuh." },
    ];

    for (const f of fasilitasData) {
        await prisma.fasilitasPadukuhan.create({ data: f });
    }

    // ===========================================
    // 6. TRADISI BUDAYA
    // ===========================================
    console.log("\n🎭 Menyeed data Tradisi Budaya...");

    const tradisiData = [
        { nama: "Suran Mbah Demang Modinan", deskripsi: "Tradisi Suran Mbah Demang yang dilaksanakan setiap tanggal 7 Sura (kalender Jawa). Ritual ini memperingati sejarah Mbah Demang, tokoh legendaris wilayah Modinan. Terdapat prosesi naik turun Gunung Merapi sebagai simbol syukur dan doa keselamatan.", padukuhanId: padukuhanModinan.id, jenis: "TRADISI", waktu: "7 Sura (kalender Jawa)" },
        { nama: "Jathilan Sukunan", deskripsi: "Seni Jathilan tradisional yang merupakan warisan budaya turun-temurun di padukuhan Sukunan. Penari jathilan menunggangi kuda lumping sambil menari-nari dan masuk trance. Seni ini dipentaskan saat hajatan dan festival budaya.", padukuhanId: padukuhanSukunan.id, jenis: "SENI", waktu: "Saat hajatan dan festival budaya" },
        { nama: "Karawitan Sukunan", deskripsi: "Seni Karawitan (gamelan Jawa) yang menjadi identitas budaya padukuhan Sukunan. Sanggar karawitan Sukunan telah melahirkan banyak musisi berprestasi tingkat kabupaten dan provinsi.", padukuhanId: padukuhanSukunan.id, jenis: "SENI", waktu: "Latihan rutin setiap malam Minggu" },
        { nama: "Bregodo Prajurit", deskripsi: "Tradisi Bregodo Prajurit dari padukuhan Modinan. Pertunjukan seni yang memadukan unsur kesenian dan kekuatan prajurit dengan gerakan-gerakan khas.", padukuhanId: padukuhanModinan.id, jenis: "SENI", waktu: "Acara besar kalurahan dan festival budaya" },
        { nama: "Nyadran Kaliabu", deskripsi: "Tradisi Nyadran (ziarah kubur) di wilayah padukuhan Kaliabu. Masyarakat melakukan ziarah ke makam-makam leluhur, saling kunjung, dan berdoa bersama.", padukuhanId: padukuhanKaliabu.id, jenis: "TRADISI", waktu: "Bulan Ruwah (sebelum Ramadan)" },
        { nama: "Suran Dowangan", deskripsi: "Tradisi Suran di padukuhan Dowangan sebagai wujud syukur atas hasil panen dan keselamatan wilayah. Terdapat prosesi bersih desa, kenduri, dan pertunjukan kesenian tradisional.", padukuhanId: padukuhanDowangan.id, jenis: "TRADISI", waktu: "Bulan Sura dan Ruwah" },
        { nama: "Nyadran Dukuh", deskripsi: "Tradisi Nyadran di padukuhan Dukuh yang mencakup ziarah kubur, selamatan bersama, dan silaturahmi antar warga.", padukuhanId: padukuhanDukuh.id, jenis: "TRADISI", waktu: "Bulan Ruwah (sebelum Ramadan)" },
        { nama: "Nyadran Somodaran", deskripsi: "Tradisi Nyadran padukuhan Somodaran melalui ziarah ke makam leluhur dan selamatan bersama.", padukuhanId: padukuhanSomodaran.id, jenis: "TRADISI", waktu: "Bulan Ruwah (sebelum Ramadan)" },
        { nama: "Nyadran Kanoman", deskripsi: "Tradisi Nyadran di padukuhan Kanoman dengan ziarah kubur dan doa bersama untuk keselamatan warga.", padukuhanId: padukuhanKanoman.id, jenis: "TRADISI", waktu: "Bulan Ruwah (sebelum Ramadan)" },
        { nama: "Nyadran Banyumeneng", deskripsi: "Tradisi Nyadran di padukuhan Banyumeneng dengan kegiatan ziarah kubur, kenduri akbar, dan pentas seni budaya.", padukuhanId: padukuhanBanyumeneng.id, jenis: "TRADISI", waktu: "Bulan Ruwah (sebelum Ramadan)" },
        { nama: "Gamelan Bondho Gongo", deskripsi: "Gamelan tradisional bersejarah yang menjadi koleksi berharga di wilayah Banyuraden. Digunakan dalam berbagai upacara adat dan pertunjukan kesenian.", padukuhanId: padukuhanSukunan.id, jenis: "CAGAR_BUDAYA", waktu: "Saat upacara adat dan festival" },
        { nama: "Rauban Somodaran", deskripsi: "Tradisi Rauban (perahu hias) di padukuhan Somodaran saat peringatan hari besar Islam dan acara kalurahan.", padukuhanId: padukuhanSomodaran.id, jenis: "TRADISI", waktu: "Acara kalurahan dan perayaan besar" },
        { nama: "Pentas Budaya Banyuraden", deskripsi: "Festival budaya tahunan Kalurahan Banyuraden yang menampilkan berbagai kesenian dari semua padukuhan.", padukuhanId: padukuhanBanyumeneng.id, jenis: "KEGIATAN_KEAGAMAAN", waktu: "Tahunan, biasanya bulan Sya'ban" },
    ];

    for (const t of tradisiData) {
        await prisma.tradisiBudaya.create({ data: t });
    }

    // ===========================================
    // 7. UMKM per Padukuhan
    // ===========================================
    console.log("\n🏪 Menyeed data UMKM...");

    const umkmDowangan = [
        { nama: "Lapis Legit Mbak Nani", jenis: "KULINER", deskripsi: "Lapis legit khas dengan resep turun-temurun", pemilik: "Mbak Nani", telepon: "0812-3456-0002" },
        { nama: "Tahu Sumedang Dowangan", jenis: "KULINER", deskripsi: "Tahu Sumedang goreng renyah", pemilik: "Pak Udin", telepon: "0812-3456-0003" },
        { nama: "Kripik Tempe Dowangan", jenis: "KULINER", deskripsi: "Kripik tempe renyah berbagai rasa", pemilik: "Ibu Sri", telepon: "0812-3456-0004" },
        { nama: "Ayam Goreng Dowangan", jenis: "KULINER", deskripsi: "Ayam goreng rempah khas Dowangan", pemilik: "Pak Slamet", telepon: "0812-3456-0005" },
        { nama: "Wedang Ronde Dowangan", jenis: "KULINER", deskripsi: "Wedang ronde dengan bola tape dan jahe", pemilik: "Mbah Sastro", telepon: "0812-3456-0006" },
        { nama: "Serabi Dowangan", jenis: "KULINER", deskripsi: "Serabi santan khas dari beras dan kelapa", pemilik: "Ibu Rohimah", telepon: "0812-3456-0007" },
        { nama: "Sate Mbak Yuli", jenis: "KULINER", deskripsi: "Sate ayam dan kambing dengan bumbu kacang", pemilik: "Mbak Yuli", telepon: "0812-3456-0011" },
        { nama: "Martabak Mbak Dwi", jenis: "KULINER", deskripsi: "Martabak manis dan telur", pemilik: "Mbak Dwi", telepon: "0812-3456-0012" },
        { nama: "Toko Sembako Maju Jaya", jenis: "PERDAGANGAN", deskripsi: "Toko sembako kebutuhan pokok", pemilik: "Pak Basuki", telepon: "0812-3456-0013" },
        { nama: "Dapur Bu Nani", jenis: "KULINER", deskripsi: "Kuliner rumahan nasi pecel gado-gado soto", pemilik: "Bu Nani", telepon: "0812-3456-0008" },
        { nama: "Jajanan Pasar Mbak Endang", jenis: "KULINER", deskripsi: "Lumpia cilok pempek", pemilik: "Mbak Endang", telepon: "0812-3456-0009" },
        { nama: "Kopi Dowangan", jenis: "KULINER", deskripsi: "Kopi local brew khas Dowangan", pemilik: "Pak Harto", telepon: "0812-3456-0010" },
        { nama: "Batik Dowangan", jenis: "KERJINAN", deskripsi: "Batik tulis dan cap khas Banyuraden", pemilik: "Ibu Siti Aminah", telepon: "0812-3456-0001" },
        { nama: "Roti Dowangan", jenis: "KULINER", deskripsi: "Roti dan kue kering untuk acara", pemilik: "Ibu Kartini", telepon: "0812-3456-0015" },
    ];

    const umkmKaliabu = [
        { nama: "Roti Lapis Kaliabu", jenis: "KULINER", deskripsi: "Roti lapis cokelat keju kacang khas Kaliabu", pemilik: "Ibu Sri Wahyuni", telepon: "0812-3456-0020" },
        { nama: "Kerupuk GK Kaliabu", jenis: "KULINER", deskripsi: "Kerupuk khas Kaliabu renyah gurih", pemilik: "Pak Gatot", telepon: "0812-3456-0021" },
        { nama: "Empon-empon Kaliabu", jenis: "PERTANIAN", deskripsi: "Pengolahan jahe kunyit kencur jadi produk olahan", pemilik: "Pak Hartono", telepon: "0812-3456-0022" },
        { nama: "Batik Kaliabu", jenis: "KERJINAN", deskripsi: "Batik tulis dan cap motif khas Kaliabu", pemilik: "Ibu Ratna", telepon: "0812-3456-0023" },
        { nama: "Keripik Singkong Kaliabu", jenis: "KULINER", deskripsi: "Keripik singkong pedas keju balado", pemilik: "Ibu Wati", telepon: "0812-3456-0024" },
        { nama: "Sambal Kaliabu", jenis: "KULINER", deskripsi: "Sambal khas racikan turun-temurun", pemilik: "Ibu Sugeng", telepon: "0812-3456-0025" },
        { nama: "Tahu Bumbu Kaliabu", jenis: "KULINER", deskripsi: "Tahu isi bumbu khas Kaliabu", pemilik: "Pak Darmawan", telepon: "0812-3456-0026" },
        { nama: "Kue Lapis Kaliabu", jenis: "KULINER", deskripsi: "Kue lapis berbagai rasa segar setiap hari", pemilik: "Ibu Lestari", telepon: "0812-3456-0027" },
        { nama: "Dendeng Kaliabu", jenis: "KULINER", deskripsi: "Dendeng daging sapi kering gurih", pemilik: "Pak Suwito", telepon: "0812-3456-0028" },
        { nama: "Selai Buah Kaliabu", jenis: "PENGOLAHAN", deskripsi: "Selai buah strawberry mangga durian", pemilik: "Ibu Nurjanah", telepon: "0812-3456-0029" },
        { nama: "Jamu Tradisional Kaliabu", jenis: "PENGOLAHAN", deskripsi: "Jamu beras kencur jahe merah kunyit asam", pemilik: "Ibu Suparmi", telepon: "0812-3456-0032" },
        { nama: "Kerupuk Kulit Kaliabu", jenis: "KULINER", deskripsi: "Kerupuk kulit sapi renyah gurih", pemilik: "Pak Hadi", telepon: "0812-3456-0033" },
        { nama: "Kue Basah Kaliabu", jenis: "KULINER", deskripsi: "Nagasari putu adas tradisional", pemilik: "Ibu Harni", telepon: "0812-3456-0034" },
        { nama: "Gula Aren Kaliabu", jenis: "PENGOLAHAN", deskripsi: "Gula aren dari bunga kelapa pemanis alami", pemilik: "Pak Suroso", telepon: "0812-3456-0036" },
        { nama: "Kerajinan Anyaman Bambu Kaliabu", jenis: "KERJINAN", deskripsi: "Anyaman bambu kerajinan rumah tangga", pemilik: "Pak Widodo", telepon: "0812-3456-0037" },
        { nama: "Bakso Kaliabu", jenis: "KULINER", deskripsi: "Bakso sapi kuah kaldu gurih", pemilik: "Pak Oki", telepon: "0812-3456-0038" },
        { nama: "Es Buah Kaliabu", jenis: "KULINER", deskripsi: "Minuman es buah segar lokal", pemilik: "Mbak Putri", telepon: "0812-3456-0041" },
        { nama: "Kue Kering Hari Raya Kaliabu", jenis: "KULINER", deskripsi: "Nastar kastengel semprit putri salju", pemilik: "Ibu Kartika", telepon: "0812-3456-0040" },
        { nama: "Sop Kaliabu", jenis: "KULINER", deskripsi: "Sop kaki sapi kuah bening gurih", pemilik: "Pak Rahmat", telepon: "0812-3456-0042" },
        { nama: "Toko Kelontong Sejahtera", jenis: "PERDAGANGAN", deskripsi: "Kebutuhan sehari-hari Perum Kaliabu", pemilik: "Ibu Mulyati", telepon: "0812-3456-0044" },
        { nama: "Kopi Susu Kaliabu", jenis: "KULINER", deskripsi: "Kopi susu gula aren susu segar", pemilik: "Mbak Dewi", telepon: "0812-3456-0045" },
        { nama: "Tahu Gejrot Kaliabu", jenis: "KULINER", deskripsi: "Tahu gejrot dengan bumbu petis segar pedas", pemilik: "Mbak Rini", telepon: "0812-3456-0035" },
        { nama: "Bubuk Kencur Kaliabu", jenis: "PENGOLAHAN", deskripsi: "Kencur jadi bubuk instan wedang jamu", pemilik: "Pak Joko", telepon: "0812-3456-0030" },
        { nama: "Minyak Kayu Manis Kaliabu", jenis: "PENGOLAHAN", deskripsi: "Minyak kayu manis murni kesehatan masakan", pemilik: "Pak Mulyono", telepon: "0812-3456-0031" },
        { nama: "Cumi Asin Kaliabu", jenis: "KULINER", deskripsi: "Cumi asin olahan pelengkap masakan", pemilik: "Pak Subagyo", telepon: "0812-3456-0039" },
        { nama: "Usaha Kerajinan Plastik Kaliabu", jenis: "PENGOLAHAN", deskripsi: "Produk plastik olahan", pemilik: "Pak Surya", telepon: "0812-3456-0043" },
    ];

    const umkmSomodaran = [
        { nama: "Tahu Putih Somodaran", jenis: "KULINER", deskripsi: "Tahu putih legendaris khas Somodaran dengan resep turun-temurun", pemilik: "Pak Mulyadi", telepon: "0812-3456-0100" },
        { nama: "Tahu Bacem Somodaran", jenis: "KULINER", deskripsi: "Tahu putih bacem bumbu rempah khas Somodaran", pemilik: "Ibu Sri", telepon: "0812-3456-0101" },
        { nama: "Tempe Mendoan Somodaran", jenis: "KULINER", deskripsi: "Tempe mendoan tipis gurih dengan tepung berbumbu", pemilik: "Ibu Siti", telepon: "0812-3456-0102" },
        { nama: "Gorengan Pak Darso", jenis: "KULINER", deskripsi: "Gorengan bakwan pisang tahu tempe renyah", pemilik: "Pak Darso", telepon: "0812-3456-0103" },
        { nama: "Nasi Goreng Somodaran", jenis: "KULINER", deskripsi: "Nasi goreng khas Somodaran dengan bumbu rahasia", pemilik: "Mbak Rina", telepon: "0812-3456-0104" },
        { nama: "Soto Daging Somodaran", jenis: "KULINER", deskripsi: "Soto daging dengan kuah kaldu gurih khas Somodaran", pemilik: "Pak Ageng", telepon: "0812-3456-0105" },
        { nama: "Jus Alpukat Somodaran", jenis: "KULINER", deskripsi: "Jus alpukat segar dengan susu dan gula aren", pemilik: "Mbak Ayu", telepon: "0812-3456-0106" },
        { nama: "Keripik Pisang Somodaran", jenis: "KULINER", deskripsi: "Keripik pisang renyah berbagai rasa", pemilik: "Ibu Lina", telepon: "0812-3456-0107" },
        { nama: "Rendang Daging Somodaran", jenis: "KULINER", deskripsi: "Rendang daging sapi bumbu padang autentik", pemilik: "Pak Usman", telepon: "0812-3456-0108" },
        { nama: "Ayam Penyet Somodaran", jenis: "KULINER", deskripsi: "Ayam penyet sambal terasi khas Somodaran", pemilik: "Pak Joko", telepon: "0812-3456-0109" },
        { nama: "Toko Sembako Somodaran", jenis: "PERDAGANGAN", deskripsi: "Toko sembako kebutuhan harian", pemilik: "Ibu Dwi", telepon: "0812-3456-0110" },
        { nama: "Martabak Somodaran", jenis: "KULINER", deskripsi: "Martabak manis telur dengan topping lengkap", pemilik: "Pak Ahmad", telepon: "0812-3456-0111" },
    ];

    const umkmSukunan = [
        { nama: "Kopi Sukunan", jenis: "KULINER", deskripsi: "Kopi khas Sukunan dengan cita rasa kuat", pemilik: "Pak Rudi", telepon: "0812-3456-0200" },
        { nama: "Gedang Goreng Sukunan", jenis: "KULINER", deskripsi: "Gedang goreng tepung renyah khas Sukunan", pemilik: "Ibu Ratmi", telepon: "0812-3456-0201" },
        { nama: "Bakpia Sukunan", jenis: "KULINER", deskripsi: "Bakpia pathok khas dengan berbagai isi", pemilik: "Ibu Wati", telepon: "0812-3456-0202" },
        { nama: "Jamu Gendong Sukunan", jenis: "PENGOLAHAN", deskripsi: "Jamu gendong tradisional jahe kunyit temulawak", pemilik: "Ibu Sugeng", telepon: "0812-3456-0203" },
        { nama: "Keripik Singkong Sukunan", jenis: "KULINER", deskripsi: "Keripik singkong renyah rasa aneka", pemilik: "Ibu Lina", telepon: "0812-3456-0204" },
        { nama: "Sate Maranggi Sukunan", jenis: "KULINER", deskripsi: "Sate maranggi khas dengan bumbu khas", pemilik: "Pak Deddy", telepon: "0812-3456-0205" },
        { nama: "Nasi Kuning Sukunan", jenis: "KULINER", deskripsi: "Nasi kuning kunyit kelapa santan", pemilik: "Ibu Ningsih", telepon: "0812-3456-0206" },
        { nama: "Es Cendol Sukunan", jenis: "KULINER", deskripsi: "Es cendol dawet gula merah segar", pemilik: "Mbak Fitri", telepon: "0812-3456-0207" },
        { nama: "Roti Bakar Sukunan", jenis: "KULINER", deskripsi: "Roti bakar dengan selai cokelat keju", pemilik: "Pak Hendro", telepon: "0812-3456-0208" },
        { nama: "Toko Sukunan Jaya", jenis: "PERDAGANGAN", deskripsi: "Toko kelontong dan kebutuhan sehari-hari", pemilik: "Ibu Sri", telepon: "0812-3456-0209" },
    ];

    const umkmBanyumeneng = [
        { nama: "Tahu Goreng Banyumeneng", jenis: "KULINER", deskripsi: "Tahu goreng renyah khas Banyumeneng", pemilik: "Ibu Sari", telepon: "0812-3456-0300" },
        { nama: "Soto Lamongan Banyumeneng", jenis: "KULINER", deskripsi: "Soto lamongan kuah kuning khas", pemilik: "Pak Budi", telepon: "0812-3456-0301" },
        { nama: "Nasi Goring Jawa Banyumeneng", jenis: "KULINER", deskripsi: "Nasi goreng Jawa dengan bumbu rempah", pemilik: "Mbak Endang", telepon: "0812-3456-0302" },
        { nama: "Keripik Talas Banyumeneng", jenis: "KULINER", deskripsi: "Keripik talas renyah gurih", pemilik: "Ibu Wati", telepon: "0812-3456-0303" },
        { nama: "Dapur Sehat Banyumeneng", jenis: "KULINER", deskripsi: "Katering dan makanan sehat harian", pemilik: "Ibu Ratna", telepon: "0812-3456-0304" },
        { nama: "Bakso Banyumeneng", jenis: "KULINER", deskripsi: "Bakso jumbo dengan kuah kaldu sapi", pemilik: "Pak Oki", telepon: "0812-3456-0305" },
        { nama: "Martabak Banyumeneng", jenis: "KULINER", deskripsi: "Martabak manis dan telur", pemilik: "Pak Agus", telepon: "0812-3456-0306" },
        { nama: "Minuman Sehat Banyumeneng", jenis: "KULINER", deskripsi: "Jus buah dan smoothie sehat", pemilik: "Mbak Ayu", telepon: "0812-3456-0307" },
        { nama: "Toko Bangunan Banyumeneng", jenis: "PERDAGANGAN", deskripsi: "Bahan bangunan dan alat tulis", pemilik: "Pak Harto", telepon: "0812-3456-0308" },
        { nama: "Ayam Geprek Banyumeneng", jenis: "KULINER", deskripsi: "Ayam geprek sambal bawang level", pemilik: "Pak Fajar", telepon: "0812-3456-0309" },
    ];

    const umkmModinan = [
        { nama: "Tahu Tek Modinan", jenis: "KULINER", deskripsi: "Tahu tek dengan bumbu petis khas Modinan", pemilik: "Ibu Ningsih", telepon: "0812-3456-0400" },
        { nama: "Soto Modinan", jenis: "KULINER", deskripsi: "Soto ayam khas Modinan", pemilik: "Pak Suwito", telepon: "0812-3456-0401" },
        { nama: "Keripik Modinan", jenis: "KULINER", deskripsi: "Keripik singkong dan talas khas Modinan", pemilik: "Ibu Dwi", telepon: "0812-3456-0402" },
        { nama: "Bakpia Modinan", jenis: "KULINER", deskripsi: "Bakpia isi durian cokelat keju", pemilik: "Ibu Wati", telepon: "0812-3456-0403" },
        { nama: "Rendang Modinan", jenis: "KULINER", deskripsi: "Rendang daging sapi bumbu padang", pemilik: "Pak Usman", telepon: "0812-3456-0404" },
        { nama: "Kopi Modinan", jenis: "KULINER", deskripsi: "Kopi local brew khas Modinan", pemilik: "Pak Rudi", telepon: "0812-3456-0405" },
        { nama: "Nasi Goreng Modinan", jenis: "KULINER", deskripsi: "Nasi goreng spesial Modinan", pemilik: "Mbak Rina", telepon: "0812-3456-0406" },
        { nama: "Gorengan Modinan", jenis: "KULINER", deskripsi: "Gorengan bakwan pisang tahu", pemilik: "Pak Darso", telepon: "0812-3456-0407" },
        { nama: "Kerajinan Anyaman Modinan", jenis: "KERJINAN", deskripsi: "Anyaman bambu dan rotan", pemilik: "Pak Widodo", telepon: "0812-3456-0408" },
        { nama: "Toko Sembako Modinan", jenis: "PERDAGANGAN", deskripsi: "Toko sembako kebutuhan pokok", pemilik: "Ibu Sri", telepon: "0812-3456-0409" },
    ];

    const umkmDukuh = [
        { nama: "Soto Dukuh", jenis: "KULINER", deskripsi: "Soto ayam khas Dukuh dengan kuah bening", pemilik: "Ibu Hartati", telepon: "0812-3456-0500" },
        { nama: "Bakmi Nyonya Dukuh", jenis: "KULINER", deskripsi: "Bakmi mie ayam khas dengan kaldu", pemilik: "Nyonya Liem", telepon: "0812-3456-0501" },
        { nama: "Keripik Tempe Dukuh", jenis: "KULINER", deskripsi: "Keripik tempe renyah bumbu spesial", pemilik: "Ibu Sukarmi", telepon: "0812-3456-0502" },
        { nama: "Warung Tegal Dukuh", jenis: "KULINER", deskripsi: "Warung masakan rumahan khas Jogja", pemilik: "Pak Suprajitno", telepon: "0812-3456-0503" },
        { nama: "Toko Bangunan Maju Jaya", jenis: "PERDAGANGAN", deskripsi: "Bahan bangunan konstruksi renovasi", pemilik: "Pak Hartono", telepon: "0812-3456-0504" },
        { nama: "Martabak Dukuh", jenis: "KULINER", deskripsi: "Martabak manis dan telur", pemilik: "Pak Ahmad", telepon: "0812-3456-0505" },
        { nama: "Sate Kambing Dukuh", jenis: "KULINER", deskripsi: "Sate kambing bumbu kacang kecap", pemilik: "Pak Usman", telepon: "0812-3456-0506" },
    ];

    const umkmKanoman = [
        { nama: "Tahu Goreng Kanoman", jenis: "KULINER", deskripsi: "Tahu goreng renyah khas Kanoman", pemilik: "Ibu Sari", telepon: "0812-3456-0600" },
        { nama: "Soto Kanoman", jenis: "KULINER", deskripsi: "Soto ayam kuah bening khas", pemilik: "Pak Ageng", telepon: "0812-3456-0601" },
        { nama: "Keripik Kanoman", jenis: "KULINER", deskripsi: "Keripik singkong berbagai rasa", pemilik: "Ibu Lina", telepon: "0812-3456-0602" },
        { nama: "Bakso Kanoman", jenis: "KULINER", deskripsi: "Bakso sapi kuah kaldu gurih", pemilik: "Pak Oki", telepon: "0812-3456-0603" },
        { nama: "Nasi Goreng Kanoman", jenis: "KULINER", deskripsi: "Nasi goreng spesial Kanoman", pemilik: "Mbak Rina", telepon: "0812-3456-0604" },
        { nama: "Gorengan Kanoman", jenis: "KULINER", deskripsi: "Gorengan bakwan pisang tahu", pemilik: "Pak Darso", telepon: "0812-3456-0605" },
        { nama: "Toko Sembako Kanoman", jenis: "PERDAGANGAN", deskripsi: "Toko sembako kebutuhan harian", pemilik: "Ibu Dwi", telepon: "0812-3456-0606" },
    ];

    const semuaUmkm = [
        ...umkmDowangan.map(u => ({ ...u, padukuhanId: padukuhanDowangan.id })),
        ...umkmKaliabu.map(u => ({ ...u, padukuhanId: padukuhanKaliabu.id })),
        ...umkmSomodaran.map(u => ({ ...u, padukuhanId: padukuhanSomodaran.id })),
        ...umkmSukunan.map(u => ({ ...u, padukuhanId: padukuhanSukunan.id })),
        ...umkmBanyumeneng.map(u => ({ ...u, padukuhanId: padukuhanBanyumeneng.id })),
        ...umkmModinan.map(u => ({ ...u, padukuhanId: padukuhanModinan.id })),
        ...umkmDukuh.map(u => ({ ...u, padukuhanId: padukuhanDukuh.id })),
        ...umkmKanoman.map(u => ({ ...u, padukuhanId: padukuhanKanoman.id })),
    ];

    for (const u of semuaUmkm) {
        await prisma.uMKM.create({ data: u });
    }

    // ===========================================
    // 8. PERTANAHAN per Padukuhan
    // ===========================================
    console.log("\n📋 Menyeed data Pertanahan...");

    await prisma.pertanahan.create({ data: { padukuhanId: padukuhanDowangan.id, totalBidang: 320, bersertifikat: 245, persenSertifikat: 76.6, bukanHakMilik: 42, persentaseBHM: 86.9, tanahSultan: "Tanah Sultan/Greyag: 12 bidang di Dowangan", tanahPalungguh: "Tanah Palungguh: 8 bidang di Dowangan", tanahWakaf: "Tanah Wakaf: 3 bidang (Masjid Dowangan)", tanahPutih: "Tanah Putih/Hak Milik: 252 bidang", tanahKasDesa: "Tanah Kas Kalurahan: 5 bidang" } });
    await prisma.pertanahan.create({ data: { padukuhanId: padukuhanKaliabu.id, totalBidang: 410, bersertifikat: 310, persenSertifikat: 75.6, bukanHakMilik: 55, persentaseBHM: 86.6, tanahSultan: "Tanah Sultan/Greyag: 15 bidang", tanahPalungguh: "Tanah Palungguh: 10 bidang", tanahWakaf: "Tanah Wakaf: 5 bidang", tanahPutih: "Tanah Putih/Hak Milik: 335 bidang", tanahKasDesa: "Tanah Kas Kalurahan: 8 bidang" } });
    await prisma.pertanahan.create({ data: { padukuhanId: padukuhanDukuh.id, totalBidang: 520, bersertifikat: 385, persenSertifikat: 74.0, bukanHakMilik: 78, persentaseBHM: 85.0, tanahSultan: "Tanah Sultan: 20 bidang", tanahPalungguh: "Tanah Palungguh: 12 bidang", tanahWakaf: "Tanah Wakaf: 6 bidang", tanahPutih: "Tanah Putih/Hak Milik: 432 bidang", tanahKasDesa: "Tanah Kas Kalurahan: 10 bidang" } });
    await prisma.pertanahan.create({ data: { padukuhanId: padukuhanSomodaran.id, totalBidang: 380, bersertifikat: 295, persenSertifikat: 77.6, bukanHakMilik: 48, persentaseBHM: 87.4, tanahSultan: "Tanah Sultan: 14 bidang", tanahPalungguh: "Tanah Palungguh: 9 bidang", tanahWakaf: "Tanah Wakaf: 4 bidang", tanahPutih: "Tanah Putih/Hak Milik: 317 bidang", tanahKasDesa: "Tanah Kas Kalurahan: 7 bidang" } });
    await prisma.pertanahan.create({ data: { padukuhanId: padukuhanSukunan.id, totalBidang: 450, bersertifikat: 350, persenSertifikat: 77.8, bukanHakMilik: 60, persentaseBHM: 86.7, tanahSultan: "Tanah Sultan: 18 bidang", tanahPalungguh: "Tanah Palungguh: 11 bidang", tanahWakaf: "Tanah Wakaf: 7 bidang", tanahPutih: "Tanah Putih/Hak Milik: 372 bidang", tanahKasDesa: "Tanah Kas Kalurahan: 9 bidang" } });
    await prisma.pertanahan.create({ data: { padukuhanId: padukuhanKanoman.id, totalBidang: 280, bersertifikat: 200, persenSertifikat: 71.4, bukanHakMilik: 45, persentaseBHM: 85.7, tanahSultan: "Tanah Sultan: 12 bidang", tanahPalungguh: "Tanah Palungguh: 8 bidang", tanahWakaf: "Tanah Wakaf: 3 bidang", tanahPutih: "Tanah Putih/Hak Milik: 222 bidang", tanahKasDesa: "Tanah Kas Kalurahan: 6 bidang" } });
    await prisma.pertanahan.create({ data: { padukuhanId: padukuhanBanyumeneng.id, totalBidang: 620, bersertifikat: 480, persenSertifikat: 77.4, bukanHakMilik: 85, persentaseBHM: 86.3, tanahSultan: "Tanah Sultan: 25 bidang", tanahPalungguh: "Tanah Palungguh: 15 bidang", tanahWakaf: "Tanah Wakaf: 8 bidang", tanahPutih: "Tanah Putih/Hak Milik: 510 bidang", tanahKasDesa: "Tanah Kas Kalurahan: 12 bidang" } });
    await prisma.pertanahan.create({ data: { padukuhanId: padukuhanModinan.id, totalBidang: 550, bersertifikat: 420, persenSertifikat: 76.4, bukanHakMilik: 70, persentaseBHM: 87.3, tanahSultan: "Tanah Sultan: 22 bidang", tanahPalungguh: "Tanah Palungguh: 13 bidang", tanahWakaf: "Tanah Wakaf: 6 bidang", tanahPutih: "Tanah Putih/Hak Milik: 451 bidang", tanahKasDesa: "Tanah Kas Kalurahan: 11 bidang" } });

    // ===========================================
    // 9. KELOMPOK TANI & PETERNAKAN
    // ===========================================
    console.log("\n🌾 Menyeed data Kelompok Tani...");

    await prisma.kelompokTani.create({ data: { nama: "Guyub Rukun", padukuhanId: padukuhanBanyumeneng.id, jenis: "TANI", deskripsi: "Kelompok tani yang mengolah lahan pertanian padi dan hortikultura di wilayah Banyumeneng", ketua: "Pak Supriyadi", anggota: 35, aktif: true } });
    await prisma.kelompokTani.create({ data: { nama: "Mina Makmur", padukuhanId: padukuhanSomodaran.id, jenis: "PERIKANAN", deskripsi: "Kelompok tani perikanan (minak) yang membudidayakan ikan air tawar di wilayah Somodaran", ketua: "Pak Suwono", anggota: 20, aktif: true } });
    await prisma.kelompokTani.create({ data: { nama: "Mina Berkah", padukuhanId: padukuhanSukunan.id, jenis: "PERIKANAN", deskripsi: "Kelompok tani perikanan Mina Berkah di wilayah Sukunan dengan budidaya lele dan nila", ketua: "Pak Hartono", anggota: 25, aktif: true } });
    await prisma.kelompokTani.create({ data: { nama: "Andini Makmur", padukuhanId: padukuhanModinan.id, jenis: "TANI", deskripsi: "Kelompok tani Andini Makmur mengolah padi dan palawija di wilayah Modinan", ketua: "Pak Widianto", anggota: 30, aktif: true } });
    await prisma.kelompokTani.create({ data: { nama: "Sido Maju", padukuhanId: padukuhanDowangan.id, jenis: "TANI", deskripsi: "Kelompok tani Sido Maju untuk pengembangan pertanian di Dowangan", ketua: "Pak Suroso", anggota: 22, aktif: true } });
    await prisma.kelompokTani.create({ data: { nama: "Sido Rukun", padukuhanId: padukuhanKaliabu.id, jenis: "TANI", deskripsi: "Kelompok tani Sido Rukun di wilayah Kaliabu dengan fokus tanaman sayuran", ketua: "Pak Hartono", anggota: 28, aktif: true } });
    await prisma.kelompokTani.create({ data: { nama: "Mindo Makmur", padukuhanId: padukuhanDukuh.id, jenis: "PETERNAKAN", deskripsi: "Kelompok ternak Mindo Makmur untuk pengembangbiakan sapi dan kambing di Dukuh", ketua: "Pak Suwondo", anggota: 18, aktif: true } });

    // ===========================================
    // 10. INOVASI
    // ===========================================
    console.log("\n💡 Menyeed data Inovasi...");

    await prisma.inovasi.upsert({
        where: { slug: "thermal-decomposer" },
        update: {},
        create: {
            nama: "Thermal Decomposer",
            slug: "thermal-decomposer",
            deskripsi: "Teknologi pengolahan sampah organik menjadi kompos berkualitas tinggi menggunakan proses termal dekomposisi. Inovasi ini membantu kalurahan Banyuraden dalam mengelola sampah secara berkelanjutan dan menghasilkan pupuk organik untuk kelompok tani. Dibantu oleh tim dari ITB dan BPPT, teknologi ini mampu mengurai sampah organik dalam waktu 7-14 hari menjadi kompos yang siap pakai.",
            kategori: "TEKNOLOGI",
            tahun: 2023,
            aktif: true,
        },
    });

    await prisma.inovasi.upsert({
        where: { slug: "lumbung-pangan-gadingan" },
        update: {},
        create: {
            nama: "Lumbung Pangan Gadingan",
            slug: "lumbung-pangan-gadingan",
            deskripsi: "Program Lumbung Pangan di wilayah Gadingan Banyumeneng untuk memastikan ketahanan pangan masyarakat. Mengelola cadangan beras, sayuran, dan bahan pangan pokok lainnya yang didistribusikan saat kebutuhan mendesak. Dikelola oleh kelompok tani dan BumKal Banyu Gotro Rumpoko.",
            kategori: "PANGAN",
            tahun: 2022,
            aktif: true,
        },
    });

    await prisma.inovasi.upsert({
        where: { slug: "siap-radon" },
        update: {},
        create: {
            nama: "Siap Radon",
            slug: "siap-radon",
            deskripsi: "Siap Radon merupakan inovasi pelayanan publik digital untuk Kalurahan Banyuraden. Aplikasi ini memfasilitasi pengajuan surat keterangan, informasi pelayanan, dan notifikasi langsung ke warga. Dirancang untuk mempercepat proses administrasi kalurahan dan meningkatkan kepuasan masyarakat.",
            kategori: "PELAYANAN",
            tahun: 2024,
            aktif: true,
        },
    });

    // ===========================================
    // 11. WISATA
    // ===========================================
    console.log("\n🏖️ Menyeed data Wisata...");

    await prisma.wisata.create({
        data: {
            nama: "Desa Wisata Sukunan Zero Waste",
            deskripsi: "Desa Wisata Sukunan adalah destinasi wisata budaya dan lingkungan pertama di Sleman yang menerapkan konsep zero waste management. Warga Sukunan telah menerapkan pemilahan sampah dari tingkat rumah tangga sejak tahun 2007. Wisatawan dapat melihat langsung proses daur ulang sampah, mengolah kerajinan dari bahan daur ulang, menikmati kuliner khas Sukunan, serta menikmati pertunjukan seni Jathilan dan Karawitan. Sukunan juga dikenal sebagai desa pengrajin batik dan kerajinan dari sampah.",
            padukuhanId: padukuhanSukunan.id,
            jenis: "WISATA_BUDAYA",
            koordinat: "-7.7436,110.3997",
            alamat: "Kampung Sukunan, Cokrowijayan, Kec. Mlati, Kab. Sleman, DIY",
            aktif: true,
        },
    });

    await prisma.wisata.create({
        data: {
            nama: "Embung Serut Banyuraden",
            deskripsi: "Embung Serut adalah kolam penampungan air yang juga menjadi objek wisata dan area resapan air di wilayah Banyuraden. Embung ini digunakan untuk irigasi pertanian, tempat rekreasi keluarga, dan konservasi air. Sekitarnya ditata sebagai taman hijau dengan jalur jogging dan area bermain anak.",
            padukuhanId: padukuhanBanyumeneng.id,
            jenis: "WISATA_ALAM",
            koordinat: "-7.7425,110.3985",
            alamat: "Banyumeneng, Kec. Mlati, Kab. Sleman, DIY",
            aktif: true,
        },
    });

    await prisma.wisata.create({
        data: {
            nama: "Kaliabu Adventure - Rapelling & Kayak",
            deskripsi: "Kawasan wisata alam di wilayah Kaliabu yang menawarkan berbagai kegiatan petualangan seperti rapelling di tebing, kayak di sungai, arung jeram kecil, dan camping. Dikelola oleh masyarakat lokal dengan pemandu setempat. Tersedia fasilitas persewaan alat, area parkir, dan mushola.",
            padukuhanId: padukuhanKaliabu.id,
            jenis: "WISATA_EDUKASI",
            koordinat: "-7.7445,110.4010",
            alamat: "Kaliabu, Turusan, Kec. Mlati, Kab. Sleman, DIY",
            aktif: true,
        },
    });

    await prisma.wisata.create({
        data: {
            nama: "Sentra Batik Sukunan",
            deskripsi: "Sentra pengrajin batik di Desa Wisata Sukunan yang memproduksi batik tulis dan cap dengan motif khas Banyuraden. Pengunjung dapat belajar membatik langsung dan membeli souvenir batik.",
            padukuhanId: padukuhanSukunan.id,
            jenis: "WISATA_BUDAYA",
            koordinat: "-7.7435,110.3995",
            alamat: "Kampung Sukunan, Kec. Mlati, Kab. Sleman, DIY",
            aktif: true,
        },
    });

    await prisma.wisata.create({
        data: {
            nama: "Kebun Kopi Sukunan",
            deskripsi: "Wisata kebun kopi di Sukunan yang menawarkan pengalaman langsung menikmati kopi asli Banyuraden sambil menikmati pemandangan hijau.",
            padukuhanId: padukuhanSukunan.id,
            jenis: "WISATA_KULINER",
            koordinat: "-7.7438,110.3990",
            alamat: "Kampung Sukunan, Kec. Mlati, Kab. Sleman, DIY",
            aktif: true,
        },
    });

    // ===========================================
    // 12. SEJARAH LURAH (6 Periode)
    // ===========================================
    console.log("\n📜 Menyeed data Sejarah Lurah...");

    await prisma.sejarahLurah.create({ data: { namaLurah: "Marjuki Widiosumarto", gelar: "", periodeAwal: 1983, periodeAkhir: 1993, catatan: "Periode awal Pemerintahan Kalurahan Banyuraden sejak pembentukan sesuai UU No. 5/1979", urutan: 1 } });
    await prisma.sejarahLurah.create({ data: { namaLurah: "Muh. Abdul Kadir Bsc", gelar: "", periodeAwal: 1993, periodeAkhir: 2001, catatan: "Periode kedua pemerintahan Kalurahan Banyuraden", urutan: 2 } });
    await prisma.sejarahLurah.create({ data: { namaLurah: "Basuki Rachmat", gelar: "", periodeAwal: 2001, periodeAkhir: 2007, catatan: "Periode ketiga, pembangunan infrastruktur kalurahan meningkat", urutan: 3 } });
    await prisma.sejarahLurah.create({ data: { namaLurah: "Muh. Abdul Kadir Bsc", gelar: "", periodeAwal: 2007, periodeAkhir: 2013, catatan: "Kadir Bsc menjabat periode kedua, fokus pemberdayaan masyarakat", urutan: 4 } });
    await prisma.sejarahLurah.create({ data: { namaLurah: "Sudarisman", gelar: "S.T.", periodeAwal: 2013, periodeAkhir: 2020, catatan: "Periode pertama Sudarisman, pengembangan BUMKal dan wisata desa", urutan: 5 } });
    await prisma.sejarahLurah.create({ data: { namaLurah: "Sudarisman", gelar: "S.T.", periodeAwal: 2021, periodeAkhir: 2028, catatan: "Periode kedua Sudarisman, inovasi digital dan lumbung pangan", urutan: 6 } });

    // ===========================================
    // SUMMARY
    // ===========================================
    console.log("\n✅ Seeding selesai!\n");
    console.log("📊 Ringkasan data yang berhasil diseed:");
    console.log(`  - Padukuhan:    ${await prisma.padukuhan.count()} padukuhan`);
    console.log(`  - Aparatur:     ${await prisma.aparaturPamong.count()} perangkat`);
    console.log(`  - Produk Hukum: ${await prisma.produkHukum.count()} produk hukum`);
    console.log(`  - BumKal:       ${await prisma.bumkal.count()} BUMKal`);
    console.log(`  - Pengurus BumKal: ${await prisma.pengurusBumkal.count()} pengurus`);
    console.log(`  - Unit Usaha:   ${await prisma.unitUsaha.count()} unit usaha`);
    console.log(`  - Fasilitas:    ${await prisma.fasilitasPadukuhan.count()} fasilitas`);
    console.log(`  - Tradisi:      ${await prisma.tradisiBudaya.count()} tradisi budaya`);
    console.log(`  - UMKM:         ${await prisma.uMKM.count()} UMKM`);
    console.log(`  - Pertanahan:   ${await prisma.pertanahan.count()} data pertanahan`);
    console.log(`  - Kelompok Tani:${await prisma.kelompokTani.count()} kelompok`);
    console.log(`  - Inovasi:      ${await prisma.inovasi.count()} inovasi`);
    console.log(`  - Wisata:       ${await prisma.wisata.count()} destinasi wisata`);
    console.log(`  - Sejarah Lurah:${await prisma.sejarahLurah.count()} periode`);
}

main()
    .catch(() => {
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });