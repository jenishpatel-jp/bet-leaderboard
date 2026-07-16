import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import type { BettingCardData } from "@/lib/stats/cardStats"

type BettingCardProps = {
    card: BettingCardData;
};

type Metric = {
  label: string;
  getValue: (
    player: BettingCardData["players"][number]
  ) => string | number;
  className?: string;
};

const METRICS: Metric[] = [
  {
    label: "Wins",
    getValue: (player) => player.wins,
  },
  {
    label: "Losses",
    getValue: (player) => player.losses,
  },
  {
    label: "Cash Out",
    getValue: (player) => player.cashedOut,
  },
  {
    label: "Win %",
    className: "text-xl font-extrabold text-white",
    getValue: (player) =>
      `${player.winPercentage.toFixed(1)}%`,
  },
  {
    label: "Profit",
    className: "text-xl font-extrabold text-white",
    getValue: (player) => {
      const formattedProfit = Math.abs(player.profit).toFixed(2);

      if (player.profit < 0) {
        return `-$${formattedProfit}`;
      }

      return `$${formattedProfit}`;
    },
  },
];

const BettingCard = ({ card } : BettingCardProps) => {
    
    return (
        <Card className="w-full rounded-3xl border-2 bg-background text-foreground">

            <CardHeader>
                <CardTitle className="text-center text-3xl">
                    {card.title}
                </CardTitle>
                <CardDescription className="text-center text-white">
                    {card.description}    
                </CardDescription>
            </CardHeader>

            
            <CardContent className="p-0">
                {/* Header */}
                 <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] border-b px-4 py-3 text-xl font-bold">
                    <div />

                    {card.players.map((player) => (
                        <div
                        key={player.player}
                        className="text-center"
                        >
                        {player.player}
                        </div>
                    ))}
                    </div>

                {METRICS.map((metric) => (
                <div
                    key={metric.label}
                    className={`grid grid-cols-[1.4fr_repeat(3,1fr)] border-b px-4 py-3 text-lg last:border-b-0 ${
                        metric.className ?? "text-lg"
                    }`}
                >
                    <div className="font-bold">
                    {metric.label}
                    </div>

                    {card.players.map((player) => (
                    <div
                        key={`${metric.label}-${player.player}`}
                        className="text-center font-semibold"
                    >
                        {metric.getValue(player)}
                    </div>
                    ))}
                </div>
                ))}

            </CardContent>
        </Card>
    )
}

export default BettingCard