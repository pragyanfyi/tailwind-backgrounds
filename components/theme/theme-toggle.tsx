"use client";
import { useId, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import {
  MorphingPopover,
  MorphingPopoverTrigger,
  MorphingPopoverContent,
} from "@/components/ui/morphing-popover";
import { Button } from "@/components/ui/button";

export function MorphingThemeToggle() {
  const uniqueId = useId();
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const closePopover = () => {
    setIsOpen(false);
  };

  return (
    <MorphingPopover
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.3,
      }}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <MorphingPopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <motion.div
            layoutId={`theme-toggle-${uniqueId}`}
            className="flex items-center justify-center"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </MorphingPopoverTrigger>
      <MorphingPopoverContent className="rounded-xl border border-zinc-950/10 bg-white p-0 shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] dark:border-zinc-50/10 dark:bg-zinc-700">
        <div className="w-32 py-2 px-2">
          <div className="space-y-1">
            <button
              onClick={() => {
                setTheme("light");
                closePopover();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-zinc-950 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-600"
            >
              <Sun size={16} className="text-zinc-900 dark:text-zinc-100" />
              Light
            </button>
            <button
              onClick={() => {
                setTheme("dark");
                closePopover();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-zinc-950 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-600"
            >
              <Moon size={16} className="text-zinc-900 dark:text-zinc-100" />
              Dark
            </button>
            <button
              onClick={() => {
                setTheme("system");
                closePopover();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-zinc-950 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-600"
            >
              <Monitor size={16} className="text-zinc-900 dark:text-zinc-100" />
              System
            </button>
          </div>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}
