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
        <Table className="border-2 w-1/2 h-110 mx-auto">
            <TableHeader>
                <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Total Bets Placed</TableHead>
                    <TableHead>Total Valid Bets</TableHead>
                    <TableHead>Wins</TableHead>
                    <TableHead>Losses</TableHead>
                    <TableHead>Voids</TableHead>
                    <TableHead>Cashed out</TableHead>
                    <TableHead>Total Win %</TableHead>
                    <TableHead>Total Win $</TableHead>
                    <TableHead>Total Losses $</TableHead>
                    <TableHead>Profit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Shawry</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>11</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Shaz</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>11</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>JP</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>11</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default BetSummary