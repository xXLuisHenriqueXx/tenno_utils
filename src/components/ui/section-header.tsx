import { Typography } from "./typograph";
import { Separator } from "./separator";
import { ChevronDown } from "lucide-react";

interface Props {
  title: string;
  src: string;
}

function SectionHeader({ title, src }: Props) {
  return (
    <header className="flex items-center gap-2 w-full">
      <img className="size-8 object-contain" src={src} alt="Alert" />
      <Typography variant="h2">{title}</Typography>
      <Separator className="flex-1" />
      <ChevronDown className="text-muted-foreground" />
    </header>
  );
}

export { SectionHeader };
