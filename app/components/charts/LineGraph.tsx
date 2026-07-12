"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import type { RoundProfitData } from "@/lib/stats/roundProfit";

export const description = "Aggregated betting profit by AFL round";

type LineGraphProps = {
  chartData: RoundProfitData[];
};

const chartConfig = {
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
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

function formatRoundLabel(value: string): string {
  if (value.startsWith("Round ")) {
    return value.replace("Round ", "R");
  }

  switch (value) {
    case "Wild Card Round":
      return "WC";

    case "Finals Week 1":
      return "FW1";

    case "Semi Finals":
      return "SF";

    case "Preliminary Finals":
      return "PF";

    case "Grand Final":
      return "GF";

    default:
      return value;
  }
}



const LineGraph = ({ chartData }: LineGraphProps) => {
    return (
        <Card className="w-1/2 bg-black border-2">

            <CardHeader className="text-white">
                <CardTitle>Aggregated profit by round</CardTitle>
                <CardDescription className="text-white">Running betting profit throughout the 2026 AFL season</CardDescription>
            </CardHeader>

            <CardContent>

                <ChartContainer 
                    config={chartConfig}
                    className="min-h-87.5 w-full"
                    >

                <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    left: 12,
                    right: 12,
                    bottom: 12,
                    top: 12
                    }}
                >

                    <CartesianGrid vertical={false} />

                    <XAxis
                    dataKey="round"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    minTickGap={20}
                    tickFormatter={formatRoundLabel}
                    />
                    
                    <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `$${value}`}
                    />

                    <ReferenceLine
                        y={0}
                        stroke="var(--muted-foreground)"
                        strokeDasharray="3 3"
                        />

                    <ChartTooltip 
                        cursor={false} 
                        content={
                        <ChartTooltipContent 
                            formatter={(value, name) => (
                            <div className="flex min-w-32.5 items-center justify-between gap-4">
                            <span>{chartConfig[name as keyof typeof chartConfig]?.label}</span>

                            <span className="font-mono font-medium">
                                ${Number(value).toFixed(2)}
                            </span>
                            </div>
                        )}
                        />} />

                    <ChartLegend content={<ChartLegendContent />} />

                    <Line
                        dataKey="shawry"
                        type="monotone"
                        stroke="var(--color-shawry)"
                        strokeWidth={2}
                        dot={false}
                        />
                    <Line
                        dataKey="jp"
                        type="monotone"
                        stroke="var(--color-jp)"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        dataKey="shaz"
                        type="monotone"
                        stroke="var(--color-shaz)"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
                </ChartContainer>
            </CardContent>
    </Card>
    )
}

export default LineGraph