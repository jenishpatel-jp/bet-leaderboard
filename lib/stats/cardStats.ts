import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/client";
import { getRoundIndex } from "@/lib/stats/rounds";

export type PlayerCardStats = {
  player: string;
  wins: number;
  losses: number;
  cashedOut: number;
  winPercentage: number;
  profit: number;
};

export type BettingCardData = {
  id: string;
  title: string;
  description: string;
  players: PlayerCardStats[];
};

type CardDefinition = {
  id: string;
  title: string;
  description: string;
  startRound: number;
  endRound: number;
};

const CARD_DEFINITIONS: CardDefinition[] = [
  {
    id: "all-rounds",
    title: "All Rounds",
    description: "Round 0 - Grand Final",
    startRound: 0,
    endRound: 29,
  },
  {
    id: "first-quarter",
    title: "1st Quarter",
    description: "Round 0 - Round 6",
    startRound: 0,
    endRound: 6,
  },
  {
    id: "second-quarter",
    title: "2nd Quarter",
    description: "Round 7 - Round 12",
    startRound: 7,
    endRound: 12,
  },
  {
    id: "third-quarter",
    title: "3rd Quarter",
    description: "Round 13 - Round 18",
    startRound: 13,
    endRound: 18,
  },
  {
    id: "fourth-quarter",
    title: "4th Quarter",
    description: "Round 19 - Round 24",
    startRound: 19,
    endRound: 24,
  },
  {
    id: "playoffs",
    title: "Playoffs",
    description: "Wild Card Round - Grand Final",
    startRound: 25,
    endRound: 29,
  },
];

type GroupedBet = {
  playerName: string;
  transactions: {
    time: Date;
    type: TransactionType;
    amount: number;
  }[];
};

/**
 * Creates an empty stats object for each player.
 */
function createEmptyPlayerStats(
  playerNames: string[]
): Map<string, PlayerCardStats> {
  return new Map(
    playerNames.map((player) => [
      player,
      {
        player,
        wins: 0,
        losses: 0,
        cashedOut: 0,
        winPercentage: 0,
        profit: 0,
      },
    ])
  );
}

/**
 * Groups separate Sportsbet transaction rows into one logical bet.
 *
 * For example:
 *
 * Bet ID 123:
 * - Bet Stake: -$10
 * - Win: +$18
 *
 * becomes one grouped bet with an $8 profit.
 */
function groupTransactionsByBet(
  transactions: {
    betId: string | null;
    time: Date;
    type: TransactionType;
    amount: number;
    playerId: number | null;
    player: {
      name: string;
    } | null;
  }[]
): GroupedBet[] {
  const groupedBets = new Map<string, GroupedBet>();

  for (const transaction of transactions) {
    if (
      !transaction.betId ||
      !transaction.player ||
      transaction.playerId === null
    ) {
      continue;
    }

    /*
     * Including playerId protects us in case the same Bet ID
     * somehow appears for two different players.
     */
    const key = `${transaction.playerId}:${transaction.betId}`;

    const existingBet = groupedBets.get(key);

    if (existingBet) {
      existingBet.transactions.push({
        time: transaction.time,
        type: transaction.type,
        amount: transaction.amount,
      });

      continue;
    }

    groupedBets.set(key, {
      playerName: transaction.player.name,
      transactions: [
        {
          time: transaction.time,
          type: transaction.type,
          amount: transaction.amount,
        },
      ],
    });
  }

  return [...groupedBets.values()];
}

function calculateCardStats(
  groupedBets: GroupedBet[],
  playerNames: string[],
  startRound: number,
  endRound: number
): PlayerCardStats[] {
  const statsByPlayer = createEmptyPlayerStats(playerNames);

  for (const bet of groupedBets) {
    /*
     * The bet belongs to the round in which its stake was placed.
     */
    const stakeTransaction = bet.transactions.find(
      (transaction) =>
        transaction.type === TransactionType.BET_STAKE
    );

    if (!stakeTransaction) {
      continue;
    }

    const roundIndex = getRoundIndex(stakeTransaction.time);

    if (
      roundIndex === null ||
      roundIndex < startRound ||
      roundIndex > endRound
    ) {
      continue;
    }

    const playerStats = statsByPlayer.get(bet.playerName);

    if (!playerStats) {
      continue;
    }

    /*
     * Profit is the sum of every transaction belonging to the bet.
     *
     * Example:
     * Stake: -$10
     * Win:   +$18
     * Profit: +$8
     */
    const betProfit = bet.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    playerStats.profit += betProfit;

    const hasWin = bet.transactions.some(
      (transaction) => transaction.type === TransactionType.WIN
    );

    const hasCashout = bet.transactions.some(
      (transaction) =>
        transaction.type === TransactionType.CASHED_OUT
    );

    const hasVoid = bet.transactions.some(
      (transaction) => transaction.type === TransactionType.VOID
    );

    if (hasWin) {
      playerStats.wins++;
    } else if (hasCashout) {
      playerStats.cashedOut++;
    } else if (!hasVoid) {
      /*
       * A bet with a stake but no win, cashout or void is a loss.
       */
      playerStats.losses++;
    }
  }

  return playerNames.map((playerName) => {
    const stats = statsByPlayer.get(playerName);

    if (!stats) {
      throw new Error(`Stats missing for player: ${playerName}`);
    }

    const validBets = stats.wins + stats.losses + stats.cashedOut;

    return {
      ...stats,
      winPercentage:
        validBets === 0
          ? 0
          : Number(
              ((stats.wins / validBets) * 100).toFixed(1)
            ),
      profit: Number(stats.profit.toFixed(2)),
    };
  });
}

export async function getBettingCardData(
  playerOrder: string[]
): Promise<BettingCardData[]> {
  const transactions = await prisma.betTransaction.findMany({
    where: {
      betId: {
        not: null,
      },
      type: {
        not: TransactionType.DEPOSIT,
      },
    },
    select: {
      betId: true,
      time: true,
      type: true,
      amount: true,
      playerId: true,
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

  const groupedBets = groupTransactionsByBet(transactions);

  return CARD_DEFINITIONS.map((card) => ({
    id: card.id,
    title: card.title,
    description: card.description,
    players: calculateCardStats(
      groupedBets,
      playerOrder,
      card.startRound,
      card.endRound
    ),
  }));
}