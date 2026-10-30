export interface WeeklyActivity {
  id: string;
  title: string;
  description: string;
  location: string;
}

export interface WeeklyActivitiesState {
  weekKey: string;
  completedIds: string[];
}

export interface WeeklyActivitiesStore extends WeeklyActivitiesState {
  toggleActivity: (id: string) => void;
  syncWeek: () => void;
}
