"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { motion } from "motion/react";
import generateRandomColor from "@/lib/generate-random-color";

type BackgroundContextType = {
  spots: SpotSettings[];
  grid: GridSettings;
  dots: DotsSettings;
  addSpot: () => void;
  removeSpot: (index: number) => void;
  updateSpot: (index: number, settings: Partial<SpotSettings>) => void;
  updateGrid: (settings: Partial<GridSettings>) => void;
  updateDots: (settings: Partial<DotsSettings>) => void;
  setSpots: React.Dispatch<React.SetStateAction<SpotSettings[]>>;
  setGrid: React.Dispatch<React.SetStateAction<GridSettings>>;
  setDots: React.Dispatch<React.SetStateAction<DotsSettings>>;
};

const defaultSpot: SpotSettings = {
  color: "#8b5cf6",
  size: "500px",
  opacity: 0.5,
  position: {
    x: 70,
    y: 20,
  },
  blur: "80px",
};

const defaultGrid: GridSettings = {
  enabled: true,
  color: "#80808012",
  size: "24px",
  opacity: 0.1,
};

const defaultDots: DotsSettings = {
  enabled: false,
  color: "#e5e7eb",
  size: "16px",
  opacity: 0.5,
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
}

export function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [spots, setSpots] = useState<SpotSettings[]>([defaultSpot]);
  const [grid, setGrid] = useState<GridSettings>(defaultGrid);
  const [dots, setDots] = useState<DotsSettings>(defaultDots);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addSpot = () => {
    const newSpot = {
      ...defaultSpot,
      color: generateRandomColor(),
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
    };
    setSpots([...spots, newSpot]);
  };

  const removeSpot = (index: number) => {
    if (spots.length > 1) {
      const newSpots = [...spots];
      newSpots.splice(index, 1);
      setSpots(newSpots);
    }
  };

  const updateSpot = (index: number, settings: Partial<SpotSettings>) => {
    const newSpots = [...spots];
    newSpots[index] = {
      ...newSpots[index],
      ...settings,
      position: {
        ...newSpots[index].position,
        ...(settings.position || {}),
      },
    };
    setSpots(newSpots);
  };

  const updateGrid = (settings: Partial<GridSettings>) => {
    setGrid({
      ...grid,
      ...settings,
    });
  };

  const updateDots = (settings: Partial<DotsSettings>) => {
    setDots({
      ...dots,
      ...settings,
    });
  };

  return (
    <BackgroundContext.Provider
      value={{
        spots,
        grid,
        dots,
        addSpot,
        removeSpot,
        updateSpot,
        updateGrid,
        updateDots,
        setSpots,
        setGrid,
        setDots,
      }}
    >
      <div className="fixed inset-0 h-screen w-screen overflow-hidden">
        {isClient && (
          <>
            {/* Base background color */}
            <div className="absolute inset-0 h-full w-full dark:bg-black bg-white -z-30" />

            {/* Grid Background */}
            {grid.enabled && (
              <div
                className="absolute inset-0 h-full w-full -z-20"
                style={{
                  backgroundImage: `linear-gradient(to right, ${grid.color} 1px, transparent 1px), linear-gradient(to bottom, ${grid.color} 1px, transparent 1px)`,
                  backgroundSize: `${grid.size} ${grid.size}`,
                  opacity: grid.opacity,
                }}
              />
            )}

            {/* Dots Background */}
            {dots.enabled && (
              <div
                className="absolute inset-0 h-full w-full -z-20"
                style={{
                  backgroundImage: `radial-gradient(${dots.color} 1px, transparent 1px)`,
                  backgroundSize: `${dots.size} ${dots.size}`,
                  opacity: dots.opacity,
                }}
              />
            )}

            {/* Spots */}
            {spots.map((spot, index) => (
              <motion.div
                key={index}
                className="absolute -z-10 rounded-full"
                style={{
                  width: spot.size,
                  height: spot.size,
                  backgroundColor: spot.color,
                  opacity: spot.opacity,
                  filter: `blur(${spot.blur})`,
                  left: `${spot.position.x}%`,
                  top: `${spot.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: spot.opacity }}
                transition={{ duration: 0.8 }}
              />
            ))}
          </>
        )}
      </div>
      {children}
    </BackgroundContext.Provider>
  );
}
