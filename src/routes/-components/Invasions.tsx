import { Swords } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { SectionHeader } from "@/components/ui/section-header";
import { Typography } from "@/components/ui/typograph";

import type { Invasion } from "@/types/worldState.types";
import { getNodeInfo } from "@/utils/getNodeInfo";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";
import { getInvasionIndividualsInfos } from "@/utils/getInvasionIndividualsInfos";

interface Props {
  data: Invasion[];
}

function Invasions({ data }: Props) {
  if (!data || data.length === 0)
    return (
      <Empty
        title="Invasions"
        description="No active invasions found."
        src={WARFRAME_ICONS.activities.invasion}
      />
    );

  return (
    <Collapsible className="space-y-4">
      <CollapsibleTrigger className="flex w-full">
        <SectionHeader
          title="Invasions"
          src={WARFRAME_ICONS.activities.invasion}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="grid grid-cols-1 gap-2">
        {data.map((invasion) => {
          const { name, planet } = getNodeInfo(
            invasion.node ?? invasion.nodeKey,
          );
          const attacker = getInvasionIndividualsInfos(invasion.attacker!);
          const defender = getInvasionIndividualsInfos(invasion.defender!);
          const progress = invasion.completion!;

          if (invasion.completed) return null;

          return (
            <Card key={invasion.id}>
              <div>
                <Typography variant="h3">{name}</Typography>
                <Typography variant="p">
                  {planet} · {invasion.desc}
                </Typography>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center">
                  <img
                    className="size-16 object-contain"
                    src={attacker.icon}
                    alt={attacker.faction}
                  />
                  <Typography variant="h5">{attacker.faction}</Typography>
                  {attacker.reward && (
                    <Typography variant="p">{attacker.reward}</Typography>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Swords className="size-8 animate-pulse text-muted-foreground" />
                </div>

                <div className="flex flex-col items-center">
                  <img
                    className="size-16 object-contain"
                    src={defender.icon}
                    alt={defender.faction}
                  />
                  <Typography variant="h5">{defender.faction}</Typography>
                  <Typography variant="p">{defender.reward}</Typography>
                </div>
              </div>

              <Progress value={progress}>
                <ProgressLabel>Progress</ProgressLabel>
                <ProgressValue />
              </Progress>
            </Card>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}

export { Invasions };
