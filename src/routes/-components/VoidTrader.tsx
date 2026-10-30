import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { SectionHeader } from "@/components/ui/section-header";
import { Typography } from "@/components/ui/typograph";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";

import type { VoidTrader as VoidTraderType } from "@/types/worldState.types";
import { getNodeInfo } from "@/utils/getNodeInfo";
import { getTimeRemaining } from "@/utils/getTimeRemaining";

interface Props {
  data: VoidTraderType | null;
}

function VoidTrader({ data }: Props) {
  if (!data)
    return (
      <Empty
        title="Void Trader"
        description="Void Trader information is currently unavailable."
        src={WARFRAME_ICONS.activities.baro}
      />
    );

  const inventory = data.inventory ?? [];
  const { name, planet } = getNodeInfo(data.location);

  return (
    <section className="space-y-3">
      <SectionHeader title="Void Trader" src={WARFRAME_ICONS.activities.baro} />

      <Card>
        <div className="flex items-start justify-between">
          <div>
            <Typography variant="h3">
              {data.character ?? "Baro Ki'Teer"}
            </Typography>

            <Typography variant="p">
              {name} · {planet}
            </Typography>
          </div>

          <Typography variant="p">{getTimeRemaining(data.expiry)}</Typography>
        </div>

        <div className="space-y-2">
          <Typography variant="h4">Inventory ({inventory.length})</Typography>

          <div className="grid gap-1 sm:grid-cols-2">
            {inventory.map((item) => (
              <div
                key={item.uniqueName}
                className="p-4 border border-border rounded-lg"
              >
                <Typography variant="h5">
                  {item.item ?? item.uniqueName ?? "Unknown item"}
                </Typography>

                <div className="flex flex-wrap gap-4">
                  {typeof item.ducats === "number" && (
                    <div className="flex items-center gap-1">
                      <img
                        className="size-4 object-contain"
                        src={WARFRAME_ICONS.currencies.Ducats}
                        alt="Ducats"
                      />

                      <Typography variant="p">
                        {item.ducats.toLocaleString()}
                      </Typography>
                    </div>
                  )}

                  {typeof item.credits === "number" && (
                    <div className="flex items-center gap-1">
                      <img
                        className="size-4 object-contain"
                        src={WARFRAME_ICONS.currencies.Credits}
                        alt="Credits"
                      />

                      <Typography variant="p">
                        {item.credits.toLocaleString()}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}

export { VoidTrader };
