import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




const BettingCard = () => {
    return (
        <Card className="bg-background text-white w-1/6 h-1/2 rounded-3xl flex border-2">
            <CardHeader>
                <CardTitle className="text-center text-3xl">1st Quarter</CardTitle>
                <CardDescription className="text-center text-white">Opening Round - Round 6</CardDescription>
            </CardHeader>
            <CardContent >
                <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] border-b px-4 py-3 text-sm font-medium *:text-white">
                    <span>Player</span>
                    <span className="text-center">Wins</span>
                    <span className="text-center">Losses</span>
                    <span className="text-center">Win %</span>
                    <span className="text-right">Win $</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default BettingCard