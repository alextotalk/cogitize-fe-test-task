"use client";

import { LocaleSwitcher } from "@/07.shared/components";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const NAV_ITEMS = [
  { key: "home", href: "#home" },
  { key: "how", href: "#mission" },
  { key: "features", href: "#benefits" },
  { key: "whom", href: "#steps" },
] as const;

const LandingHeader = () => {
  const t = useTranslations("design");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-22 max-w-360 items-center justify-between px-5 sm:px-10">
        <a href="#home" className="text-xl font-bold tracking-tight text-[#050505]">
          {t("brand")}
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-[#e4e4e4] bg-white/70 px-2 py-1 backdrop-blur md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#181818] transition-colors hover:bg-black/5"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher variant="light" />
          <button
            type="button"
            className="hidden h-10 items-center rounded-lg border border-[#d8d8d8] bg-white px-5 text-base font-medium text-[#050505] transition-colors hover:bg-black/5 md:flex"
          >
            {t("login")}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label={t("menu")}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[#d8d8d8] bg-white md:hidden"
          >
            <Menu className="h-5 w-5 text-[#050505]" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-[#fefefe] px-5 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[#050505]">{t("brand")}</span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label={t("menu")}
                className="grid h-10 w-10 place-items-center rounded-lg border border-[#d8d8d8]"
              >
                <X className="h-5 w-5 text-[#050505]" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.3 }}
                  className="text-3xl font-semibold text-[#050505]"
                >
                  {t(`nav.${item.key}`)}
                </motion.a>
              ))}
            </nav>

            <button
              type="button"
              className="mt-auto h-12 rounded-lg bg-[#ffd000] text-base font-medium text-[#050505]"
            >
              {t("login")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default LandingHeader;
