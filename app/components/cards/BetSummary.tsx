"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const BetSummary = () => {
    return (
        <Table className="w-3/5 table-fixed border m-4 ">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center font-semibold">Player</TableHead>
                    <TableHead className="text-center font-semibold">Bets</TableHead>
                    <TableHead className="text-center font-semibold">Valid</TableHead>
                    <TableHead className="text-center font-semibold">Wins</TableHead>
                    <TableHead className="text-center font-semibold">Losses</TableHead>
                    <TableHead className="text-center font-semibold">Void</TableHead>
                    <TableHead className="text-center font-semibold">Cash Out</TableHead>
                    <TableHead className="text-center font-semibold">Win %</TableHead>
                    <TableHead className="text-center font-semibold">Win $</TableHead>
                    <TableHead className="text-center font-semibold">Losses $</TableHead>
                    <TableHead className="text-center font-semibold">Profit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="border-2 text-center py-4">Shawry</TableCell>
                    <TableCell className="border-2 text-center py-4">10</TableCell>
                    <TableCell className="border-2 text-center py-4">11</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-2 text-center py-4">Shaz</TableCell>
                    <TableCell className="border-2 text-center py-4">10</TableCell>
                    <TableCell className="border-2 text-center py-4">11</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-2 text-center py-4">JP</TableCell>
                    <TableCell className="border-2 text-center py-4">10</TableCell>
                    <TableCell className="border-2 text-center py-4">11</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                    <TableCell className="border-2 text-center py-4">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default BetSummary