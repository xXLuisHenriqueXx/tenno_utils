import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const typographyVariants = cva("", {
  variants: {
    variant: {
      p: "text-sm text-muted-foreground",
      xs: "text-xs text-muted-foreground",
      h1: "text-3xl font-bold",
      h2: "text-2xl font-semibold",
      h3: "text-lg font-semibold",
      h4: "text-base font-semibold",
      h5: "text-sm font-semibold",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

function Typography({
  variant = "p",
  className,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof typographyVariants>) {
  return (
    <p
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    ></p>
  );
}

export { Typography };
