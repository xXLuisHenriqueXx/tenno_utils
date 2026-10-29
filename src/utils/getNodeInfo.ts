export function getNodeInfo(node?: string) {
  if (!node) return { name: "Unknown node", planet: "Unknown planet" };
  const [name, location] = node.split(" (");

  return {
    name,
    planet: location?.replace(/\)$/, "") ?? "Unknown planet",
  };
}
