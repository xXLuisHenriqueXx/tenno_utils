import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typograph";

import type { Mission, Sortie as SortieType } from "@/types/worldState.types";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";
import { getNodeInfo } from "@/utils/getNodeInfo";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { getFaction } from "@/utils/getFaction";
import { getFactionIcon } from "@/utils/getFactionIcon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Props {
  data: SortieType | null;
}

function Sortie({ data }: Props) {
  if (!data)
    return (
      <Empty
        title="Sortie"
        description="No active Sortie found."
        src={WARFRAME_ICONS.activities.sortie}
      />
    );

  const faction = getFaction(data.faction);
  const icon = getFactionIcon(faction);
  let missions: Mission[] = [];
  if (data.missions && data.missions?.length > 0) {
    missions = data.missions;
  } else if (data.variants && data.variants?.length > 0) {
    missions = data.variants;
  }

  return (
    <Collapsible className="space-y-4">
      <CollapsibleTrigger className="flex w-full">
        <SectionHeader title="Sortie" src={WARFRAME_ICONS.activities.sortie} />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <Card>
          <header className="flex items-start gap-2">
            <div className="flex flex-1 items-center gap-2">
              <img
                className="size-10 object-contain"
                src={icon}
                alt={faction}
              />

              <div>
                <Typography variant="h3">{data.boss ?? "Sortie"}</Typography>

                <Typography variant="p">{faction}</Typography>
              </div>
            </div>

            {data.expiry && (
              <Typography variant="p">
                {getTimeRemaining(data.expiry)}
              </Typography>
            )}
          </header>

          <div className="space-y-1">
            <Typography variant="h4">Missions</Typography>

            {missions.length > 0 &&
              missions.map((mission) => {
                const { name, planet } = getNodeInfo(
                  mission.node ?? mission.nodeKey,
                );
                const missionType =
                  mission.type ??
                  mission.typeKey ??
                  mission.missionType ??
                  mission.missionTypeKey ??
                  "Unknown mission";

                return (
                  <div
                    key={mission.nodeKey}
                    className="flex flex-row items-center justify-between gap-2 rounded-lg border border-border p-4"
                  >
                    <div>
                      <Typography variant="h5">{missionType}</Typography>

                      {mission.node && (
                        <Typography variant="p">
                          {planet} · {name}
                        </Typography>
                      )}

                      {(mission.minEnemyLevel != null ||
                        mission.maxEnemyLevel != null) && (
                        <Badge>
                          Level {mission.minEnemyLevel ?? "?"}
                          {mission.maxEnemyLevel != null &&
                            `–${mission.maxEnemyLevel}`}
                        </Badge>
                      )}
                    </div>

                    <img
                      className="size-8 object-contain"
                      src={icon}
                      alt={faction}
                    />
                  </div>
                );
              })}
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { Sortie };
