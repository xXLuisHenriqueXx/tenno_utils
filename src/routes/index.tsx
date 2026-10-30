import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Alerts } from "./-components/Alerts";
import { Archimedeas } from "./-components/Archimedeas";
import { Typography } from "@/components/ui/typograph";
import { Loader } from "@/components/ui/loader";
import { Cycles } from "./-components/Cycles";
import { ArchonHunts } from "./-components/ArchonHunts";
import { Fissures } from "./-components/Fissures";
import { SteelPathFissures } from "./-components/SteelPathFissures";
import { VoidStormFissures } from "./-components/VoidStormFissures";
import WeeklyActivities from "./-components/WeeklyActivities";

import type { WorldState } from "@/types/worldState.types";
import { VoidTrader } from "./-components/VoidTrader";

export const Route = createFileRoute("/")({
  component: Home,
});

const WORLD_STATE_URL = "https://api.warframestat.us/pc";
const REFRESH_INTERVAL = 60_000;

function Home() {
  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWorldState() {
      try {
        const response = await fetch(WORLD_STATE_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `World state request failed: HTTP ${response.status}`,
          );
        }

        const data = (await response.json()) as WorldState;

        setWorldState(data);
        setError(null);
        setLastUpdated(new Date());
      } catch (cause) {
        if (controller.signal.aborted) return;

        setError(
          cause instanceof Error
            ? cause.message
            : "Failed to fetch world state",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchWorldState();

    const intervalId = window.setInterval(() => {
      void fetchWorldState();
    }, REFRESH_INTERVAL);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  if (loading) return <Loader />;

  console.log(worldState?.voidTrader);

  return (
    <main className="flex flex-col gap-8 p-4">
      <header>
        <Typography variant="h1">Tenno Utils</Typography>
        <Typography variant="p">
          {lastUpdated
            ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
            : "Waiting for world state data..."}
        </Typography>

        {error && <Typography variant="p">{error}</Typography>}
      </header>

      {worldState && (
        <div className="grid grid-cols-1 gap-12">
          <WeeklyActivities />
          <Cycles
            earth={worldState.earthCycle}
            vallis={worldState.vallisCycle}
            cambion={worldState.cambionCycle}
            cetus={worldState.cetusCycle}
            duviri={worldState.duviriCycle}
            zariman={worldState.zarimanCycle}
          />
          <VoidTrader data={worldState.voidTrader} />
          <Alerts data={worldState.alerts} />
          <Archimedeas data={worldState.archimedeas} />
          <ArchonHunts data={worldState.archonHunt} />
          <Fissures
            data={worldState.fissures.filter(
              (fissure) => !fissure.isHard && !fissure.isStorm,
            )}
          />
          <SteelPathFissures
            data={worldState.fissures.filter(
              (fissure) => fissure.isHard && !fissure.isStorm,
            )}
          />
          <VoidStormFissures
            data={worldState.fissures.filter((fissure) => fissure.isStorm)}
          />
        </div>
      )}
    </main>
  );
}
