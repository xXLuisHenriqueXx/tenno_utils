import { useEffect } from "react";

import { WEEKLY_ACTIVITIES } from "@/static/data/weekly-activities.data";
import { useWeeklyActivitiesStore } from "@/stores/weeklyActivities.store";

export function useWeeklyActivities() {
  const completedIds = useWeeklyActivitiesStore((state) => state.completedIds);

  const toggleActivity = useWeeklyActivitiesStore(
    (state) => state.toggleActivity,
  );

  const syncWeek = useWeeklyActivitiesStore((state) => state.syncWeek);

  useEffect(() => {
    syncWeek();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncWeek();
      }
    };

    window.addEventListener("focus", syncWeek);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = window.setInterval(syncWeek, 60_000);

    return () => {
      window.removeEventListener("focus", syncWeek);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(interval);
    };
  }, [syncWeek]);

  const completedCount = WEEKLY_ACTIVITIES.filter((activity) =>
    completedIds.includes(activity.id),
  ).length;

  return {
    activities: WEEKLY_ACTIVITIES,
    completedIds,
    completedCount,
    totalCount: WEEKLY_ACTIVITIES.length,
    completionPercentage:
      WEEKLY_ACTIVITIES.length > 0
        ? Math.round((completedCount / WEEKLY_ACTIVITIES.length) * 100)
        : 0,
    toggleActivity,
  };
}
