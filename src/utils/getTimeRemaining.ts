export function getTimeRemaining(expiry?: string) {
  if (!expiry) return "Unknown";

  const remaining = new Date(expiry).getTime() - Date.now();

  if (remaining <= 0) return "Expired";

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  else if (hours > 0) return `${hours}h ${minutes}m`;

  return `${minutes}m`;
}
