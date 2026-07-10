import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/enums";

export const getPodiumDate = async () => {
    const players = await prisma.player.findMany({
        include: {
            transactions: true,
        },
    });

    return players
        .map((player) => {
            const totalProfit = player.transactions
                .filter((transactions) => transactions.type !== TransactionType.DEPOSIT)
                .reduce((sum, transaction) => sum + transaction.amount, 0);

            return {
                player: player.name,
                profit: Number(totalProfit.toFixed(2)),
            };
    })
    .sort((a,b) => b.profit - a.profit)

}