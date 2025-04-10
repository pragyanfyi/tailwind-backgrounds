import { useBackground } from "@/components/background-provider";
import generateRandomColor from "@/lib/generate-random-color";

export function useRandomizeBackground() {
  const { spots, grid, dots, setSpots, setGrid, setDots } = useBackground();

  const randomizeBackground = () => {
    //Randomize spots
    const newSpots = spots.map((spot) => ({
      ...spot,
      color: generateRandomColor(),
      opacity: Math.random() * 0.5 + 0.3,
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      blur: `${Math.floor(Math.random() * 100) + 40}px`,
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

  return randomizeBackground;
}
