import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/client";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_ROUND = 7;

/**
 * Round 0 runs from:
 * Tuesday 3 March 2026
 * through Monday 9 March 2026.
 */

const ROUND_ZERO_START = Date.UTC(2026, 2, 2);
const ROUND_ONE_START = Date.UTC(2026, 2, 10);

const ROUND_LABELS = [
    ...Array.from({ length:25 }, (_, index) => `Round ${index}`),
    "Wild Card Round",
    "Finals Week 1",
    "Semi Finals",
    "Preliminary Finals",
    "Grand Finals"
] as const;

export type RoundProfitData = {
    round: string;
    shawry: number; 
    jp: number;
    shaz: number;
};

/**
 * Converts a transaction date into a date-only UTC number.
 *
 * We use only the year, month and day because the round changes
 * at the beginning of Tuesday. The exact time during that day
 * does not affect the round.
 */

const getDateOnlyValue = (date: Date): number => {
    return Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
    );
}

/**
 * Returns the zero-based round/stage index for a transaction.
 *
 * Examples:
 * 3–9 March 2026   => 0
 * 10–16 March 2026 => 1
 * 17–23 March 2026 => 2
 */

const getRoundIndex = (date: Date): number | null => {
    const transactionDate = getDateOnlyValue(date);

    // Ignore transactions before Round 0.
    if (transactionDate < ROUND_ZERO_START) {
        return null;
    }

    // Round 0 is a special opening period:
    // Monday 2 March through Monday 9 March.
    if (transactionDate < ROUND_ONE_START) {
        return 0;
    }

    // From Round 1 onwards, every round runs Tuesday–Monday.
    const differenceInDays = Math.floor(
        (transactionDate - ROUND_ONE_START) / MILLISECONDS_PER_DAY
    );

    const roundIndex =
        1 + Math.floor(differenceInDays / DAYS_PER_ROUND);

    if (roundIndex >= ROUND_LABELS.length) {
        return null;
    }

    return roundIndex;

}

/**
 * Converts the database player name into the corresponding
 * property name used by the chart.
 */

const getPlayerKey = (playerName: string):"shawry"|"jp"|"shaz" => {
    switch(playerName.toLowerCase()){
        case "shawry":
            return "shawry";
        
        case "jp":
            return "jp";

        case "shaz":
            return "shaz";

        default:
            throw new Error(`Unknown player: ${playerName}`);
    }
};

export const getRoundProfitData = async () => {
    const transactions = await prisma.betTransaction.findMany({
        where: {
            type: {
                not: TransactionType.DEPOSIT,
            },
        },
        select: {
            time: true,
            amount: true,
            player: {
                select: {
                    name: true,
                }
            }
        },
        orderBy: {
            time: "asc"
        },
    });

    const profitChanges = ROUND_LABELS.map(() => ({
        shawry: 0,
        jp: 0,
        shaz: 0,
    }));

    let latestRoundIndex = 0;

    for (const transaction of transactions){
        if (!transaction.player){
            continue;
        }

        const roundIndex = getRoundIndex(transaction.time);

        if (roundIndex === null){
            continue;
        }

        const playerKey = getPlayerKey(transaction.player.name);

        profitChanges[roundIndex][playerKey] += transaction.amount;

        latestRoundIndex = Math.max(latestRoundIndex, roundIndex);
    }

    const cumulativeProfit = {
        shawry: 0,
        jp: 0,
        shaz: 0,
    };

    return ROUND_LABELS
        .slice(0, latestRoundIndex + 1)
        .map((round, index) => {
            cumulativeProfit.shawry += profitChanges[index].shawry;
            cumulativeProfit.jp += profitChanges[index].jp;
            cumulativeProfit.shaz += profitChanges[index].shaz;

            return {
                round,
                shawry: Number(cumulativeProfit.shawry.toFixed(2)),
                jp: Number(cumulativeProfit.jp.toFixed(2)),
                shaz: Number(cumulativeProfit.shaz.toFixed(2)),
            };
        });
}