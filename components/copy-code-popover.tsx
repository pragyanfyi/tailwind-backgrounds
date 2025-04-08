import * as React from "react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import Image from "next/image";

interface CopyCodePopoverProps {
  spots: SpotSettings[];
  grid: GridSettings;
  dots: DotsSettings;
}

export function CopyCodePopover({ spots, grid, dots }: CopyCodePopoverProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Create JSX code for background elements
  const generateJSXCode = () => {
    // Round opacity to the nearest appropriate Tailwind class
    const spotsJSX = spots
      .map((spot, index) => {
        return `<div 
  key="${index}" 
  className="absolute -z-10 rounded-full transform -translate-x-1/2 -translate-y-1/2" 
  style={{
    left: '${spot.position.x}%', 
    top: '${spot.position.y}%',
    width: '${spot.size}',
    height: '${spot.size}',
    backgroundColor: '${spot.color}',
    opacity: ${spot.opacity},
    filter: 'blur(${spot.blur})'
  }}
/>`;
      })
      .join("\n");

    const gridJSX = grid.enabled
      ? `<div 
  className="absolute inset-0 w-full h-full -z-20" 
  style={{
    backgroundImage: 'linear-gradient(to right, ${grid.color} 1px, transparent 1px), linear-gradient(to bottom, ${grid.color} 1px, transparent 1px)',
    backgroundSize: '${grid.size} ${grid.size}',
    opacity: ${grid.opacity}
  }}
/>`
      : "";

    const dotsJSX = dots.enabled
      ? `<div 
  className="absolute inset-0 w-full h-full -z-20" 
  style={{
    backgroundImage: 'radial-gradient(${dots.color} 1px, transparent 1px)',
    backgroundSize: '${dots.size} ${dots.size}',
    opacity: ${dots.opacity}
  }}
/>`
      : "";

    return `{/* Background Elements */}
<div className="fixed inset-0 w-full min-h-screen overflow-hidden">
  {/* Base background */}
  <div className="absolute inset-0 w-full h-full dark:bg-black bg-white -z-30" />
  
  ${gridJSX ? gridJSX : ""}
  
  ${dotsJSX ? dotsJSX : ""}
  
  {/* Spots */}
  ${spotsJSX}
</div>

{/* Write your content here */}
<main className="relative z-10">
  {/* Your code here */}
</main>`;
  };

  // Create HTML code for background elements
  const generateHTMLCode = () => {
    const spotsHTML = spots
      .map((spot, index) => {
        return `<div 
  style="
    position: absolute; 
    z-index: -10; 
    border-radius: 50%;
    transform: translate(-50%, -50%);
    left: ${spot.position.x}%; 
    top: ${spot.position.y}%;
    width: ${spot.size};
    height: ${spot.size};
    background-color: ${spot.color};
    opacity: ${spot.opacity};
    filter: blur(${spot.blur});"
></div>`;
      })
      .join("\n");

    const gridHTML = grid.enabled
      ? `<div 
  style="
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -20;
    background-image: linear-gradient(to right, ${grid.color} 1px, transparent 1px), linear-gradient(to bottom, ${grid.color} 1px, transparent 1px);
    background-size: ${grid.size} ${grid.size};
    opacity: ${grid.opacity};"
></div>`
      : "";

    const dotsHTML = dots.enabled
      ? `<div 
  style="
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -20;
    background-image: radial-gradient(${dots.color} 1px, transparent 1px);
    background-size: ${dots.size} ${dots.size};
    opacity: ${dots.opacity};"
></div>`
      : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Background Effects</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
    }
    .background-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .base-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: -30;
      background-color: white;
    }
    @media (prefers-color-scheme: dark) {
      .base-bg {
        background-color: black;
      }
    }
    .content {
      position: relative;
      z-index: 10;
    }
  </style>
</head>
<body>
  <!-- Background Elements -->
  <div class="background-container">
    <!-- Base background -->
    <div class="base-bg"></div>
    
    ${gridHTML}
    
    ${dotsHTML}
    
    <!-- Spots -->
    ${spotsHTML}
  </div>

  <!-- Write your content here -->
  <main class="content">
    <!-- Your code here -->
  </main>
</body>
</html>`;
  };

  const handleCopyJSX = () => {
    const jsxCode = generateJSXCode();
    navigator.clipboard.writeText(jsxCode);
    setCopied("jsx");
    toast.success("JSX code copied to clipboard");
    setOpen(false); // Close the popover
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyHTML = () => {
    const htmlCode = generateHTMLCode();
    navigator.clipboard.writeText(htmlCode);
    setCopied("html");
    toast.success("HTML code copied to clipboard");
    setOpen(false); // Close the popover
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="h-full w-full text-neutral-600 dark:text-neutral-300 cursor-pointer">
          {copied ? (
            <Check className="h-full w-full text-green-500 dark:text-green-400" />
          ) : (
            <Copy className="h-full w-full" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-0" align="center" side="top">
        <div className="flex flex-col gap-0">
          <button
            onClick={handleCopyJSX}
            className="flex flex-row items-center justify-start gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-t-md w-full cursor-pointer"
          >
            <div className="relative w-6 h-6 flex-shrink-0">
              <Image
                src="/logo/react.svg"
                alt="React Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="text-sm">JSX</span>
          </button>
          <div className="h-px bg-gray-200 dark:bg-gray-700 w-full" />
          <button
            onClick={handleCopyHTML}
            className="flex flex-row items-center justify-start gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-b-md w-full cursor-pointer"
          >
            <div className="relative w-6 h-6 flex-shrink-0">
              <Image
                src="logo/html.svg"
                alt="HTML Logo"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <span className="text-sm">HTML</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
