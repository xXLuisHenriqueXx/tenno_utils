import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";

export function getFissureIcon(tier: string) {
  return WARFRAME_ICONS.fissures[tier as keyof typeof WARFRAME_ICONS.fissures];
}
