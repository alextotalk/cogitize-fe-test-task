"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const VIEWPORT = { once: true, amount: 0.3 } as const;

const MissionSection = () => {
  const t = useTranslations("design.mission");
  const words = t("heading").split(" ");

  return (
    <section id="mission" className="relative overflow-hidden bg-[#efeeed] pt-20">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5 }}
        className="text-center text-lg font-normal text-[#181818] sm:text-xl"
      >
        {t("kicker")}
      </motion.p>

      <div className="relative mx-auto mt-6 w-full max-w-290 px-5">
        <motion.img
          src="/images/design/note-audience.png"
          alt={t("sticker")}
          initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
          viewport={VIEWPORT}
          transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.4 }}
          className="absolute left-[28%] top-0 z-10 hidden w-44 -translate-y-1/2 md:block"
        />

        <h2 className="relative z-0 mx-auto max-w-235 text-center text-[clamp(44px,9.5vw,132px)] font-extrabold uppercase leading-[0.96] tracking-tight text-[#050505]">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 * index }}
              className="inline-block"
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 10 }}
          whileInView={{ opacity: 1, y: 0, rotate: 5 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="absolute -top-8 right-[4%] z-10 hidden w-39 lg:block"
        >
          <Image
            src="/images/design/polaroid-girl.png"
            alt=""
            width={386}
            height={232}
            className="h-auto w-full shadow-xl"
          />
        </motion.div>

        <motion.img
          src="/images/design/sticker-mission.png"
          alt=""
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute right-[2%] top-[38%] z-10 hidden w-36 lg:block"
        />

        <motion.img
          src="/images/design/doodle-heart.svg"
          alt=""
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.65 }}
          className="absolute bottom-[6%] right-[10%] z-10 hidden w-17 lg:block"
        />

        <motion.img
          src="/images/design/doodle-arrow.svg"
          alt=""
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.45, delay: 0.55 }}
          className="absolute bottom-[-10%] left-[38%] z-10 hidden w-8 lg:block"
        />
      </div>

      <div className="relative mt-20">
        <motion.div
          initial={{ opacity: 0, y: 32, rotate: -6 }}
          whileInView={{ opacity: 1, y: 0, rotate: -3 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="absolute -top-24 left-[4%] z-20 w-40 sm:w-49"
        >
          <Image
            src="/images/design/polaroid-fairy.png"
            alt=""
            width={394}
            height={414}
            className="h-auto w-full drop-shadow-2xl"
          />
        </motion.div>

        <div className="relative">
          <div className="flex h-75 sm:h-118">
            <div className="relative w-1/2">
              <Image
                src="/images/design/mission-photo-1.webp"
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="relative w-1/2">
              <Image
                src="/images/design/mission-photo-2.webp"
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Curved transition from the section background into the photos. */}
          <div
            aria-hidden
            className="absolute -top-px left-1/2 h-30 w-[160%] -translate-x-1/2 bg-[#efeeed]"
            style={{ borderRadius: "0 0 100% 100% / 0 0 100% 100%" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="absolute left-[6%] top-[30%] z-10 flex max-w-91 flex-col items-start gap-3 sm:top-[26%]"
          >
            <span className="rounded-md bg-[#ffd000] px-3 py-1 text-base font-medium text-[#181818] sm:text-xl">
              {t("tagTribe")}
            </span>
            <span className="rounded-md bg-[#bf57f3] px-3 py-1 text-base font-medium text-[#fefefe] sm:text-xl">
              {t("tagNoise")}
            </span>
            <p className="mt-2 text-base font-medium leading-snug text-[#fefefe] drop-shadow-md sm:text-xl">
              {t("paragraph")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
