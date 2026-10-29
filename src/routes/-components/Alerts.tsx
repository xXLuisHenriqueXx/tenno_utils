import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { SectionHeader } from "@/components/ui/section-header";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typograph";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";

import type { Alert } from "@/types/worldState.types";
import { getFaction } from "@/utils/getFaction";
import { getFactionIcon } from "@/utils/getFactionIcon";
import { getNodeInfo } from "@/utils/getNodeInfo";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { Coins } from "lucide-react";

interface Props {
  data: Alert[];
}

function Alerts({ data }: Props) {
  if (data.length === 0)
    return (
      <Empty
        title="Alerts"
        description="No active alerts found."
        src={WARFRAME_ICONS.activities.alert}
      />
    );

  return (
    <section className="space-y-4">
      <SectionHeader title="Alerts" src={WARFRAME_ICONS.activities.alert} />

      {data.map(({ id, mission, reward, expiry }) => {
        const { name, planet } = getNodeInfo(mission?.node);
        const faction = getFaction(mission?.faction);
        const icon = getFactionIcon(faction);
        const missionReward = reward ?? mission?.reward;

        return (
          <Card key={id}>
            <div className="flex items-start gap-2">
              <div className="flex flex-1 items-center gap-2 min-w-0">
                <img
                  className="size-10 object-contain"
                  src={icon}
                  alt={faction}
                />

                <div>
                  <Typography variant="h3">{name}</Typography>
                  <Typography variant="p">
                    {planet} · {faction}
                  </Typography>
                </div>
              </div>

              <Typography variant="p">{getTimeRemaining(expiry)}</Typography>
            </div>

            <div className="flex gap-1">
              {mission?.type && <Badge>{mission.type}</Badge>}

              {mission?.minEnemyLevel != null && (
                <Badge>
                  Level {mission.minEnemyLevel}
                  {mission.maxEnemyLevel != null &&
                    ` – ${mission.maxEnemyLevel}`}
                </Badge>
              )}
            </div>

            {missionReward && (
              <>
                <Separator />

                <div className="flex flex-col gap-2">
                  <Typography variant="h5">Rewards</Typography>

                  <div className="grid grid-cols-2 gap-1">
                    {missionReward.items?.map((item) => (
                      <Badge key={item} variant="highlight">
                        {item}
                      </Badge>
                    ))}

                    {missionReward.countedItems?.map(({ count, type }) => (
                      <Badge key={type} variant="highlight">
                        {count} {type}
                      </Badge>
                    ))}

                    {missionReward.credits != null && (
                      <Badge variant="highlight">
                        <Coins /> {missionReward.credits.toLocaleString()}{" "}
                        Credits
                      </Badge>
                    )}

                    {missionReward.asString && (
                      <Badge variant="highlight">
                        {missionReward.asString}
                      </Badge>
                    )}
                  </div>
                </div>
              </>
            )}
          </Card>
        );
      })}
    </section>
  );
}

export { Alerts };
