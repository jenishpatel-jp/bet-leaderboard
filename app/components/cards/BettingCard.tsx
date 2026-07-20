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


const PLAYER_STYLES: Record<
  string,
  {
    text: string;
    background: string;
    border: string;
  }
> = {
  Shawry: {
    text: "text-shawry",
    background: "bg-cyan-500/10",
    border: "border-cyan-400/40",
  },
  JP: {
    text: "text-jp",
    background: "bg-yellow-500/10",
    border: "border-yellow-400/40",
  },
  Shaz: {
    text: "text-shaz",
    background: "bg-pink-500/10",
    border: "border-pink-400/40",
  },
};

const DEFAULT_PLAYER_STYLE = {
  text: "text-foreground",
  background: "bg-muted/20",
  border: "border-border",
};

const getPlayerStyle = (playerName: string) => {
  return PLAYER_STYLES[playerName] ?? DEFAULT_PLAYER_STYLE;
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
    className: "text-xl font-extrabold",
    getValue: (player) =>
      `${player.winPercentage.toFixed(1)}%`,
  },
  {
    label: "Profit",
    className: "text-xl font-extrabold",
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
        <Card className="w-full rounded-3xl border-2 bg-background text-white">

            <CardHeader>
                <CardTitle className="text-center text-3xl">
                    {card.title}
                </CardTitle>
                <CardDescription className="text-center">
                    {card.description}    
                </CardDescription>
            </CardHeader>

            
            <CardContent className="p-0">
                {/* Header */}
                 <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] border-b px-4 py-3 text-xl font-bold">
                    <div />

                    {card.players.map((player) => {
                      const playerStyle = getPlayerStyle(player.player);

                      return (
                        <div
                          key={player.player}
                          className={`
                           px-2 py-3 text-center
                            ${playerStyle.text}

                          `}
                        >
                          {player.player}
                        </div>
                      );
                      })}
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

                    {card.players.map((player) => {
                      const playerStyle = getPlayerStyle(player.player);

                      return (
                        <div
                          key={`${metric.label}-${player.player}`}
                          className={`
                            flex items-center justify-center
                            px-2 py-3 text-center font-semibold
                            ${playerStyle.text}
                  
                          `}
                        >
                          {metric.getValue(player)}
                        </div>
                      );
                    })}
                  </div>
        ))}

            </CardContent>
        </Card>
    )
}

export default BettingCard