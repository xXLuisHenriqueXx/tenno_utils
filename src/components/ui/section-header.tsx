import { Typography } from "./typograph";
import { Separator } from "./separator";
import { ChevronDown } from "lucide-react";
import { SvgRenderer } from "../svg-renderer";

interface Props {
  title: string;
  src: string;
}

function SectionHeader({ title, src }: Props) {
  return (
    <header className="flex items-center gap-2 w-full min-h-[44px]">
      <SvgRenderer className="size-8 bg-primary" src={src} />
      <Typography variant="h2">{title}</Typography>
      <Separator className="flex-1" />
      <ChevronDown className="text-muted-foreground" aria-hidden="true" />
    </header>
  );
}

export { SectionHeader };
