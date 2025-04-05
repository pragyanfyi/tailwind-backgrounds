import {
  Copy,
  DotSquare,
  Grid,
  HomeIcon,
  Palette,
  Shuffle,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { MorphingThemeToggle } from "@/components/theme/theme-toggle";

const data = [
  {
    title: "Home",
    icon: (
      <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Colors",
    icon: (
      <Palette className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Dots",
    icon: (
      <DotSquare className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Grid",
    icon: (
      <Grid className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Randomize",
    icon: (
      <Shuffle className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Copy Code",
    icon: (
      <Copy className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
];

export default function Background() {
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
              className="aspect-square hover:cursor-pointer rounded-full bg-gray-200 dark:bg-neutral-800"
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    </main>
  );
}
