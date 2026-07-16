import { getBettingCardData } from '@/lib/stats/cardStats';
import LineGraph from './components/charts/LineGraph';
import { getRoundProfitData } from '@/lib/stats/roundProfit';
import BettingCardCarousel from "./components/cards/BettingCardCarousel";

export default async function Home(  ) {

  const roundProfitData = await getRoundProfitData();

  //console.log(roundProfitData)

  const bettingCards = await getBettingCardData([
    "Shawry",
    "JP",
    "Shaz"
  ]);



  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col justify-center items-center bg-background dark:bg-black border-2">
        
        <h1 className="text-5xl font-bold text-center p-2 m-2 text-white">Betting Leaderboard</h1>
        
        {/* Line Graph Section */}
        <section className="flex w-full h-screen bg-background items-center justify-center ">
          <LineGraph chartData={roundProfitData} />
        </section>
        
        {/* Betting Card Section */}
        <section className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6 py-12">
          <BettingCardCarousel cards={bettingCards} />
        </section>

      </main>
    </div>
  );
};
