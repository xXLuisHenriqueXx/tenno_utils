import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { WeeklyActivitiesStore } from "@/types/weeklyActivities.types";
import { getWarframeWeekKey } from "@/utils/getWarframeWeekKey";

export const useWeeklyActivitiesStore = create<WeeklyActivitiesStore>()(
  persist(
    (set, _) => ({
      weekKey: getWarframeWeekKey(),
      completedIds: [],

      syncWeek: () => {
        const currentWeekKey = getWarframeWeekKey();

        set((state) => {
          if (state.weekKey === currentWeekKey) {
            return state;
          }

          return {
            weekKey: currentWeekKey,
            completedIds: [],
          };
        });
      },

      toggleActivity: (id) => {
        const currentWeekKey = getWarframeWeekKey();

        set((state) => {
          const completedIds =
            state.weekKey === currentWeekKey ? state.completedIds : [];

          const isCompleted = completedIds.includes(id);

          return {
            weekKey: currentWeekKey,
            completedIds: isCompleted
              ? completedIds.filter((item) => item !== id)
              : [...completedIds, id],
          };
        });
      },
    }),
    {
      name: "warframe-weekly-activities",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        weekKey: state.weekKey,
        completedIds: state.completedIds,
      }),
    },
  ),
);
