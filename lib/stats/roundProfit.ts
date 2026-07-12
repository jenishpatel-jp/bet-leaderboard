import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/client";
import { difference } from "next/dist/build/utils";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_ROUND = 7;

/**
 * Round 0 runs from:
 * Tuesday 3 March 2026
 * through Monday 9 March 2026.
 */

const ROUND_ZERO_START = Date.UTC(2026, 2, 3);

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

    const differenceInDays = Math.floor(
        (transactionDate - ROUND_ZERO_START) / MILLISECONDS_PER_DAY
    );

    if (differenceInDays < 0){
        return null;
    };

    const roundIndex = Math.floor(differenceInDays / DAYS_PER_ROUND);

    if (roundIndex >= ROUND_LABELS.length){
        return null;
    }

    return roundIndex;

}