'use client';

import { Bar, BarChart, XAxis, YAxis, } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PodiumGraphProps = {
    chartData: {
        player:string;
        profit: number;
        fill: string;
    }[];
}

const chartConfig = {
    profit: {
        label: "Profit"
    },
    shawry: {
        label: "Shawry",
        color: "var(--chart-1)",
    },
    jp: {
        label: "JP",
        color: "var(--chart-2)",
    },
    shaz: {
        label: "Shaz",
        color: "var(--chart-3)"
    },
} satisfies ChartConfig;


export const description = "A horizontal bar chart"

const PodiumGraph = ({ chartData }: PodiumGraphProps) => {
    return (
        <Card className="w-1/4 m-2 p-4 bg-black border-2">
            <CardHeader>
                <CardTitle className="text-white">Total Profit</CardTitle>
                <CardDescription>AFL Betting 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>

                <BarChart
                    accessibilityLayer
                    data={chartData}
                    layout="vertical"
                    margin={{
                    }}
                >
                    <XAxis type="number" dataKey="profit" hide />
                    <YAxis
                        dataKey="player"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="profit" radius={5} />
                </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}

export default PodiumGraph