'use client';
import React from 'react';
import PodiumGraph from './components/charts/PodiumGraph';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col justify-center items-center bg-black dark:bg-black border-2">
        <h1 className="text-5xl font-bold text-center p-2 m-2 text-white">Bet Leaderboard</h1>
        <PodiumGraph />
      </main>
    </div>
  );
};
