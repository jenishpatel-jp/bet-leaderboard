import "dotenv/config";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/lib/generated/prisma/client";

type SportsbetRow = {
    "Time (AEST)": string;
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

// Read the Excel file and convert it to JSON
const readExcel = () => {
    const workbook = XLSX.readFile("uploads/sportsbet.xlsx");
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json<SportsbetRow>(worksheet);
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

// Convert a value to boolean or null
const toBooleanOrNull = (value: unknown): boolean | null => {
    if (value === undefined || value === null || value === ""){
        return true;
    }

    if (value === true || value === "TRUE" || value === "true" || value === 1){
        return true;
    }

    if (value === false || value === "FALSE" || value === "false" || value === 0){
        return false;
    }

    throw new Error(`Unexpected boolean value ${value}`);
};


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
                time: new Date(row["Time (AEST)"]),
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
                time: new Date(row["Time (AEST)"]),
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
