"use client";

import {
  Copy,
  DotSquare,
  Grid,
  HomeIcon,
  Palette,
  Shuffle,
  Check,
} from "lucide-react";
import { useState } from "react";
import { Dock, DockIcon, DockItem } from "@/components/ui/dock";
import { MorphingThemeToggle } from "@/components/theme/theme-toggle";
import { useRouter } from "next/navigation";
import { useBackground } from "@/components/background-provider";
import handleCopyCode from "@/components/handle-code-copy";
import { BgSpotPopover } from "@/components/bg-spot-popover";
import { BgGridPopover } from "@/components/bg-grid-popover";
import { BgDotsPopover } from "@/components/bg-dots-popover";

export default function Background() {
  const router = useRouter();
  const {
    spots,
    grid,
    dots,
    addSpot,
    removeSpot,
    updateSpot,
    updateGrid,
    updateDots,
    randomizeBackground,
  } = useBackground();
  const [copied, setCopied] = useState(false);
  const [activeSpotIndex, setActiveSpotIndex] = useState(0);

  const handleCopy = () => {
    handleCopyCode(spots, grid, dots);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2sec
  };

  const data = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
      ),
      function: () => router.push("/"),
    },
    {
      title: "Colors",
      icon: <BgSpotPopover />,
      function: () => {},
    },
    {
      title: "Dots",
      icon: <BgDotsPopover />,
      function: () => {},
    },
    {
      title: "Grid",
      icon: <BgGridPopover />,
      function: () => {},
    },
    {
      title: "Randomize",
      icon: (
        <Shuffle className="h-full w-full text-neutral-600 dark:text-neutral-300" />
      ),
      function: () => randomizeBackground(),
    },
    {
      title: "Copy Code",
      icon: copied ? (
        <Check className="h-full w-full text-green-500 dark:text-green-400" />
      ) : (
        <Copy className="h-full w-full text-neutral-600 dark:text-neutral-300" />
      ),
      function: handleCopy,
    },
  ];

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-16 right-16 z-10">
        <MorphingThemeToggle />
      </div>
      <div className="absolute bottom-2 left-1/2 max-w-full -translate-x-1/2">
        <Dock className="items-end pb-3">
          {data.map((item, idx) => (
            <DockItem
              key={idx}
              title={item.title} // Pass the title for tooltip and animation control
              className="aspect-square hover:cursor-pointer rounded-full bg-gray-200 dark:bg-neutral-800"
              onClick={item.function}
            >
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    </main>
  );
}
