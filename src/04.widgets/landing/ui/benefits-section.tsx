"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const ITEMS = [
  { key: "exhibition", image: "/images/design/benefit-exhibition.webp" },
  { key: "capsules", image: "/images/design/benefit-capsules.webp" },
  { key: "telemetry", image: "/images/design/benefit-telemetry.webp" },
  { key: "domain", image: "/images/design/benefit-domain.webp" },
  { key: "impact", image: "/images/design/benefit-impact.webp" },
] as const;

const AUTOPLAY_MS = 3200;

const BenefitsSection = () => {
  const t = useTranslations("design.benefits");
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // The reference animation cycles through rows; hover takes over control.
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(
      () => setActive((index) => (index + 1) % ITEMS.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="benefits"
      className="bg-[#181818] pb-24 pt-10 sm:pt-16"
      onMouseLeave={() => setIsPaused(false)}
    >
      <ul className="border-t border-white/10">
        {ITEMS.map((item, index) => {
          const isActive = index === active;

          return (
            <li key={item.key} className="border-b border-white/10">
              <button
                type="button"
                onMouseEnter={() => {
                  setActive(index);
                  setIsPaused(true);
                }}
                onFocus={() => {
                  setActive(index);
                  setIsPaused(true);
                }}
                onClick={() => setActive(index)}
                className="relative block w-full overflow-hidden text-left"
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="bg"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#181818] via-transparent to-[#181818]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative mx-auto grid min-h-22 w-full max-w-360 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-4 sm:min-h-32 sm:grid-cols-[260px_1fr_auto] sm:gap-x-10 sm:px-10">
                  <p className="order-3 col-span-2 max-w-67 text-sm leading-snug text-[#f4f4f4]/80 sm:order-none sm:col-span-1 sm:text-base">
                    {t(`${item.key}.desc`)}
                  </p>

                  <motion.h3
                    animate={{
                      color: isActive ? "#ffd000" : "#fefefe",
                      x: isActive ? 10 : 0,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-center text-3xl font-bold sm:text-[clamp(36px,4.4vw,62px)]"
                  >
                    {t(`${item.key}.title`)}
                  </motion.h3>

                  <motion.span
                    animate={{
                      backgroundColor: isActive ? "#bf57f3" : "#2c2c2c",
                      color: isActive ? "#fefefe" : "#8a8a8a",
                    }}
                    transition={{ duration: 0.35 }}
                    className="justify-self-end whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium sm:text-lg"
                  >
                    {t(`${item.key}.tag`)}
                  </motion.span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BenefitsSection;
