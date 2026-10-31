import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SectionHeader } from "@/components/ui/section-header";
import { Typography } from "@/components/ui/typograph";

import { cn } from "cn";
import { useWeeklyActivities } from "@/hooks/useWeeklyActivities";
import { WARFRAME_ICONS } from "@/static/data/warframe-icons.data";

export function WeeklyActivities() {
  const {
    activities,
    completedIds,
    completedCount,
    totalCount,
    completionPercentage,
    toggleActivity,
  } = useWeeklyActivities();

  return (
    <Collapsible className="space-y-4">
      <CollapsibleTrigger className="flex w-full">
        <SectionHeader
          title="Weekly Activities"
          src={WARFRAME_ICONS.activities.weekly}
        />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <Card>
          <Progress value={completionPercentage}>
            <ProgressLabel>
              {completedCount}/{totalCount} completed
            </ProgressLabel>
            <ProgressValue />
          </Progress>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => {
              const checked = completedIds.includes(activity.id);

              return (
                <label
                  key={activity.id}
                  className={cn(
                    "flex flex-row items-center gap-4 p-4 rounded-lg border border-border transition-colors duration-300 cursor-pointer",
                    {
                      "bg-muted/60": checked,
                      "hover:bg-muted/30": !checked,
                    },
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleActivity(activity.id)}
                  />

                  <div>
                    <Typography
                      className={cn({
                        "text-muted-foreground line-through": checked,
                      })}
                      variant="h5"
                    >
                      {activity.title}
                    </Typography>

                    <Typography variant="xs">{activity.description}</Typography>
                  </div>
                </label>
              );
            })}
          </div>

          <Typography variant="xs">
            Progress is saved locally and resets every Monday at 00:00 UTC
            (Sunday at 21:00 Brasília time).
          </Typography>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default WeeklyActivities;
