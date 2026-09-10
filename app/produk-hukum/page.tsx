import { FileText, FileDown, Download } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";

interface ProdukHukumItem {
    id: number | string;
    attributes?: {
        jenis?: string;
        tahun?: number;
        nomor?: string;
        tanggal?: string | Date;
        judul?: string;
        deskripsi?: string;
        fileUrl?: string;
    };
    jenis?: string;
    tahun?: number;
    nomor?: string;
    tanggal?: string | Date | null | undefined;
    judul?: string;
    deskripsi?: string;
    fileUrl?: string;
}

function getJenisBadge(jenis: string) {
    const styles: Record<string, string> = {
        PERKAL: "bg-blue-100 text-blue-800 border-blue-200",
        PERLUR: "bg-indigo-100 text-indigo-800 border-indigo-200",
        SK: "bg-violet-100 text-violet-800 border-violet-200",
        PERDES: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return styles[jenis] || "bg-gray-100 text-gray-800 border-gray-200";
}

function formatTanggal(date: Date | string | null | undefined): string {
    if (!date) return "-";
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

async function fetchProdukHukum(): Promise<ProdukHukumItem[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/produk-hukum`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const json = await res.json();
        if (!json.success) return [];
        return (json.data || []).map((item: ProdukHukumItem) => ({
            id: item.id,
            jenis: item.attributes?.jenis || item.jenis || "",
            tahun: item.attributes?.tahun ?? item.tahun ?? 0,
            nomor: item.attributes?.nomor || item.nomor || "",
            tanggal: item.attributes?.tanggal || item.tanggal,
            judul: item.attributes?.judul || item.judul || "",
            deskripsi: item.attributes?.deskripsi || item.deskripsi,
            fileUrl: item.attributes?.fileUrl || item.fileUrl,
        }));
    } catch {
        return [];
    }
}

export default async function ProdukHukumPage() {
    const produkHukum = await fetchProdukHukum();

    const jenisGroups = produkHukum.reduce<Record<string, ProdukHukumItem[]>>((acc, p) => {
        const key = p.jenis || "";
        if (!acc[key]) acc[key] = [];
        acc[key].push(p);
        return acc;
    }, {} as Record<string, ProdukHukumItem[]>);

    const jenisLabels: Record<string, string> = {
        PERKAL: "Peraturan Kepala Kalurahan (Perkal)",
        PERLUR: "Peraturan Lurah (Perlur)",
        SK: "Surat Keputusan (SK)",
        PERDES: "Peraturan Kalurahan (Perdes)",
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <FileText className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Produk Hukum Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Peraturan dan surat keputusan yang berlaku di Kalurahan Banyuraden sebagai dasar penyelenggaraan
                        pemerintahan
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-100 to-blue-200 border-0">
                        <CardContent className="p-4 text-center">
                            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-blue-900">
                                {produkHukum.filter((p) => p.jenis === "PERKAL").length}
                            </div>
                            <p className="text-xs text-muted-foreground">Perkal</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-indigo-100 to-indigo-200 border-0">
                        <CardContent className="p-4 text-center">
                            <FileText className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-indigo-900">
                                {produkHukum.filter((p) => p.jenis === "PERLUR").length}
                            </div>
                            <p className="text-xs text-muted-foreground">Perlur</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-violet-100 to-violet-200 border-0">
                        <CardContent className="p-4 text-center">
                            <FileText className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-violet-900">
                                {produkHukum.filter((p) => p.jenis === "SK").length}
                            </div>
                            <p className="text-xs text-muted-foreground">Surat Keputusan</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-linear-to-br from-purple-100 to-purple-200 border-0">
                        <CardContent className="p-4 text-center">
                            <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-purple-900">
                                {produkHukum.filter((p) => p.jenis === "PERDES").length}
                            </div>
                            <p className="text-xs text-muted-foreground">Perdes</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Produk Hukum by Jenis */}
                {Object.entries(jenisGroups).map(([jenis, items]) => (
                    <Card key={jenis}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${getJenisBadge(jenis).split(" ")[0].replace("bg-", "bg-")}`} />
                                <div>
                                    <span className={`border px-2 py-0.5 rounded-full text-xs ${getJenisBadge(jenis)}`}>
                                        {jenis}
                                    </span>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        {jenisLabels[jenis] || jenis}
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>No. & Tanggal</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((ph, index) => (
                                        <TableRow key={ph.id}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div className="font-medium">{String(ph.nomor)}</div>
                                                    <div className="text-muted-foreground">
                                                        {formatTanggal(ph.tanggal)}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-md">
                                                    <div className="font-medium text-sm">{String(ph.judul)}</div>
                                                    {ph.deskripsi && (
                                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                                            {String(ph.deskripsi)}
                                                        </p>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {ph.fileUrl ? (
                                                    <Button variant="outline" size="sm" asChild>
                                                        <a href={String(ph.fileUrl)} target="_blank" rel="noopener noreferrer">
                                                            <Download className="h-3 w-3 mr-1" />
                                                            Unduh
                                                        </a>
                                                    </Button>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">Belum ada file</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}

                {/* Info Section */}
                <Card className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-800">Tentang Produk Hukum</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-2">Jenis Produk Hukum:</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <span className="font-medium text-blue-800">Perkal:</span>{" "}
                                        Peraturan Kepala Kalurahan yang mengatur hal-hal tertentu
                                    </li>
                                    <li>
                                        <span className="font-medium text-blue-800">Perlur:</span>{" "}
                                        Peraturan Lurah yang ditetapkan untuk menyelenggarakan pemerintahan
                                    </li>
                                    <li>
                                        <span className="font-medium text-blue-800">SK:</span>{" "}
                                        Surat Keputusan yang ditetapkan untuk keperluan pemerintahan
                                    </li>
                                    <li>
                                        <span className="font-medium text-blue-800">Perdes:</span>{" "}
                                        Peraturan Kalurahan yang ditetapkan oleh Lurah dengan persetujuan BPKal
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-2">Fungsi Produk Hukum:</h4>
                                <ul className="space-y-1">
                                    <li>• Dasar hukum penyelenggaraan pemerintahan kalurahan</li>
                                    <li>• Acuan pelaksanaan pembangunan dan pelayanan publik</li>
                                    <li>• Alat pengatur hubungan antarpihak dalam kalurahan</li>
                                    <li>• Dasar hukum pengelolaan keuangan dan aset kalurahan</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
