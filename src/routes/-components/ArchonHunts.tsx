import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { SectionHeader } from "@/components/ui/section-header";
import { Typography } from "@/components/ui/typograph";
import { Badge } from "@/components/ui/badge";

import type { ArchonHunt, Mission } from "@/types/worldState.types";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { getFaction } from "@/utils/getFaction";
import { getFactionIcon } from "@/utils/getFactionIcon";
import { getNodeInfo } from "@/utils/getNodeInfo";

interface Props {
  data: ArchonHunt | null;
}

function ArchonHunts({ data }: Props) {
  if (!data)
    return (
      <Empty
        title="Archon Hunt"
        description="No active Archon Hunt found."
        src={WARFRAME_ICONS.factions.Narmer}
      />
    );

  const faction = getFaction(data.faction);
  const icon = getFactionIcon(faction);
  const missions: Mission[] = data.missions ?? data.variants ?? [];

  return (
    <section className="space-y-4">
      <SectionHeader title="Archon Hunt" src={WARFRAME_ICONS.factions.Narmer} />

      <Card>
        <header className="flex items-start gap-2">
          <img className="size-10 object-contain" src={icon} alt={faction} />

          <div className="flex-1 min-w-0">
            <Typography variant="h3">
              {data.boss ?? "Unknown Archon"}
            </Typography>

            <Typography variant="p">{faction}</Typography>
          </div>

          {data.expiry && (
            <Typography variant="p">{getTimeRemaining(data.expiry)}</Typography>
          )}
        </header>

        <div className="flex flex-col gap-1">
          <h4 className="font-semibold">Missions</h4>

          {missions.length > 0 &&
            missions.map((mission, index) => {
              const { name, planet } = getNodeInfo(mission.node);

              return (
                <div
                  key={mission.nodeKey}
                  className="flex flex-row items-center justify-between gap-2 rounded-lg border border-border p-3"
                >
                  <div>
                    <Typography variant="h5">
                      {mission.type ??
                        mission.typeKey ??
                        `Mission ${index + 1}`}
                    </Typography>

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
    </section>
  );
}

export { ArchonHunts };
