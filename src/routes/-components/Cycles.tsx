import { Clock, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Typography } from "@/components/ui/typograph";
import { Empty } from "@/components/ui/empty";

import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";
import type {
  CambionCycle,
  CetusCycle,
  DuviriCycle,
  EarthCycle,
  VallisCycle,
  ZarimanCycle,
} from "@/types/worldState.types";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { getCycleState } from "@/utils/getCycleState";

interface Props {
  earth: EarthCycle | null;
  vallis: VallisCycle | null;
  cambion: CambionCycle | null;
  cetus: CetusCycle | null;
  duviri: DuviriCycle | null;
  zariman: ZarimanCycle | null;
}

function Cycles({ earth, vallis, cambion, cetus, duviri, zariman }: Props) {
  const cycles = [
    { name: "Earth", data: earth, icon: WARFRAME_ICONS.syndicates.earth },
    { name: "Cetus", data: cetus, icon: WARFRAME_ICONS.syndicates.ostron },
    { name: "Vallis", data: vallis, icon: WARFRAME_ICONS.syndicates.solaris },
    {
      name: "Cambion",
      data: cambion,
      icon: WARFRAME_ICONS.syndicates.necraloid,
    },
    {
      name: "Zariman",
      data: zariman,
      icon: WARFRAME_ICONS.syndicates.holdfasts,
    },
    { name: "Duviri", data: duviri, icon: WARFRAME_ICONS.activities.steelPath },
  ];

  if (!cycles.some((cycle) => cycle.data))
    return (
      <Empty
        title="Cycles"
        description="No cycles found"
        src={WARFRAME_ICONS.activities.steelPath}
      />
    );

  return (
    <section className="space-y-4">
      <SectionHeader title="Cycles" src={WARFRAME_ICONS.activities.steelPath} />

      <div className="grid grid-cols-2 gap-2">
        {cycles.map(({ name, data, icon }) => {
          const state = getCycleState(data?.state);
          const timeLeft = getTimeRemaining(data?.expiry);

          return (
            <Card key={name} className="gap-2">
              <div className="flex items-center gap-2">
                <img className="size-6 object-contain" src={icon} alt={name} />
                <Typography variant="h3">{name}</Typography>
              </div>

              <Badge className="capitalize" variant="highlight">
                <Info /> {state}
              </Badge>

              <Badge>
                <Clock /> {timeLeft}
              </Badge>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export { Cycles };
