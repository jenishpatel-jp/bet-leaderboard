"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
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

import type { BarGraphData } from "@/lib/stats/barGraph";

type BarGraphProps = {
  chartData: BarGraphData[];
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

function formatCurrency(value: number): string {
  const absoluteValue = Math.abs(value).toFixed(2);

  return value < 0
    ? `-$${absoluteValue}`
    : `$${absoluteValue}`;
}

const BarGraph = ({ chartData }: BarGraphProps) => {
  return (
    <Card className="w-1/2 bg-background border-2">
      <CardHeader>
        <CardTitle className="text-white">
          Return and account balance by round
        </CardTitle>

        <CardDescription>
          Individual round returns
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
              top: 16,
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
                      fill:"white",
                      fontSize: 12
                    }}
            />

            {/* Player return axis */}
            <YAxis
              yAxisId="return"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                formatCurrency(Number(value))
              }
              tick=
              {{
                fill:"white",
                fontSize: 12
            }}
            />

            <ReferenceLine
              yAxisId="return"
              y={0}
              stroke="var(--muted-foreground)"
              strokeDasharray="3 3"
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    const key =
                      name as keyof typeof chartConfig;

                    return (
                      <div className="flex min-w-40 items-center justify-between gap-4">
                        <span className="text-white">
                          {chartConfig[key]?.label}
                        </span>

                        <span className="font-mono font-medium text-white">
                          {formatCurrency(Number(value))}
                        </span>
                      </div>
                    );
                  }}
                />
              }
            />

            <ChartLegend
              content={<ChartLegendContent />}
              className="text-white"
            />

            <Bar
              yAxisId="return"
              dataKey="shawry"
              fill="var(--color-shawry)"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              yAxisId="return"
              dataKey="jp"
              fill="var(--color-jp)"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              yAxisId="return"
              dataKey="shaz"
              fill="var(--color-shaz)"
              radius={[4, 4, 0, 0]}
            />

          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarGraph;