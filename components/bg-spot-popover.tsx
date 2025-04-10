"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Palette, Plus, Trash } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { useBackground } from "@/components/background-provider";

export function BgSpotPopover() {
  const { spots, addSpot, removeSpot, updateSpot } = useBackground();
  const [open, setOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [activeSpot, setActiveSpot] = useState(0);
  const [hexInput, setHexInput] = useState(spots[0]?.color || "#8b5cf6");

  const spot = spots[activeSpot] || spots[0];

  const [color, setColor] = useState(spot?.color || "#8b5cf6");
  const [opacity, setOpacity] = useState(spot?.opacity || 0.5);
  const [blur, setBlur] = useState(parseInt(spot?.blur || "80"));
  const [posX, setPosX] = useState(spot?.position.x || 50);
  const [posY, setPosY] = useState(spot?.position.y || 50);
  const [size, setSize] = useState(parseInt(spot?.size || "500"));

  useEffect(() => {
    if (spots[activeSpot]) {
      const currentSpot = spots[activeSpot];
      setColor(currentSpot.color);
      setHexInput(currentSpot.color);
      setOpacity(currentSpot.opacity);
      // Fix blur value parsing - remove 'px' and parse as integer
      setBlur(parseInt(currentSpot.blur.replace("px", "")));
      setPosX(currentSpot.position.x);
      setPosY(currentSpot.position.y);
      // Fix size value parsing - remove 'px' and parse as integer
      setSize(parseInt(currentSpot.size.replace("px", "")));
    }
  }, [spots, activeSpot]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setHexInput(newColor);
    updateSpot(activeSpot, { color: newColor });
  };

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHexInput(value);

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setColor(value);
      updateSpot(activeSpot, { color: value });
    }
  };

  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0];
    setOpacity(newOpacity);
    updateSpot(activeSpot, { opacity: newOpacity });
  };

  const handleBlurChange = (value: number[]) => {
    const newBlur = value[0];
    setBlur(newBlur);
    // Ensure we apply the value as a string with 'px' unit
    updateSpot(activeSpot, { blur: `${newBlur}px` });
  };

  const handleSizeChange = (value: number[]) => {
    const newSize = value[0];
    setSize(newSize);
    // Ensure we apply the value as a string with 'px' unit
    updateSpot(activeSpot, { size: `${newSize}px` });
  };

  const handlePosXChange = (value: number[]) => {
    const newX = value[0];
    setPosX(newX);
    updateSpot(activeSpot, { position: { x: newX, y: posY } });
  };

  const handlePosYChange = (value: number[]) => {
    const newY = value[0];
    setPosY(newY);
    updateSpot(activeSpot, { position: { x: posX, y: newY } });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger onClick={() => setOpen(true)} asChild>
        <div className="w-full h-full flex items-center justify-center">
          <Palette className="h-full w-full text-neutral-600 dark:text-neutral-300" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="top">
        {/* Spot Tabs */}
        <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
          {spots.map((spot, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-lg cursor-pointer transition-all border-2 ${
                activeSpot === index
                  ? "border-black dark:border-white"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: spot.color }}
              onClick={() => setActiveSpot(index)}
            />
          ))}
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            onClick={() => addSpot()}
          >
            <Plus size={16} />
          </button>
          {spots.length > 1 && (
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              onClick={() => {
                removeSpot(activeSpot);
                setActiveSpot(Math.max(0, activeSpot - 1));
              }}
            >
              <Trash size={16} />
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Color</Label>
            <div className="flex items-center space-x-2">
              <Popover open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
                <PopoverTrigger asChild>
                  <div
                    className="w-10 h-10 rounded-lg cursor-pointer border border-neutral-200 dark:border-neutral-700"
                    style={{ backgroundColor: color }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3" side="left">
                  <HexColorPicker color={color} onChange={handleColorChange} />
                </PopoverContent>
              </Popover>
              <Input
                value={hexInput}
                onChange={handleHexChange}
                className="w-28 font-mono"
                maxLength={7}
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between mb-1">
              <Label className="text-sm font-medium">Size</Label>
              <span className="text-xs text-muted-foreground">{size}px</span>
            </div>
            <Slider
              value={[size]}
              min={100}
              max={1000}
              step={10}
              onValueChange={handleSizeChange}
            />
          </div>

          {/* Opacity Slider */}
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

          {/* Blur Slider - Increased max value for more blur */}
          <div>
            <div className="flex justify-between mb-1">
              <Label className="text-sm font-medium">Blur</Label>
              <span className="text-xs text-muted-foreground">{blur}px</span>
            </div>
            <Slider
              value={[blur]}
              min={0}
              max={300}
              step={5}
              onValueChange={handleBlurChange}
            />
          </div>

          {/* Horizontal Position Slider */}
          <div>
            <div className="flex justify-between mb-1">
              <Label className="text-sm font-medium">Horizontal Position</Label>
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

          {/* Vertical Position Slider */}
          <div>
            <div className="flex justify-between mb-1">
              <Label className="text-sm font-medium">Vertical Position</Label>
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
