import "dotenv/config";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";

type SportsbetRow = {
    "Time (AEST)": string;
    Type: string;
    Summary: string;
    "Transaction Id": string;
    "Bet Id"?: string;
    Amount: number;
    Balance: number;
    Single?: string;
    Multiple?: string;
    Exoctic?: string;
    Pool?: string;
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
        console.log(`Imported ${playerNames.length} players`);
    }

    const playerCount = await prisma.player.count();
    console.log(`Database now has ${playerCount} players`);
}

const createPlayerMap = async() => {
    const players = await prisma.player.findMany();

    const playerMap = new Map<string, number>();
    for (const player of players){
        playerMap.set(player.name, player.id);
    }

    return playerMap;
};

// Main function to execute the import process
async function main(){  

    const rows = readExcel();
    await importPlayers(rows);    
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
