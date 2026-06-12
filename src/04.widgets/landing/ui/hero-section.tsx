"use client";

import { Marquee } from "@/07.shared/components";
import { motion } from "framer-motion";
import { CornerDownRight } from "lucide-react";
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
              className="flex items-center text-sm font-medium tracking-wide text-[#bf57f3]"
            >
              <span
                className={
                  key === "percent"
                    ? "rounded-md border border-[#bf57f3]/40 px-2 py-0.5"
                    : ""
                }
              >
                {t(key)}
              </span>
              <span className="mx-5 h-4 w-px bg-[#bf57f3]/30" />
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
    <section id="home" className="relative flex min-h-screen flex-col bg-[#fefefe] pt-22">
      <div className="flex flex-1 flex-col items-center justify-end gap-6 px-5 pb-12 pt-16 sm:justify-center sm:gap-10 sm:py-16">
        <div className="relative w-full max-w-275">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="/images/design/hero-phase.webp"
              alt={t("subtitle")}
              width={1600}
              height={406}
              priority
              className="h-auto w-full"
            />
          </motion.div>

          <motion.img
            src="/images/design/doodle-smiley.svg"
            alt=""
            initial={{ opacity: 0, rotate: -24, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 14 }}
            className="absolute -top-6 left-0 w-14 sm:-top-9 sm:-left-6 sm:w-23"
          />

          <motion.span
            initial={{ opacity: 0, y: 12, rotate: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 240, damping: 16 }}
            className="absolute -top-10 right-2 px-4 py-1.5 text-sm font-medium text-[#fefefe] sm:-top-12 sm:right-10 sm:text-xl"
          >
            {/* Hand-drawn marker stroke from the mockup, stretched under the localized text */}
            <img
              src="/images/design/pill-doodle.svg"
              alt=""
              className="absolute inset-0 h-full w-full"
            />
            <span className="relative">{t("pill")}</span>
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
          className="text-center text-[15px] font-medium text-[#181818] sm:text-xl"
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
          className="flex h-10.5 items-center gap-2 rounded-[10px] bg-[#ffd000] px-6 text-base font-medium text-[#050505] shadow-[0_8px_24px_rgba(255,208,0,0.4)]"
        >
          <CornerDownRight className="h-4 w-4" />
          {t("cta")}
        </motion.button>
      </div>

      <Marquee className="border-y border-[#bf57f3]/15 bg-[#faf3fe] py-4">
        <MarqueeRow />
      </Marquee>
    </section>
  );
};

export default HeroSection;
