"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useBackground } from "@/components/background-provider";
import { Shuffle, Palette } from "lucide-react";
import { MorphingThemeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  const router = useRouter();
  const { randomizeBackground } = useBackground();
  const [isExiting, setIsExiting] = useState(false);

  const handleGetStarted = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/background");
    }, 500);
  };

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-16 right-16 z-10">
        <MorphingThemeToggle />
      </div>

      <motion.div
        className="flex flex-col items-center justify-center gap-8 text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Background Generator
        </motion.h1>

        <motion.p
          className="text-lg text-muted-foreground max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Create beautiful backgrounds with spots, grids, and dots for your web
          projects.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="backdrop-blur-xl bg-primary/80 hover:bg-primary/90"
          >
            <Palette className="mr-2 h-5 w-5" />
            Get Started
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={randomizeBackground}
            className="backdrop-blur-xl bg-background/40 border-background/10 hover:bg-background/50"
          >
            <Shuffle className="mr-2 h-5 w-5" />
            Randomize
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
