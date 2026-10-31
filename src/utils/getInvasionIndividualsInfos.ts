import type { Attacker } from "@/types/worldState.types";
import { getFaction } from "./getFaction";
import { getFactionIcon } from "./getFactionIcon";

export function getInvasionIndividualsInfos(attacker: Attacker) {
  const faction = getFaction(attacker.faction ?? attacker.factionKey);
  const icon = getFactionIcon(faction);
  const reward = attacker.reward?.countedItems
    ? `${attacker.reward.countedItems[0].count} ${attacker.reward.countedItems[0].type}`
    : "No reward";

  return { icon, reward, faction };
}
