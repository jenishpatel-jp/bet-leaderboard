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
                <CardDescription className="text-center text-white">Stats for the 1st Quarter</CardDescription>
            </CardHeader>
            <CardContent >
                <div className="grid gird-cols-4 grid-rows-6">
                    <p className="text-white"></p>
                    <p className="text-white">Shawry</p>
                    <p className="text-white">Shawry</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default BettingCard