'use client';

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React from 'react';

export const description = "A horizontal bar chart"

const chartData = [
  { player: "Shawry", desktop: 186 },
  { player: "JP", desktop: 305 },
  { player: "Shaz", desktop: 237 },
  { player: "April", desktop: 73 },
  { player: "May", desktop: 209 },
  { player: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    color: "yellow",
  },
} satisfies ChartConfig

const PodiumGraph = () => {
    return (
        <Card className="w-3/4 m-2 p-2">
            <CardHeader>
                <CardTitle>Betting Leaderboard</CardTitle>
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
                    <XAxis type="number" dataKey="desktop" hide />
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
                    <Bar dataKey="desktop" fill="red" radius={5} />
                </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}

export default PodiumGraph