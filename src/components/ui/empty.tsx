import { SectionHeader } from "./section-header";
import { Typography } from "./typograph";

interface Props {
  title: string;
  description: string;
  src: string;
}

function Empty({ title, description, src }: Props) {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <SectionHeader title={title} src={src} />
      <Typography variant="p">{description}</Typography>
    </div>
  );
}

export { Empty };
