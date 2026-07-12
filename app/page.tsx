import LineGraph from './components/charts/LineGraph';
import PodiumGraph from './components/charts/PodiumGraph';
import { getPlayerProfit } from '@/lib/stats/profit';

export default async function Home(  ) {

  const profitData = await getPlayerProfit();

  const chartData = profitData.map((item) => ({
    ...item,
    fill: `var(--color-${item.player.toLocaleLowerCase()})`,
  }));


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col justify-center items-center bg-black dark:bg-black border-2">
        <h1 className="text-5xl font-bold text-center p-2 m-2 text-white fixed top-6">Bet Leaderboard</h1>
        <PodiumGraph chartData={chartData} />
        <LineGraph />
      </main>
    </div>
  );
};
