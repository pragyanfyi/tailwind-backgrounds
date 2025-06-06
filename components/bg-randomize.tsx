"use client";

import { Shuffle } from "lucide-react";
import { useBackground } from "@/components/background-provider";
import generateRandomColor from "@/lib/generate-random-color";

export function BgRandomize() {
  const { spots, grid, dots, setSpots, setGrid, setDots } = useBackground();

  const randomizeBackground = () => {
    //Randomize spots
    const newSpots = spots.map((spot) => ({
      ...spot,
      color: generateRandomColor(),
      opacity: Math.random() * 0.3 + 0.2,
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      blur: `${Math.floor(Math.random() * 100) + 50}px`,
    }));

    setSpots(newSpots);

    // Randomize grid
    setGrid({
      ...grid,
      color: `${generateRandomColor()}12`,
      opacity: Math.random() * 0.8 + 0.2,
    });

    // Randomize dots
    setDots({
      ...dots,
      color: generateRandomColor(),
      opacity: Math.random() * 0.5 + 0.3,
    });
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center cursor-pointer"
      onClick={randomizeBackground}
    >
      <Shuffle className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    </div>
  );
}
