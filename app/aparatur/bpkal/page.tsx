import { Users, Building2 } from "lucide-react";

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

export default async function BpkalPage() {
    const bpkalMembers = prisma.aparaturPamong ? await prisma.aparaturPamong.findMany({
        where: {
            kelompok: "BPKAL",
            aktif: true,
        },
        orderBy: { urutan: "asc" },
    }) : [];

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-100 rounded-full">
                        <Building2 className="h-10 w-10 text-violet-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Badan Permusyawaratan Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Anggota Badan Permusyawaratan Kalurahan (BPKal) Banyuraden yang mewakili aspirasi masyarakat
                    </p>
                </div>

                {/* Info Card */}
                <Card className="bg-linear-to-r from-violet-50 to-purple-50 border-violet-200">
                    <CardHeader>
                        <CardTitle className="text-violet-800">Tentang BPKal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Badan Permusyawaratan Kalurahan (BPKal) merupakan lembaga yang mewakilkan rakyat dalam
                            penyelenggaraan pemerintahan kalurahan. BPKal berperan dalam menetapkan Peraturan Kalurahan,
                            Mengawasi kinerja Lurah, dan menampung serta menindaklanjuti aspirasi masyarakat.
                        </p>
                    </CardContent>
                </Card>

                {/* BPKal Members */}
                {bpkalMembers.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Belum Ada Data</h3>
                            <p className="text-muted-foreground">
                                Data anggota BPKal sedang dalam proses pemutakhiran.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {bpkalMembers.map((member) => (
                            <Card key={member.id} className="overflow-hidden">
                                <div className="h-20 bg-gradient-to-r from-violet-500 to-purple-600" />
                                <CardContent className="pt-0">
                                    <div className="flex flex-col items-center text-center -mt-12">
                                        <Avatar className="h-24 w-24 ring-4 ring-offset-4 ring-white">
                                            <AvatarImage
                                                src={member.foto || undefined}
                                                alt={member.namaLengkap}
                                            />
                                            <AvatarFallback className="bg-violet-600 text-white text-lg">
                                                {getInitials(member.namaLengkap)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <h3 className="font-semibold mt-3">{member.namaLengkap}</h3>
                                        {member.gelar && (
                                            <p className="text-sm text-muted-foreground">
                                                {member.gelar}
                                            </p>
                                        )}
                                        <Badge className="mt-2 bg-violet-100 text-violet-800 border-violet-200">
                                            Anggota BPKal
                                        </Badge>

                                        <div className="mt-4 w-full space-y-2">
                                            {member.pendidikan && (
                                                <div className="text-xs text-muted-foreground">
                                                    Pendidikan: {member.pendidikan}
                                                </div>
                                            )}
                                            {member.telepon && (
                                                <div className="text-xs text-muted-foreground">
                                                    Telp: {member.telepon}
                                                </div>
                                            )}
                                            {member.email && (
                                                <div className="text-xs text-muted-foreground break-all">
                                                    Email: {member.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
