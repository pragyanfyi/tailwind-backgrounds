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
import { Switch } from "@/components/ui/switch";
import { Grid } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { useBackground } from "@/components/background-provider";

export function BgGridPopover() {
  const { grid, updateGrid } = useBackground();
  const [open, setOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const [enabled, setEnabled] = useState(grid.enabled);
  const [color, setColor] = useState(grid.color);
  const [hexInput, setHexInput] = useState(grid.color);
  const [size, setSize] = useState(parseInt(grid.size));
  const [opacity, setOpacity] = useState(grid.opacity);

  // Update local state when grid settings change
  useEffect(() => {
    setEnabled(grid.enabled);
    setColor(grid.color);
    setHexInput(grid.color);
    setSize(parseInt(grid.size));
    setOpacity(grid.opacity);
  }, [grid]);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    updateGrid({ enabled: checked });
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setHexInput(newColor);
    updateGrid({ color: newColor });
  };

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHexInput(value);

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setColor(value);
      updateGrid({ color: value });
    }
  };

  const handleSizeChange = (value: number[]) => {
    const newSize = value[0];
    setSize(newSize);
    updateGrid({ size: `${newSize}px` });
  };

  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0];
    setOpacity(newOpacity);
    updateGrid({ opacity: newOpacity });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger onClick={() => setOpen(true)} asChild>
        <div className="w-full h-full flex items-center justify-center">
          <Grid className="h-full w-full text-neutral-600 dark:text-neutral-300" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="top">
        <div className="space-y-4">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Grid Enabled</Label>
            <Switch checked={enabled} onCheckedChange={handleToggle} />
          </div>

          {/* Color Picker and Hex Input */}
          <div className={enabled ? "" : "opacity-50 pointer-events-none"}>
            <Label className="text-sm font-medium mb-2 block">Color</Label>
            <div className="flex items-center space-x-2">
              <Popover
                open={colorPickerOpen && enabled}
                onOpenChange={(value) => enabled && setColorPickerOpen(value)}
              >
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
                disabled={!enabled}
              />
            </div>
          </div>

          {/* Size Slider */}
          <div className={enabled ? "" : "opacity-50 pointer-events-none"}>
            <div className="flex justify-between mb-1">
              <Label className="text-sm font-medium">Size</Label>
              <span className="text-xs text-muted-foreground">{size}px</span>
            </div>
            <Slider
              value={[size]}
              min={8}
              max={100}
              step={1}
              onValueChange={handleSizeChange}
              disabled={!enabled}
            />
          </div>

          {/* Opacity Slider */}
          <div className={enabled ? "" : "opacity-50 pointer-events-none"}>
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
              disabled={!enabled}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
