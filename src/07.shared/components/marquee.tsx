import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  durationSec?: number;
  className?: string;
}

/** Infinitely scrolling ticker line; content is duplicated for a seamless loop. */
const Marquee = ({ children, durationSec = 22, className }: MarqueeProps) => {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        className="marquee-track flex w-max"
        style={{ animationDuration: `${durationSec}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
