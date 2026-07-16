const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_ROUND = 7;

/**
 * Round 0 is a special opening period:
 * Monday 2 March to Monday 9 March 2026.
 */
const ROUND_ZERO_START = Date.UTC(2026, 2, 2);

/**
 * From Round 1 onwards, rounds run Tuesday to Monday.
 */
const ROUND_ONE_START = Date.UTC(2026, 2, 10);

export const ROUND_LABELS = [
  ...Array.from({ length: 25 }, (_, index) => `Round ${index}`),
  "Wild Card Round",
  "Finals Week 1",
  "Semi Finals",
  "Preliminary Finals",
  "Grand Final",
] as const;

function getDateOnlyValue(date: Date): number {
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
}

export function getRoundIndex(date: Date): number | null {
  const transactionDate = getDateOnlyValue(date);

  if (transactionDate < ROUND_ZERO_START) {
    return null;
  }

  if (transactionDate < ROUND_ONE_START) {
    return 0;
  }

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