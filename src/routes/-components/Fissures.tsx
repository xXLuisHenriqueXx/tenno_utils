import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { SectionHeader } from "@/components/ui/section-header";
import { Typography } from "@/components/ui/typograph";

import type { Fissure } from "@/types/worldState.types";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";
import { getNodeInfo } from "@/utils/getNodeInfo";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { getFaction } from "@/utils/getFaction";
import { Badge } from "@/components/ui/badge";
import { Clock, Swords } from "lucide-react";
import { getFissureIcon } from "@/utils/getFissureIcon";
import { getFissureTier } from "@/utils/getFissureTier";
import { sortFissures } from "@/utils/sortFissures";

interface Props {
  data: Fissure[];
}

function Fissures({ data }: Props) {
  if (!data || data.length === 0)
    return (
      <Empty
        title="Fissures"
        description="No active Void Fissures found."
        src={WARFRAME_ICONS.activities.fissure}
      />
    );

  const sortedFissures = sortFissures(data);

  return (
    <section className="space-y-4">
      <SectionHeader title="Fissures" src={WARFRAME_ICONS.activities.fissure} />

      <div className="grid grid-cols-2 gap-2">
        {sortedFissures.map((fissure) => {
          const { name, planet } = getNodeInfo(fissure.node ?? fissure.nodeKey);
          const missionType =
            fissure.missionType ?? fissure.missionTypeKey ?? "Unknown mission";
          const tier = getFissureTier(fissure.tier);
          const faction = getFaction(fissure.enemy ?? fissure.enemyKey);
          const icon = getFissureIcon(tier);

          return (
            <Card key={fissure.id} className="gap-2">
              <div className="flex flex-row gap-2">
                <img className="size-10 object-contain" src={icon} alt={tier} />

                <div>
                  <Typography variant="h4">{name}</Typography>
                  <Typography variant="p">{planet}</Typography>
                </div>
              </div>

              <Badge variant="highlight">
                <Swords /> {missionType} · {faction}
              </Badge>

              <Badge>
                <Clock /> {getTimeRemaining(fissure.expiry)}
              </Badge>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export { Fissures };
