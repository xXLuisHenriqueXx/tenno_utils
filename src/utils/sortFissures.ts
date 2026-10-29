import type { Fissure } from "@/types/worldState.types";

const FISSURE_TIER_ORDER = ["Lith", "Meso", "Neo", "Axi", "Requiem", "Omnia"];

export function sortFissures(fissures: Fissure[]): Fissure[] {
  const getTierOrder = (tier?: string) => {
    const index = FISSURE_TIER_ORDER.findIndex(
      (name) => name.toLowerCase() === tier?.toLowerCase(),
    );

    return index === -1 ? FISSURE_TIER_ORDER.length : index;
  };

  return [...fissures].sort(
    (a, b) => getTierOrder(a.tier) - getTierOrder(b.tier),
  );
}
