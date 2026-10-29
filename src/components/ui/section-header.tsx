import { Typography } from "./typograph";
import { Separator } from "./separator";

interface Props {
  title: string;
  src: string;
}

function SectionHeader({ title, src }: Props) {
  return (
    <header className="flex items-center gap-2">
      <img className="size-8 object-contain" src={src} alt="Alert" />
      <Typography variant="h2">{title}</Typography>
      <Separator className="flex-1" />
    </header>
  );
}

export { SectionHeader };
