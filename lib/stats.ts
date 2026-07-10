import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/client";

export const getLeaderboard = async () => {

    const players = await prisma.player.findMany({
        include: {
            transactions: true,
        },
    });

    return players.map((player) => {
        const bettingTransactions = player.transactions.filter(
            (transaction) => transaction.type !== TransactionType.DEPOSIT
        );

        const totalProfit = bettingTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        return {
            player: player.name,
            totalProfit
        };

    });
    
};

const leaderboard = await getLeaderboard();
console.log(leaderboard);