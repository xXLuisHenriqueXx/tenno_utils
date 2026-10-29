import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { SectionHeader } from "@/components/ui/section-header";

import type {
  Archimedea,
  ArchimedeaMission,
  ArchimedeaModifier,
} from "@/types/worldState.types";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { getModifierName } from "@/utils/getModifierName";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";
import { Typography } from "@/components/ui/typograph";

interface Props {
  data: Archimedea[];
}

function ModifierList({
  title,
  modifiers,
}: {
  title: string;
  modifiers: ArchimedeaModifier[];
}) {
  if (modifiers.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h4">{title}</Typography>

      <ul className="flex flex-col gap-1">
        {modifiers.map((modifier) => (
          <li
            key={modifier.key ?? modifier.name}
            className="p-4 bg-muted/75 rounded-lg"
          >
            <Typography variant="h5">{getModifierName(modifier)}</Typography>
            {modifier.description && (
              <Typography variant="p">{modifier.description}</Typography>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MissionCard({
  mission,
  index,
}: {
  mission: ArchimedeaMission;
  index: number;
}) {
  const faction = mission.faction ?? mission.factionKey ?? "Unknown";
  const factionIcon =
    WARFRAME_ICONS.factions[faction as keyof typeof WARFRAME_ICONS.factions];
  const missionType =
    mission.missionType ?? mission.missionTypeKey ?? "Unknown mission";
  const risks = mission.risks ?? [];

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
      <div className="flex items-center gap-2">
        <img
          className="size-10 object-contain"
          src={factionIcon}
          alt={faction}
        />

        <div className="flex-1 min-w-0">
          <Typography variant="h4">
            Mission {index + 1}: {missionType}
          </Typography>
          <Typography variant="p">{faction}</Typography>
        </div>
      </div>

      {mission.deviation && (
        <div>
          <p className="mb-1 text-sm font-medium">Deviation</p>

          <div className="rounded-md bg-muted p-3">
            <p className="text-sm font-medium">
              {getModifierName(mission.deviation)}
            </p>

            {mission.deviation.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {mission.deviation.description}
              </p>
            )}
          </div>
        </div>
      )}

      {risks.length > 0 && <ModifierList title="Risks" modifiers={risks} />}
    </div>
  );
}

function Archimedeas({ data }: Props) {
  if (data.length === 0)
    return (
      <Empty
        title="Archimedeas"
        description="No active archimedeas found."
        src={WARFRAME_ICONS.activities.steelPath}
      />
    );

  return (
    <section className="space-y-4">
      <SectionHeader
        title="Archimedeas"
        src={WARFRAME_ICONS.activities.steelPath}
      />

      {data.map((archimedea) => {
        const missions = archimedea.missions ?? [];
        const modifiers = archimedea.personalModifiers ?? [];

        return (
          <Card key={archimedea.id}>
            <header className="flex items-start justify-between">
              <div>
                <Typography variant="h3">
                  {archimedea.type ?? archimedea.typeKey ?? "Unknown"}
                </Typography>
                <Typography variant="p">{missions.length} missions</Typography>
              </div>

              <Typography variant="p">
                {getTimeRemaining(archimedea.expiry)}
              </Typography>
            </header>

            <ModifierList title="Personal Modifiers" modifiers={modifiers} />

            {missions.length > 0 && (
              <div className="flex flex-col gap-2">
                <Typography variant="h4">Missions</Typography>

                <ul className="flex flex-col gap-1">
                  {missions.map((mission, missionIndex) => (
                    <MissionCard
                      key={mission.missionTypeKey ?? mission.missionType}
                      mission={mission}
                      index={missionIndex}
                    />
                  ))}
                </ul>
              </div>
            )}

            {missions.length === 0 && modifiers.length === 0 && (
              <Typography variant="p">
                No mission or modifier details available.
              </Typography>
            )}
          </Card>
        );
      })}
    </section>
  );
}

export { Archimedeas };
