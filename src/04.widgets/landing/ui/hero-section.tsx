"use client";

import { Marquee } from "@/07.shared/components";
import { motion } from "framer-motion";
import { Reply } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MARQUEE_KEYS = ["identity", "percent", "free", "share"] as const;

const MarqueeRow = () => {
  const t = useTranslations("design.marquee");

  return (
    <>
      {[0, 1].map((repeat) => (
        <span key={repeat} className="flex items-center">
          {MARQUEE_KEYS.map((key) => (
            <span
              key={key}
              className="flex items-center text-sm font-medium text-[#bf57f3]"
            >
              <span
                className={
                  key === "percent"
                    ? "rounded border border-dashed border-[#bf57f3] p-1"
                    : ""
                }
              >
                {t(key)}
              </span>
              <span className="mx-4 h-[18px] border-l border-dashed border-[#bf57f3]" />
            </span>
          ))}
        </span>
      ))}
    </>
  );
};

const HeroSection = () => {
  const t = useTranslations("design.hero");

  return (
    <section
      id="home"
      className="relative w-full h-[812px] lg:h-[1024px] bg-[#fefefe] overflow-hidden"
    >
      {/* Centered relative container that matches Figma limits and anchors all absolute layouts */}
      <div className="relative mx-auto w-full h-full max-w-[375px] lg:max-w-[1440px]">
        {/* Main image container (Gemini_Generated_Image_37d1b537d1b537d1) */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[335px] h-[85px] top-[358px] lg:w-[1097px] lg:h-[278px] lg:top-[325px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/design/hero-phase.webp"
              alt={t("subtitle")}
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Smiley doodle (Vector / Group 59432) - Mobile */}
          <motion.img
            src="/images/design/doodle-smiley-mobile.svg"
            alt=""
            initial={{ opacity: 0, rotate: -24, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 14 }}
            whileHover={{ rotate: -8, scale: 1.1 }}
            className="absolute z-10 block lg:hidden w-[68px] h-[56px] left-[3px] top-[-34px] cursor-pointer"
          />

          {/* Smiley doodle (Vector / Group 59432) - Desktop */}
          <motion.img
            src="/images/design/doodle-smiley.svg"
            alt=""
            initial={{ opacity: 0, rotate: -24, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 14 }}
            className="absolute z-10 hidden lg:block w-[94px] h-[75px] left-[9px] top-[9px] cursor-pointer"
          />

          {/* "Independent minds only" label badge (Frame 2118530894 / Frame 2118530896) */}
          <motion.span
            initial={{ opacity: 0, y: 12, rotate: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 240, damping: 16 }}
            className="absolute z-10 flex items-center justify-center w-[186px] h-[23px] left-[149px] top-[-59px] lg:w-[240px] lg:h-[34px] lg:left-[808px] lg:top-[-37px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/design/pill-shape.svg"
              alt=""
              className="absolute inset-0 h-full w-full"
            />
            {/* Mobile: text-base (16px). Desktop: lg:text-xl (20px) */}
            <span className="relative z-20 text-center text-base font-medium leading-none text-[#fefefe] lg:text-xl">
              {t("pill")}
            </span>
          </motion.span>
        </div>

        {/* Text container and CTA button */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 w-[335px] h-[87px] top-[460px] lg:w-[390px] lg:h-[90px] lg:top-[618px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            className="text-center text-base font-medium text-[#181818] leading-[21px] lg:text-xl lg:leading-[24px]"
          >
            {t("subtitle")}
          </motion.p>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-10.5 w-[208px] items-center justify-center gap-3 rounded-lg bg-[#ffd000] px-5 py-[9px] text-base font-medium text-[#050505] cursor-pointer"
          >
            <Reply className="h-6 w-6 rotate-180" strokeWidth={1.5} />
            {t("cta")}
          </motion.button>
        </div>
      </div>

      {/* Marquee (run_line / run line) */}
      <Marquee className="absolute left-0 bottom-0 w-full h-[50px] border-t border-[#bf57f3] py-3">
        <MarqueeRow />
      </Marquee>
    </section>
  );
};

export default HeroSection;
