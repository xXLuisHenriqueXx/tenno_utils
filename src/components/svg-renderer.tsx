import type { CSSProperties } from "react";

interface Props {
  src: string;
  className?: string;
}

function SvgRenderer({ src, className = "size-10" }: Props) {
  const style: CSSProperties = {
    maskImage: `url("${src}")`,
    WebkitMaskImage: `url("${src}")`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskSize: "contain",
    WebkitMaskSize: "contain",
  };

  return (
    <div
      aria-hidden="true"
      className={`bg-foreground ${className}`}
      style={style}
    />
  );
}

export { SvgRenderer };
