"use client";
import { HomeIcon } from "lucide-react";
import { Dock, DockIcon, DockItem } from "@/components/ui/dock";
import { MorphingThemeToggle } from "@/components/theme/theme-toggle";
import { useRouter } from "next/navigation";
import { useBackground } from "@/components/background-provider";
import { BgSpotPopover } from "@/components/bg-spot-popover";
import { BgGridPopover } from "@/components/bg-grid-popover";
import { BgDotsPopover } from "@/components/bg-dots-popover";
import { CopyCodePopover } from "@/components/copy-code-popover";
import { BgRandomize } from "@/components/bg-randomize";

export default function Background() {
  const router = useRouter();
  const { spots, grid, dots } = useBackground();

  const data = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
      ),
      function: () => router.push("/"),
      // Only show on md screens and up
      className: "hidden md:flex",
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
      icon: <BgRandomize />,
      function: () => {},
    },
    {
      title: "Copy Code",
      icon: <CopyCodePopover spots={spots} grid={grid} dots={dots} />,
      function: () => {},
    },
  ];

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-16 right-16 z-10">
        <MorphingThemeToggle />
      </div>
      <div className="absolute bottom-2 left-1/2 max-w-full -translate-x-1/2">
        <Dock className="items-end pb-3">
          {data.map((item, idx) => (
            <DockItem
              key={idx}
              title={item.title}
              className={`aspect-square hover:cursor-pointer rounded-full bg-gray-200 dark:bg-neutral-800 ${
                item.className || ""
              }`}
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
