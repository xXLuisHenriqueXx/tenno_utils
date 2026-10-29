import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typograph";

interface WeeklyActivity {
  id: string;
  title: string;
  description: string;
}

interface WeeklyProgress {
  weekKey: string;
  completedIds: string[];
}

const STORAGE_KEY = "warframe-weekly-activities";

const WEEKLY_ACTIVITIES: WeeklyActivity[] = [
  {
    id: "archon-hunt",
    title: "Archon Hunt",
    description: "Complete the weekly Archon Hunt.",
  },
  {
    id: "netracells",
    title: "Netracells",
    description: "Complete up to 5 Netracell missions.",
  },
  {
    id: "deep-archimedea",
    title: "Deep Archimedea",
    description: "Complete the weekly Deep Archimedea missions.",
  },
  {
    id: "circuit",
    title: "The Circuit",
    description: "Progress through the weekly Circuit reward track.",
  },
  {
    id: "steel-path-circuit",
    title: "The Steel Path Circuit",
    description: "Progress through the Steel Path Circuit reward track.",
  },
  {
    id: "maroo",
    title: "Maroo's Weekly Ayatan Hunt",
    description: "Complete Maroo's weekly treasure hunt.",
  },
  {
    id: "clem",
    title: "Clem's Weekly Mission",
    description: "Complete Clem's weekly mission.",
  },
  {
    id: "kahl",
    title: "Kahl's Weekly Mission",
    description: "Complete the available weekly Kahl mission.",
  },
  {
    id: "nightwave",
    title: "Nightwave Weekly Challenges",
    description: "Complete your weekly Nightwave challenges.",
  },
];

function getWeekKey(date = new Date()): string {
  const utcDate = new Date(date);
  const day = utcDate.getUTCDay();
  const daysSinceMonday = (day + 6) % 7;

  utcDate.setUTCDate(utcDate.getUTCDate() - daysSinceMonday);
  utcDate.setUTCHours(0, 0, 0, 0);

  return utcDate.toISOString().slice(0, 10);
}

function getInitialProgress(): WeeklyProgress {
  const weekKey = getWeekKey();

  if (typeof window === "undefined") {
    return { weekKey, completedIds: [] };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored) as WeeklyProgress;

      if (parsed.weekKey === weekKey && Array.isArray(parsed.completedIds)) {
        return parsed;
      }
    }
  } catch {
    // Invalid or inaccessible local storage: start with an empty checklist.
  }

  return { weekKey, completedIds: [] };
}

export function WeeklyActivities() {
  const [progress, setProgress] = useState<WeeklyProgress>(getInitialProgress);

  useEffect(() => {
    const checkWeek = () => {
      const currentWeekKey = getWeekKey();

      setProgress((current) =>
        current.weekKey === currentWeekKey
          ? current
          : { weekKey: currentWeekKey, completedIds: [] },
      );
    };

    // Also validate when returning to an already-open tab.
    window.addEventListener("focus", checkWeek);

    // Detect the weekly reset even if the site remains open.
    const interval = window.setInterval(checkWeek, 60_000);

    return () => {
      window.removeEventListener("focus", checkWeek);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // The checklist still works for the current session.
    }
  }, [progress]);

  const completedCount = progress.completedIds.length;
  const totalCount = WEEKLY_ACTIVITIES.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  function toggleActivity(id: string) {
    setProgress((current) => {
      const weekKey = getWeekKey();

      const currentIds =
        current.weekKey === weekKey ? current.completedIds : [];

      const completedIds = currentIds.includes(id)
        ? currentIds.filter((itemId) => itemId !== id)
        : [...currentIds, id];

      return { weekKey, completedIds };
    });
  }

  return (
    <Card className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <Typography variant="h3">Weekly Activities</Typography>
          <p className="text-sm text-muted-foreground">
            Your weekly Warframe checklist
          </p>
        </div>

        <span className="text-sm font-medium">
          {completedCount}/{totalCount} completed
        </span>
      </div>

      <div
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label="Weekly activities completion"
        aria-valuenow={completionPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {WEEKLY_ACTIVITIES.map((activity) => {
          const checked = progress.completedIds.includes(activity.id);

          return (
            <label
              key={activity.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                checked ? "bg-muted/60" : "hover:bg-muted/30"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleActivity(activity.id)}
                className="mt-1 size-4 shrink-0 accent-primary"
              />

              <span className="min-w-0 space-y-1">
                <span
                  className={`block text-sm font-medium ${
                    checked ? "text-muted-foreground line-through" : ""
                  }`}
                >
                  {activity.title}
                </span>

                <span className="block text-xs text-muted-foreground">
                  {activity.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Progress is saved in this browser. Resets every Monday at 00:00 UTC
        (Sunday at 21:00 Brasília time).
      </p>
    </Card>
  );
}

export default WeeklyActivities;
