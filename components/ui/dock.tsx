"use client";
import React, { useState } from "react";
import { motion, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  tooltip?: string;
  popoverContent?: React.ReactNode;
  onClick?: () => void;
  title?: string;
  disableAnimation?: boolean;
};

export type DockProps = {
  children: React.ReactNode;
  className?: string;
};

export type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

function Dock({ children, className }: DockProps) {
  return (
    <Card className={cn("mx-auto w-fit py-4", className)}>
      <CardContent className="flex items-center gap-6 px-4">
        {children}
      </CardContent>
    </Card>
  );
}

function DockItem({
  children,
  className,
  popoverContent,
  onClick,
  title,
  disableAnimation,
}: DockItemProps) {
  const controls = useAnimation();
  const [open, setOpen] = useState(false);

  const noAnimationItems = ["Grid", "Dots", "Colors"];
  const isNoAnimationItem = noAnimationItems.includes(title || "");

  const handleClick = () => {
    if (!isNoAnimationItem && !disableAnimation) {
      controls.start({
        scale: [1, 1.15, 0.95, 1.05, 1],
        transition: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] },
      });
    }

    if (onClick) onClick();
  };

  // const displayTooltip = tooltip || title;

  const item = (
    <motion.div
      onClick={handleClick}
      {...(!isNoAnimationItem && !disableAnimation
        ? { animate: controls }
        : {})}
      className={cn(
        "relative inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-md",
        className
      )}
      tabIndex={0}
      role="button"
    >
      {children}
    </motion.div>
  );

  // If we have popover content, wrap in Popover
  if (popoverContent) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* {displayTooltip ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{item}</TooltipTrigger>
                <TooltipContent>
                  <p>{displayTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            item
          )} */}
        </PopoverTrigger>
        <PopoverContent className="w-64">{popoverContent}</PopoverContent>
      </Popover>
    );
  }

  // if (displayTooltip) {
  //   return (
  //     <TooltipProvider>
  //       <Tooltip>
  //         <TooltipTrigger asChild>{item}</TooltipTrigger>
  //         <TooltipContent>
  //           <p>{displayTooltip}</p>
  //         </TooltipContent>
  //       </Tooltip>
  //     </TooltipProvider>
  //   );
  // }

  return item;
}

function DockIcon({ children, className }: DockIconProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {children}
    </div>
  );
}

export { Dock, DockItem, DockIcon };
