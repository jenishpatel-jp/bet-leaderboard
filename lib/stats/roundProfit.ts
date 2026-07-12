import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/client";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_ROUND = 7;

/**
 * Round 0 runs from:
 * Tuesday 3 March 2026
 * through Monday 9 March 2026.
 */

const ROUND_LABELS = [
    ...Array.from({ length:25 }, (_, index) => `Round ${index}`),
    "Wild Card Round",
    "Finals Week 1",
    "Semi Finals",
    "Preliminary Finals",
    "Grand Finals"
] as const;

