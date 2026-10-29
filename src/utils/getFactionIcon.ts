import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";

export function getFactionIcon(faction: string) {
  return WARFRAME_ICONS.factions[
    faction as keyof typeof WARFRAME_ICONS.factions
  ];
}
