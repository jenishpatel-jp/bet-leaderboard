'use client';
import React from 'react';
import PodiumGraph from './components/charts/PodiumGraph';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black border-2">
      <main className="flex flex-1 w-full max-w-3xl flex-col justify-center bg-white dark:bg-black border-2">
        <h1 className="text-5xl font-bold text-center p-2 m-2">Bet Leaderboard</h1>
        <PodiumGraph />
        <h2 className="text-2xl font-semibold text-center p-2 m-2">Leaderboard</h2>
        <h2 className="text-2xl font-semibold text-center p-2 m-2">Graphs</h2>
        <h2 className="text-2xl font-semibold text-center p-2 m-2">Quarterly Report</h2>
        <h2 className="text-2xl font-semibold text-center p-2 m-2">Transactions</h2>
      </main>
    </div>
  );
}
