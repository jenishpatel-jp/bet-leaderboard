import BetSummary from './components/cards/BetSummary';
import LineGraph from './components/charts/LineGraph';
import PodiumGraph from './components/charts/PodiumGraph';
import { getPlayerProfit } from '@/lib/stats/profit';
import { getRoundProfitData } from '@/lib/stats/roundProfit';

export default async function Home(  ) {

  const profitData = await getPlayerProfit();

  const podiumChartData = profitData.map((item) => ({
    ...item,
    fill: `var(--color-${item.player.toLocaleLowerCase()})`,
  }));

  const roundProfitData = await getRoundProfitData();

  //console.log(roundProfitData)


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col justify-center items-center bg-background dark:bg-black border-2">
        
        <h1 className="text-5xl font-bold text-center p-2 m-2 text-foreground">Bet Leaderboard</h1>
        
        <div className="flex w-full h-screen bg-background items-center justify-center ">
          <LineGraph chartData={roundProfitData} />
        </div>
        
        {/* <div className="flex w-full h-screen bg-background border-2 items-center justify-center">
          <div className='w-3/5'>
            <BetSummary />
          </div>
        </div> */}

        <div className="flex w-full h-screen bg-background items-center justify-center">
          <PodiumGraph chartData={podiumChartData} />
        </div>


      </main>
    </div>
  );
};
