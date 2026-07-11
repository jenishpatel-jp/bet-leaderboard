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



export const description = "A horizontal bar chart"

const chartData = [
  { player: "Shawry", profit: 85.10, fill:"purple" },
  { player: "JP", profit: 31.98, fill:"blue" },
  { player: "Shaz", profit: 26.20, fill:"green" },
]

const chartConfig = {
  profit: {
    color: "yellow",
  },
} satisfies ChartConfig

const PodiumGraph = () => {
    return (
        <Card className="w-3/4  m-2 p-2 bg-black">
            <CardHeader>
                <CardTitle className="text-white">Betting Leaderboard</CardTitle>
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