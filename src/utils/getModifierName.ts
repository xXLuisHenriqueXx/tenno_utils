import type { ArchimedeaModifier } from "@/types/worldState.types";

export function getModifierName(modifier: ArchimedeaModifier) {
  return modifier.name ?? modifier.key ?? "Unknown modifier";
}
