"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import type { BalanceBarGraphData } from "@/lib/stats/barGraph";

import { useEffect, useState } from "react";

type BarGraphWithLabelsProps = {
  chartData: BalanceBarGraphData[];
};

const chartConfig = {
  balance: {
    label: "Account Balance",
    color: "var(--chart-4)",
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

function formatCurrency(value: number): string {
  const absoluteValue = Math.abs(value).toFixed(2);

  return value < 0
    ? `-$${absoluteValue}`
    : `$${absoluteValue}`;
}

const BarGraphWithLabels = ({
  chartData,
}: BarGraphWithLabelsProps) => {

    

function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const update = () => setIsDesktop(mediaQuery.matches);

        update();

        mediaQuery.addEventListener("change", update);

        return () =>
        mediaQuery.removeEventListener("change", update);
    }, []);

    return isDesktop;
    }

    const isDesktop = useIsDesktop();

    return (
        <Card className="lg:w-3/4 bg-background border-2 p-2 m-2">
        <CardHeader>
            <CardTitle className="text-white">
            Account Balance by Round
            </CardTitle>

            <CardDescription>
            Sportsbet account balance after each AFL round
            </CardDescription>
        </CardHeader>

        <CardContent>
            <ChartContainer
            config={chartConfig}
            className="min-h-100 w-full"
            >
            <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                top: 40,
                right: 24,
                bottom: 12,
                left: 12,
                }}
            >
                <CartesianGrid vertical={false} />

                <XAxis
                dataKey="round"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                minTickGap={16}
                tickFormatter={formatRoundLabel}
                tick={{
                    fill: "white",
                    fontSize: 12,
                }}
                />

                <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                    formatCurrency(Number(value))
                }
                tick={{
                    fill: "white",
                    fontSize: 12,
                }}
                />

                <ChartTooltip
                cursor={false}
                content={
                    <ChartTooltipContent
                    hideLabel
                    formatter={(value) => (
                        <span className="text-white font-medium">
                        {formatCurrency(Number(value))}
                        </span>
                    )}
                    />
                }
                />

                <Bar
                    dataKey="balance"
                    fill="var(--chart-4)"
                    radius={[8, 8, 0, 0]}
                    >
                    {isDesktop && (
                        <LabelList
                        dataKey="balance"
                        position="top"
                        offset={12}
                        className="fill-white"
                        fontSize={12}
                        />
                )}
                </Bar>
            </BarChart>
            </ChartContainer>
        </CardContent>
        </Card>
    );
    };

export default BarGraphWithLabels;