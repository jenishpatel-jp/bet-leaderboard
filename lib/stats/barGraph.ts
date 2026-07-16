import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/client";

import {
  getRoundIndex,
  ROUND_LABELS,
  ROUND_ZERO_START,
} from "@/lib/stats/rounds";

export type BarGraphData = {
  round: string;
  shawry: number;
  jp: number;
  shaz: number;
  balance: number;
};

type PlayerKey = "shawry" | "jp" | "shaz";

const getPlayerKey = (
  playerName: string
): PlayerKey | null => {
  switch (playerName.toLowerCase()) {
    case "shawry":
      return "shawry";

    case "jp":
      return "jp";

    case "shaz":
      return "shaz";

    default:
      return null;
  }
};

export async function getBarGraphData(): Promise<
  BarGraphData[]
> {
  const transactions =
    await prisma.betTransaction.findMany({
      select: {
        time: true,
        type: true,
        amount: true,
        player: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        time: "asc",
      },
    });

  /*
   * This stores the profit/loss made by each player
   * during each individual round.
   */
  const roundReturns = ROUND_LABELS.map(() => ({
    shawry: 0,
    jp: 0,
    shaz: 0,
  }));

  /*
   * This stores the total account movement during
   * each round.
   *
   * It includes:
   * - stakes
   * - wins
   * - cashouts
   * - void returns
   * - deposits made during the season
   */
  const roundBalanceChanges = ROUND_LABELS.map(() => 0);

  /*
   * Deposits made before Round 0 become the starting
   * account balance.
   */
  let openingBalance = 0;
  let latestRoundIndex = 0;

  for (const transaction of transactions) {
    const transactionDate = Date.UTC(
      transaction.time.getUTCFullYear(),
      transaction.time.getUTCMonth(),
      transaction.time.getUTCDate()
    );

    /*
     * Include deposits made before Round 0 in the
     * opening account balance.
     */
    if (
      transactionDate < ROUND_ZERO_START &&
      transaction.type === TransactionType.DEPOSIT
    ) {
      openingBalance += transaction.amount;
      continue;
    }

    const roundIndex = getRoundIndex(transaction.time);

    if (roundIndex === null) {
      continue;
    }

    latestRoundIndex = Math.max(
      latestRoundIndex,
      roundIndex
    );

    /*
     * Every transaction changes the account balance,
     * including deposits.
     */
    roundBalanceChanges[roundIndex] +=
      transaction.amount;

    /*
     * Deposits are not player returns, so they should
     * not appear as bars.
     */
    if (
      transaction.type === TransactionType.DEPOSIT ||
      !transaction.player
    ) {
      continue;
    }

    const playerKey = getPlayerKey(
      transaction.player.name
    );

    if (!playerKey) {
      continue;
    }

    roundReturns[roundIndex][playerKey] +=
      transaction.amount;
  }

  let runningBalance = openingBalance;

  return ROUND_LABELS
    .slice(0, latestRoundIndex + 1)
    .map((round, index) => {
      runningBalance += roundBalanceChanges[index];

      return {
        round,
        shawry: Number(
          roundReturns[index].shawry.toFixed(2)
        ),
        jp: Number(roundReturns[index].jp.toFixed(2)),
        shaz: Number(
          roundReturns[index].shaz.toFixed(2)
        ),
        balance: Number(runningBalance.toFixed(2)),
      };
    });
}