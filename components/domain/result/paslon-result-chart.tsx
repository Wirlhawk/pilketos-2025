"use client";

import { Bar, BarChart, LabelList, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const description = "A bar chart with vote count and labels";

const chartConfig = {
    voteCount: {
        label: "Jumlah Suara",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function PaslonResultChart({
    results,
}: {
    results: {
        voteCount: number;
        percentage: number;
        _count: {
            perolehan: number;
        };
        id: number;
        image: string;
        ketos: string;
        waketos: string;
    }[];
}) {
    // Convert backend data to chart format
    const chartData = results.map((paslon) => ({
        name: `Paslon ${String(paslon.id).padStart(2, "0")}`,
        count: paslon.voteCount,
        percentage: paslon.percentage,
    }));

    return (
        <Card className="bg-transparent flex-1 flex flex- col-span-4">
            <CardHeader>
                <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                    Hasil Pemilihan
                </CardTitle>
                <CardDescription>Grafik hasil suara pemilihan paslon</CardDescription>
            </CardHeader>

            {/* Make the chart fill the rest */}
            <CardContent className="flex-1 flex items-center justify-center w-3/4 mx-auto">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            bottom: 20,
                        }}
                    >
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" fill="var(--primary)" radius={8}>
                            <LabelList
                                dataKey="count"
                                position="top"
                                offset={10}
                                className="fill-foreground"
                                fontSize={32}
                                style={{
                                    fontWeight: "bold",
                                }}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
