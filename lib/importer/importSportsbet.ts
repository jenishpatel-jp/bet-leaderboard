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

async function main(){
    const workbook = XLSX.readFile("uploads/sportsbet.xlsx");
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json<SportsbetRow>(worksheet);    

    console.log(`Found ${rows.length} rows`);

    //const playerNames = [...new Set(rows.map((row) => row.Player).filter(Boolean))];

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
            },
        });

        console.log(`Imported player ${name}`);
    }

    const playerCount = await prisma.player.count();

    console.log(`Database now has ${playerCount} players`);
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
