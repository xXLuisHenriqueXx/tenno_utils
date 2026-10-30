export function getWarframeWeekKey(date = new Date()): string {
  const utcDate = new Date(date);
  const day = utcDate.getUTCDay();
  const daysSinceMonday = (day + 6) % 7;

  utcDate.setUTCDate(utcDate.getUTCDate() - daysSinceMonday);
  utcDate.setUTCHours(0, 0, 0, 0);

  return utcDate.toISOString().slice(0, 10);
}
