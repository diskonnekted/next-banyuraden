"use client";

import * as React from "react";
import { TrendingUp, Users, User, Baby, Heart } from "lucide-react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ChartPoint = { bulan: string; value: number };

type PosyanduChartsPayload = {
    totals: {
        penduduk: number | null;
        ibu: number | null;
        balita: number | null;
        posyandu: number | null;
    };
    charts: {
        beratBadan: ChartPoint[];
        tinggiBadan: ChartPoint[];
    };
    fetchedAt: string;
};

type ApiResponse = { success: true; data: PosyanduChartsPayload } | { success: false; error: string };

function formatNumber(value: number | null | undefined) {
    if (value === null || value === undefined) return "—";
    return new Intl.NumberFormat("id-ID").format(value);
}

function MetricCard({
    title,
    value,
    icon: Icon,
    subtitle,
    color,
}: {
    title: string;
    value: number | null;
    icon: React.ComponentType<{ className?: string }>;
    subtitle: string;
    color: "blue" | "emerald" | "purple" | "amber";
}) {
    const theme = {
        blue: {
            card: "bg-linear-to-br from-blue-200 to-blue-300 border-0",
            watermark: "text-blue-600",
            title: "text-blue-800",
            value: "text-blue-900",
            subtitle: "text-blue-700",
        },
        emerald: {
            card: "bg-linear-to-br from-emerald-200 to-emerald-300 border-0",
            watermark: "text-emerald-600",
            title: "text-emerald-800",
            value: "text-emerald-900",
            subtitle: "text-emerald-700",
        },
        purple: {
            card: "bg-linear-to-br from-purple-200 to-purple-300 border-0",
            watermark: "text-purple-600",
            title: "text-purple-800",
            value: "text-purple-900",
            subtitle: "text-purple-700",
        },
        amber: {
            card: "bg-linear-to-br from-amber-200 to-amber-300 border-0",
            watermark: "text-amber-600",
            title: "text-amber-800",
            value: "text-amber-900",
            subtitle: "text-amber-700",
        },
    }[color];

    return (
        <Card className={`relative overflow-hidden ${theme.card}`}>
            <div className={`absolute -top-4 -right-4 opacity-10 ${theme.watermark}`}>
                <Icon className="h-32 w-32" />
            </div>
            <CardHeader className="pb-2 relative z-10">
                <CardTitle className={`text-sm font-medium flex items-center gap-2 ${theme.title}`}>
                    <Icon className="h-4 w-4" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
                <div className={`text-3xl font-bold mb-2 ${theme.value}`}>{formatNumber(value)}</div>
                <p className={`text-xs ${theme.subtitle}`}>{subtitle}</p>
            </CardContent>
        </Card>
    );
}

function ChartCard({
    title,
    data,
    unit,
    color,
    iconColor,
    legendLabel,
}: {
    title: string;
    data: ChartPoint[];
    unit: string;
    color: string;
    iconColor: string;
    legendLabel: string;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className={`h-5 w-5 ${iconColor}`} />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="bulan"
                            tickFormatter={(value) => {
                                const v = String(value);
                                const short: Record<string, string> = {
                                    Januari: "Jan",
                                    Februari: "Feb",
                                    Maret: "Mar",
                                    April: "Apr",
                                    Mei: "Mei",
                                    Juni: "Jun",
                                    Juli: "Jul",
                                    Agustus: "Agu",
                                    September: "Sep",
                                    Oktober: "Okt",
                                    November: "Nov",
                                    Desember: "Des",
                                };
                                return short[v] || v;
                            }}
                        />
                        <YAxis tickFormatter={(value) => `${Number(value).toFixed(0)}${unit ? ` ${unit}` : ""}`} />
                        <Tooltip
                            formatter={(value: number) => {
                                const n = Number(value);
                                if (!Number.isFinite(n)) return ["—", legendLabel];
                                return [
                                    `${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(n)} ${unit}`,
                                    legendLabel,
                                ];
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="value"
                            name={legendLabel}
                            stroke={color}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default function PosyanduPage() {
    const [data, setData] = React.useState<PosyanduChartsPayload | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const fetchData = React.useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("/api/posyandu/charts", { method: "GET" });
            const json = (await res.json()) as ApiResponse;
            if (!json.success) {
                throw new Error(json.error || "Gagal memuat data Posyandu");
            }
            setData(json.data);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Gagal memuat data Posyandu");
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-primary">Posyandu</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Ringkasan dashboard Posyandu Kalurahan Pondokrejo dengan tampilan yang konsisten.
                    </p>
                    <p className="text-xs text-muted-foreground">Sumber data: posyandu.sleman-desa.id</p>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i}>
                                <CardContent className="pt-6">
                                    <div className="animate-pulse space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                                        <div className="h-8 bg-gray-200 rounded w-1/3" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {error && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="font-semibold text-red-600 mb-2">Gagal memuat data</p>
                                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                                <Button onClick={fetchData}>
                                    Coba lagi
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {!loading && !error && data && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            <MetricCard
                                title="Total Penduduk"
                                value={data.totals.penduduk}
                                icon={Users}
                                subtitle="Jiwa tercatat"
                                color="blue"
                            />
                            <MetricCard
                                title="Total Ibu"
                                value={data.totals.ibu}
                                icon={User}
                                subtitle="Orang terdaftar"
                                color="emerald"
                            />
                            <MetricCard
                                title="Total Bayi / Balita"
                                value={data.totals.balita}
                                icon={Baby}
                                subtitle="Anak terdata"
                                color="purple"
                            />
                            <MetricCard
                                title="Total Posyandu"
                                value={data.totals.posyandu}
                                icon={Heart}
                                subtitle="Unit posyandu"
                                color="amber"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <ChartCard
                                title="Perkembangan Rata-rata Berat Badan"
                                data={data.charts.beratBadan}
                                unit="kg"
                                color="#ef4444"
                                iconColor="text-red-600"
                                legendLabel="Rata-rata Berat Badan"
                            />
                            <ChartCard
                                title="Perkembangan Rata-rata Tinggi Badan"
                                data={data.charts.tinggiBadan}
                                unit="cm"
                                color="#22c55e"
                                iconColor="text-green-600"
                                legendLabel="Rata-rata Tinggi Badan"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
