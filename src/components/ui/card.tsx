import * as React from "react";
import { cn } from "cn";

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card relative flex flex-col gap-4 py-6 px-4 rounded-2xl bg-card overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Card };
