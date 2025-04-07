"use client";

import { useState, useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { useBackground } from "@/components/background-provider";
import { DockIcon, DockItem } from "@/components/ui/dock";

export function ColorDockItem({ index = 0 }) {
  const { spots, updateSpot } = useBackground();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(spots[index]?.color || "#8b5cf6");
  const [opacity, setOpacity] = useState(spots[index]?.opacity || 0.5);
  const [blur, setBlur] = useState(parseInt(spots[index]?.blur || "80px"));
  const [posX, setPosX] = useState(spots[index]?.position.x || 50);
  const [posY, setPosY] = useState(spots[index]?.position.y || 50);
  const [iconPosition, setIconPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
  });
  const iconRef = useRef(null);

  // Track the icon's position for the fixed popover
  useEffect(() => {
    if (iconRef.current) {
      const updatePosition = () => {
        const rect = iconRef.current.getBoundingClientRect();
        setIconPosition({
          left: rect.left + rect.width / 2,
          top: rect.top,
          width: rect.width,
        });
      };

      updatePosition();

      // Update position on resize
      window.addEventListener("resize", updatePosition);
      return () => window.removeEventListener("resize", updatePosition);
    }
  }, []);

  // Update local state when spots change
  useEffect(() => {
    if (spots[index]) {
      setColor(spots[index].color);
      setOpacity(spots[index].opacity);
      setBlur(parseInt(spots[index].blur));
      setPosX(spots[index].position.x);
      setPosY(spots[index].position.y);
    }
  }, [spots, index]);

  // Handle color change
  const handleColorChange = (newColor) => {
    setColor(newColor);
    updateSpot(index, { color: newColor });
  };

  // Handle opacity change
  const handleOpacityChange = (value) => {
    const newOpacity = value[0];
    setOpacity(newOpacity);
    updateSpot(index, { opacity: newOpacity });
  };

  // Handle blur change
  const handleBlurChange = (value) => {
    const newBlur = value[0];
    setBlur(newBlur);
    updateSpot(index, { blur: `${newBlur}px` });
  };

  // Handle position X change
  const handlePosXChange = (value) => {
    const newX = value[0];
    setPosX(newX);
    updateSpot(index, { position: { x: newX, y: posY } });
  };

  // Handle position Y change
  const handlePosYChange = (value) => {
    const newY = value[0];
    setPosY(newY);
    updateSpot(index, { position: { x: posX, y: newY } });
  };

  // The component renders different elements depending on whether the popover is open
  return (
    <>
      {/* Regular Dock Item that gets clicked to open the popover */}
      {!open && (
        <DockItem
          ref={iconRef}
          className="aspect-square hover:cursor-pointer rounded-full bg-gray-200 dark:bg-neutral-800"
          onClick={() => setOpen(true)}
        >
          {/* <DockLabel>Colors</DockLabel> */}
          <DockIcon>
            <Palette className="h-full w-full text-neutral-600 dark:text-neutral-300" />
          </DockIcon>
        </DockItem>
      )}

      {/* Fixed size Dock Item that stays in place when popover is open */}
      {open && (
        <DockItem
          ref={iconRef}
          className="aspect-square hover:cursor-pointer rounded-full bg-gray-200 dark:bg-neutral-800"
          style={{
            width: "40px", // Fixed width to prevent magnification
            height: "40px", // Fixed height to prevent magnification
          }}
        >
          <DockIcon>
            <Palette className="h-full w-full text-neutral-600 dark:text-neutral-300" />
          </DockIcon>
        </DockItem>
      )}

      {/* Fixed position popover that's positioned based on the icon's current location */}
      {open && (
        <div
          className="fixed z-50"
          style={{
            top: iconPosition.top - 320, // Position above the icon
            left: iconPosition.left - 128, // Center horizontally
          }}
        >
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg border border-border w-64">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Color</Label>
                <HexColorPicker
                  color={color}
                  onChange={handleColorChange}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">Opacity</Label>
                  <span className="text-xs text-muted-foreground">
                    {opacity.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[opacity]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleOpacityChange}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">Blur</Label>
                  <span className="text-xs text-muted-foreground">
                    {blur}px
                  </span>
                </div>
                <Slider
                  value={[blur]}
                  min={0}
                  max={200}
                  step={1}
                  onValueChange={handleBlurChange}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">
                    Horizontal Position
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {posX.toFixed(0)}%
                  </span>
                </div>
                <Slider
                  value={[posX]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handlePosXChange}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">
                    Vertical Position
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {posY.toFixed(0)}%
                  </span>
                </div>
                <Slider
                  value={[posY]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handlePosYChange}
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for clicking outside to close */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
