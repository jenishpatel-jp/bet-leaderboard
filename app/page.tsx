import { getBettingCardData } from '@/lib/stats/cardStats';
import BettingCard from './components/cards/BettingCard';
import LineGraph from './components/charts/LineGraph';
import PodiumGraph from './components/charts/PodiumGraph';
import { getPlayerProfit } from '@/lib/stats/profit';
import { getRoundProfitData } from '@/lib/stats/roundProfit';

export default async function Home(  ) {

  const profitData = await getPlayerProfit();

  const roundProfitData = await getRoundProfitData();

  //console.log(roundProfitData)

  const podiumChartData = profitData.map((item) => ({
    ...item,
    fill: `var(--color-${item.player.toLocaleLowerCase()})`,
  }));

  const bettingCards = await getBettingCardData([
    "Shawry",
    "JP",
    "Shaz"
  ]);



  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col justify-center items-center bg-background dark:bg-black border-2">
        
        <h1 className="text-5xl font-bold text-center p-2 m-2 text-foreground">Bet Leaderboard</h1>
        
        {/* Line Graph Section */}
        <section className="flex w-full h-screen bg-background items-center justify-center ">
          <LineGraph chartData={roundProfitData} />
        </section>
        
        {/* Betting Card Section */}
        <section className="flex w-full h-screen bg-background border-2 items-center justify-center">
          {bettingCards.map((card) => (
              <BettingCard
                key={card.id}
                card={card}
              />
            ))}
        </section>

        <div className="flex w-full h-screen bg-background items-center justify-center">
          <PodiumGraph chartData={podiumChartData} />
        </div>


      </main>
    </div>
  );
};
