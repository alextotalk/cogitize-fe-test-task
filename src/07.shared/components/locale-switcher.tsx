"use client";

import { Link, locales, usePathname } from "@/i18n";
import { useLocale } from "next-intl";

interface LocaleSwitcherProps {
  variant?: "light" | "dark";
}

const LocaleSwitcher = ({ variant = "light" }: LocaleSwitcherProps) => {
  const pathname = usePathname();
  const locale = useLocale();

  const base =
    variant === "light"
      ? { wrap: "bg-black/5", active: "bg-[#050505] text-white", idle: "text-[#050505]" }
      : { wrap: "bg-white/10", active: "bg-white text-[#050505]", idle: "text-white" };

  return (
    <nav
      aria-label="Language"
      className={`inline-flex items-center gap-1 rounded-full p-1 ${base.wrap}`}
    >
      {locales.map((item) => (
        <Link
          key={item}
          href={pathname}
          locale={item}
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase transition-colors ${
            item === locale ? base.active : base.idle
          }`}
        >
          {item}
        </Link>
      ))}
    </nav>
  );
};

export default LocaleSwitcher;
