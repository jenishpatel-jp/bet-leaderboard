import {
  Card,
  CardContent,
  CardDescription,
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

            
            <CardContent className="p-0">
                {/* Header */}
                <div className="grid grid-cols-[2fr_repeat(3,1fr)] border-b px-4 py-3 font-bold *:text-white text-xl">
                    <div></div>
                    <div className="text-center">Shawry</div>
                    <div className="text-center">JP</div>
                    <div className="text-center">Shaz</div>
                </div>

                {/* Wins */}
                <div className="grid grid-cols-[2fr_repeat(3,1fr)] px-4 py-3 font-bold *:text-white text-lg">
                    <div>Wins</div>
                    <div className="text-center">12</div>
                    <div className="text-center">10</div>
                    <div className="text-center">8</div>
                </div>

                {/* Losses */}
                <div className="grid grid-cols-[2fr_repeat(3,1fr)] px-4 py-3 font-bold *:text-white text-lg">
                    <div>Losses</div>
                    <div className="text-center">5</div>
                    <div className="text-center">13</div>
                    <div className="text-center">3</div>
                </div>

                {/* Cashed out */}
                <div className="grid grid-cols-[2fr_repeat(3,1fr)] px-4 py-3 font-bold *:text-white text-lg">
                    <div>Cash Out</div>
                    <div className="text-center">1</div>
                    <div className="text-center">2</div>
                    <div className="text-center">0</div>
                </div>

                {/* Win % */}
                <div className="grid grid-cols-[2fr_repeat(3,1fr)] px-4 py-3 font-bold *:text-white text-lg">
                    <div>Win %</div>
                    <div className="text-center">50%</div>
                    <div className="text-center">13%</div>
                    <div className="text-center">3%</div>
                </div>

                {/* Profit*/}
                <div className="grid grid-cols-[2fr_repeat(3,1fr)] px-4 py-3 font-bold *:text-white text-lg">
                    <div>Profit</div>
                    <div className="text-center">$120</div>
                    <div className="text-center">$40</div>
                    <div className="text-center">$80</div>
                </div>

            </CardContent>

            

        </Card>
    )
}

export default BettingCard