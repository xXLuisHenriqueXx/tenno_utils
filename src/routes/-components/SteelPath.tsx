import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { SectionHeader } from "@/components/ui/section-header";
import { Typography } from "@/components/ui/typograph";

import type { SteelPath as SteelPathType } from "@/types/worldState.types";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";
import { getTimeRemaining } from "@/utils/getTimeRemaining";

interface Props {
  data: SteelPathType | null;
}

function SteelPath({ data }: Props) {
  if (!data)
    return (
      <Empty
        title="Steel Path"
        description="No Steel Path reward rotation found."
        src={WARFRAME_ICONS.activities.steelPath}
      />
    );

  const currentReward = data.currentReward;
  const hasRivenInName = currentReward?.name?.includes("Riven");

  return (
    <Collapsible className="space-y-4">
      <CollapsibleTrigger className="flex w-full">
        <SectionHeader
          title="Steel Path"
          src={WARFRAME_ICONS.activities.steelPath}
        />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <Card>
          <div className="flex items-center justify-between">
            <Typography variant="h3">Weekly Purchase</Typography>

            {data.expiry && (
              <Typography variant="p">
                {getTimeRemaining(data.expiry)}
              </Typography>
            )}
          </div>

          {currentReward && (
            <div className="flex flex-row items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1 min-w-0">
                <Typography variant="h5">
                  {currentReward.name ?? "Current reward"}
                </Typography>

                {typeof currentReward.cost === "number" && (
                  <div className="flex items-center gap-1">
                    <img
                      className="size-4 object-contain"
                      src={WARFRAME_ICONS.currencies.SteelEssence}
                      alt="Ducats"
                    />

                    <Typography variant="p">
                      {currentReward.cost.toLocaleString()}
                    </Typography>
                  </div>
                )}
              </div>

              {hasRivenInName && (
                <img
                  src={WARFRAME_ICONS.currencies.Riven}
                  alt="Riven"
                  className="size-10 object-contain"
                />
              )}
            </div>
          )}
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { SteelPath };
