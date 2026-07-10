import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/client";
import { readExcelSheet, toBooleanOrNull } from "@/lib/excel";
import { excelDateToJSDate } from "@/lib/date";

type SportsbetRow = {
    "Time (AEST)": number;
    Type: string;
    Summary: string;
    "Transaction Id": string;
    "Bet Id"?: string;
    Amount: number;
    Balance: number;
    Single?: boolean;
    Multiple?: boolean;
    Exotic?: boolean;
    Pool?: boolean;
    Player: string;
}


// Import players into the database
const importPlayers = async(rows: SportsbetRow[]) => {
    const players = rows.map((row) => row.Player).filter(Boolean);
    const uniquePlayers = new Set(players);
    const playerNames = [...uniquePlayers];

    console.log("Players found", playerNames);

    for (const name of playerNames){
        await prisma.player.upsert({
            where: {
                name,
            },
            update: {},
            create: {
                name,
            }
        })
    }

    const playerCount = await prisma.player.count();
    console.log(`Database now has ${playerCount} players`);
}

// Create a map of player names to their IDs
const createPlayerMap = async() => {
    const players = await prisma.player.findMany();

    const playerMap = new Map<string, number>();
    for (const player of players){
        playerMap.set(player.name, player.id);
    }

    return playerMap;
};

// Map the transaction type from the Excel file to the TransactionType enum
const mapTransactionType = (type: string) : TransactionType => {
    switch (type) {
        case "Deposit":
            return TransactionType.DEPOSIT;
        case "Bet Stake":
            return TransactionType.BET_STAKE;
        case "Win":
            return TransactionType.WIN;
        case "Void":
            return TransactionType.VOID;
        case "Cashed Out":
            return TransactionType.CASHED_OUT;
        default:
            throw new Error(`Unknown transaction type: ${type}`);
    }
};

const readExcel = () => {
    return readExcelSheet<SportsbetRow>("uploads/sportsbet.xlsx");
}


// Import transactions into the database
const importTransactions = async(
    rows: SportsbetRow[],
    playerMap: Map<string, number>
) => {

    let importedCount = 0;

    for (const row of rows){
        const playerId = playerMap.get(row.Player);

        if (!playerId){
            throw new Error(`Player not found for name: ${row.Player}`);
        };

        await prisma.betTransaction.upsert({
            where: {
                transactionId: String(row["Transaction Id"]),
            },
            update: {
                betId: row["Bet Id"] ? String(row["Bet Id"]) : null,
                time: excelDateToJSDate(Number(row["Time (AEST)"])),
                type: mapTransactionType(row.Type),
                summary: row.Summary,
                amount: row.Amount,
                balance: row.Balance,
                single: toBooleanOrNull(row.Single),
                multiple: toBooleanOrNull(row.Multiple),
                exotic: toBooleanOrNull(row.Exotic),
                pool: toBooleanOrNull(row.Pool),
                playerId,
            },
            create: {
                transactionId: String(row["Transaction Id"]),
                betId: row["Bet Id"] ? String(row["Bet Id"]) : null,
                time: excelDateToJSDate(Number(row["Time (AEST)"])),
                type: mapTransactionType(row.Type),
                summary: row.Summary,
                amount: row.Amount,
                balance: row.Balance,
                single: toBooleanOrNull(row.Single),
                multiple: toBooleanOrNull(row.Multiple),
                exotic: toBooleanOrNull(row.Exotic),
                pool: toBooleanOrNull(row.Pool),
                playerId,
            }
        })
        importedCount++;
    }

    console.log(`Imported ${importedCount} transactions`);

}

// Main function to execute the import process
async function main(){  

    const rows = readExcel();
    console.log(`Found ${rows.length} rows`);

    await importPlayers(rows);

    const playerMap = await createPlayerMap();
    
    await importTransactions(rows, playerMap);

    const transactionCount = await prisma.betTransaction.count();
    console.log(`Database now has ${transactionCount} transactions`);
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
