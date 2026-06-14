"use client";

import { LocaleSwitcher } from "@/07.shared/components";
import { AnimatePresence, motion } from "framer-motion";
import { Equal, Reply, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { key: "home", href: "#home" },
  { key: "how", href: "#mission" },
  { key: "features", href: "#steps" },
  { key: "whom", href: "#benefits" },
] as const;

// Hide the pinned header after this long without scrolling.
const HIDE_DELAY_MS = 1000;
// Within this distance from the top the header always stays visible.
const TOP_OFFSET = 8;

const LandingHeader = () => {
  const t = useTranslations("design");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    // Never hide while sitting at the very top of the page.
    if (window.scrollY <= TOP_OFFSET) return;
    hideTimer.current = setTimeout(() => setIsVisible(false), HIDE_DELAY_MS);
  }, []);

  const keepVisible = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setIsVisible(true);
  }, []);

  // Reveal on scroll, then fade out once scrolling stops for HIDE_DELAY_MS.
  useEffect(() => {
    const onScroll = () => {
      setIsVisible(true);
      scheduleHide();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    scheduleHide();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [scheduleHide]);

  // Keep the bar on screen while the mobile menu is open.
  const shown = isVisible || isMenuOpen;

  return (
    <motion.header
      animate={{ y: shown ? 0 : "-100%", opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      onMouseEnter={keepVisible}
      onMouseLeave={scheduleHide}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div className="mx-auto flex h-[74px] max-w-360 items-center justify-between px-5 sm:px-20 md:h-[90px]">
        <a
          href="#home"
          className="rounded-lg bg-[#efeeed]/40 px-4 py-2 text-xl font-bold leading-[26px] text-black"
        >
          {t("brand")}
        </a>

        <nav className="hidden items-center md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-lg bg-[#efeeed]/40 px-4 py-3 text-sm font-medium leading-[18px] text-[#181818] transition-colors hover:bg-[#efeeed]/70"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher variant="light" />
          </div>
          <button
            type="button"
            className="hidden h-10.5 items-center rounded-lg border border-[#050505] px-5 text-base font-medium text-[#050505] transition-colors hover:bg-black/5 md:flex"
          >
            {t("login")}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label={t("menu")}
            className="grid h-10.5 w-10.5 place-items-center rounded-lg bg-[#efeeed]/40 md:hidden"
          >
            <Equal className="h-6 w-6 text-[#050505]" />
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
            className="fixed inset-0 z-50 bg-[#fefefe] md:hidden"
          >
            {/* Header (375x74, padding 16/20): brand chip + close */}
            <div className="absolute inset-x-0 top-0 flex h-[74px] items-center justify-between px-5">
              <span className="rounded-lg bg-[#efeeed]/40 px-4 py-3 text-xl font-bold leading-[26px] text-black">
                {t("brand")}
              </span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label={t("menu")}
                className="grid h-10.5 w-10.5 place-items-center rounded-lg bg-[#efeeed]/40"
              >
                <X className="h-6 w-6 text-[#0c0c0c]" />
              </button>
            </div>

            {/* Nav list (Frame 2118530929: left 20, top 177, gap 25) */}
            <nav className="absolute inset-x-5 top-[177px] flex flex-col gap-[25px]">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.3 }}
                  className="flex items-start gap-4 border-b border-[#b3b3b3] pb-4"
                >
                  <span className="text-[40px] font-medium leading-none tracking-[-0.03em] text-[#050505]">
                    {t(`nav.${item.key}`)}
                  </span>
                  <span className="text-base font-medium leading-none tracking-[-0.03em] text-[#bf57f3]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* "Start wishing" doodle (Group: left 201.62, top 448, 113x67) */}
            <img
              src="/images/design/start-wishing.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-[201.62px] top-[448px] h-[67px] w-[113px]"
            />

            {/* Bottom buttons (Frame 2118530930: left 20, bottom 40, gap 15) */}
            <div className="absolute inset-x-5 bottom-10 flex flex-col items-start gap-[15px]">
              <LocaleSwitcher variant="light" />
              <button
                type="button"
                className="flex h-[42px] w-full items-center justify-center gap-3 rounded-lg bg-[#ffd000] text-base font-medium text-[#050505]"
              >
                <Reply className="h-6 w-6 rotate-180" strokeWidth={1.5} />
                {t("hero.cta")}
              </button>
              <button
                type="button"
                className="h-[42px] w-full rounded-lg border border-[#050505] text-base font-medium text-[#050505]"
              >
                {t("login")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default LandingHeader;
