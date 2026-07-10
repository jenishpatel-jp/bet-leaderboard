import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/client";

export type PlayerProfit = {
    player: string;
    profit: number;
};

export const getPlayerProfit = async(): Promise<PlayerProfit[]>  => {
  const players = await prisma.player.findMany({
    include: {
      transactions: true,
    },
  });

  return players
    .map((player) => {
      const profit = player.transactions
        .filter((transaction) => transaction.type !== TransactionType.DEPOSIT)
        .reduce((total, transaction) => total + transaction.amount, 0);

      return {
        player: player.name,
        profit: Number(profit.toFixed(2)),
      };
    })
    .sort((a, b) => b.profit - a.profit);
}