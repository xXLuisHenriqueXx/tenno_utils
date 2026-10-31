import { Clock, Swords } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { SectionHeader } from "@/components/ui/section-header";
import { Typography } from "@/components/ui/typograph";
import { Badge } from "@/components/ui/badge";

import type { Fissure } from "@/types/worldState.types";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";
import { getNodeInfo } from "@/utils/getNodeInfo";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { getFaction } from "@/utils/getFaction";
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
    <Collapsible className="space-y-4">
      <CollapsibleTrigger className="flex w-full">
        <SectionHeader
          title="Fissures"
          src={WARFRAME_ICONS.activities.fissure}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="grid grid-cols-2 gap-2">
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
                  <Typography className="line-clamp-1" variant="h4">
                    {name}
                  </Typography>
                  <Typography variant="p">{planet}</Typography>
                </div>
              </div>

              <Badge variant="highlight">
                <Swords className="shrink-0" /> {missionType} · {faction}
              </Badge>

              <Badge>
                <Clock className="shrink-0" />{" "}
                {getTimeRemaining(fissure.expiry)}
              </Badge>
            </Card>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}

export { Fissures };
