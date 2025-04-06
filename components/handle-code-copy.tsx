import { toast } from "sonner";

export const handleCopyCode = (
  spots: SpotSettings[],
  grid: GridSettings,
  dots: DotsSettings
) => {
  const spotsCode = spots
    .map((spot) => {
      const opacity = Math.round(spot.opacity * 10);
      return `<div class="absolute -z-10 rounded-full left-[${spot.position.x}%] top-[${spot.position.y}%] translate-x-[-50%] translate-y-[-50%] h-[${spot.size}] w-[${spot.size}] bg-[${spot.color}] opacity-${opacity} blur-[${spot.blur}]"></div>`;
    })
    .join("\n");

  const gridCode = grid.enabled
    ? `<div class="absolute inset-0 h-full w-full dark:bg-black bg-white bg-[linear-gradient(to_right,${grid.color.replace(
        "#",
        "%23"
      )}_1px,transparent_1px),linear-gradient(to_bottom,${grid.color.replace(
        "#",
        "%23"
      )}_1px,transparent_1px)] bg-[size:${grid.size}_${
        grid.size
      }] opacity-${Math.round(grid.opacity * 10)}"></div>`
    : "";

  const dotsCode = dots.enabled
    ? `<div class="absolute inset-0 h-full w-full dark:bg-black bg-white bg-[radial-gradient(${dots.color.replace(
        "#",
        "%23"
      )}_1px,transparent_1px)] [background-size:${dots.size}_${
        dots.size
      }] opacity-${Math.round(dots.opacity * 10)}"></div>`
    : "";

  const fullCode = `<!-- Background Elements -->\n<div class="relative w-full h-screen overflow-hidden">\n  ${
    gridCode ? gridCode + "\n  " : ""
  }${dotsCode ? dotsCode + "\n  " : ""}${spotsCode ? spotsCode : ""}\n</div>`;

  navigator.clipboard.writeText(fullCode);
  toast.success("Code is copied to your clipboard");
};

export default handleCopyCode;
