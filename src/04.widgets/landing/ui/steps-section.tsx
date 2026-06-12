"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const VIEWPORT = { once: true, amount: 0.3 } as const;

const CARD_STRIPES = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(0,0,0,0.045) 0 56px, transparent 56px 112px)",
};

const StepsSection = () => {
  const t = useTranslations("design.steps");
  const words = t("heading").split(" ");

  return (
    <section id="steps" className="bg-[#181818] py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-330 gap-16 px-5 sm:px-10 lg:grid-cols-[1.1fr_1fr] xl:grid-cols-[1fr_auto_200px]">
        <div className="relative self-center">
          <h2 className="text-[clamp(48px,8.5vw,122px)] font-extrabold uppercase leading-[0.92] tracking-tight text-[#fefefe]">
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.07 * index }}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.span
            initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.5 }}
            className="absolute bottom-[20%] left-[38%] rounded-full bg-[#bf57f3] px-4 py-1.5 text-base font-medium text-[#fefefe] sm:text-xl"
          >
            {t("tag")}
          </motion.span>
        </div>

        <div className="relative mx-auto w-full max-w-108">
          <motion.img
            src="/images/design/badge-start-1.png"
            alt=""
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 220, damping: 13, delay: 0.45 }}
            className="absolute -left-3 top-10 z-10 w-32 sm:-left-20 sm:w-43"
          />
          <motion.img
            src="/images/design/badge-start-2.png"
            alt=""
            initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 220, damping: 13, delay: 0.6 }}
            className="absolute -right-3 top-[38%] z-10 w-32 sm:-right-16 sm:w-43"
          />

          <motion.article
            initial={{ opacity: 0, y: 48, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ rotate: -0.6, scale: 1.01 }}
            className="relative flex min-h-140 flex-col overflow-hidden rounded-[20px] bg-[#ffd909] p-7 sm:min-h-158"
            style={CARD_STRIPES}
          >
            <div className="border-b border-[#181818]/20 pb-4">
              <Image
                src="/images/design/gifty-logo.png"
                alt={t("cardBrand")}
                width={782}
                height={106}
                className="h-auto w-28"
              />
            </div>

            <div className="mt-16 flex flex-col gap-4 sm:mt-24">
              <span className="text-lg font-medium text-[#181818]">
                {t("cardNumber")}
              </span>
              <h3 className="max-w-87 text-4xl font-medium leading-tight text-[#050505] sm:text-[44px]">
                {t("cardTitle")}
              </h3>
              <p className="max-w-98 text-xl leading-snug text-[#181818] sm:text-2xl">
                {t("cardText")}
              </p>
            </div>
          </motion.article>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex max-w-49 flex-col gap-2 xl:mt-24"
        >
          <h4 className="text-lg font-medium text-[#fefefe] sm:text-xl">
            {t("asideTitle")}
          </h4>
          <p className="text-base leading-snug text-[#fefefe]/80">{t("asideText")}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default StepsSection;
