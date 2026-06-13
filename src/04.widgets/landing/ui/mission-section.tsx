"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const VIEWPORT = { once: true, amount: 0.3 } as const;

const MissionSection = () => {
  const t = useTranslations("design.mission");
  const words = t("heading").split(" ");

  return (
    <section id="mission" className="relative h-[744px] overflow-hidden bg-[#efeeed] lg:h-[1010px] lg:pt-20">
      <motion.p
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-10 w-[299px] -translate-x-1/2 text-center text-base font-normal leading-[21px] text-[#181818] lg:left-[calc(50vw-187px)] lg:top-[100px] lg:w-[373px] lg:translate-x-0 lg:text-xl lg:leading-6"
      >
        {t("kicker")}
      </motion.p>

      <motion.img
        src="/images/design/note-audience.png"
        alt={t("sticker")}
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.45, delay: 0.4 }}
        className="absolute left-[30px] top-[70px] z-30 h-[31px] w-[108px] lg:left-[421px] lg:top-[129px] lg:h-[52px] lg:w-[176px]"
      />

      <div className="absolute left-0 top-0 h-[407px] w-full lg:relative lg:mx-auto lg:mt-6 lg:h-auto lg:max-w-290 lg:px-5">
        <h2 className="absolute left-1/2 top-[89px] z-20 h-[230px] w-[335px] -translate-x-1/2 text-center text-[58px] font-extrabold uppercase leading-[0.8] text-[#050505] lg:relative lg:left-[7.5px] lg:top-[45px] lg:mx-auto lg:h-[424px] lg:w-[930px] lg:max-w-none lg:translate-x-0 lg:text-[132px] lg:tracking-[-0.01em]">
          <span className="block lg:hidden">
            {[
              words.slice(0, 3),
              words.slice(3, 5),
              words.slice(5, 6),
              words.slice(6, 8),
              words.slice(8),
            ].map((line, lineIndex) => (
              <span key={`mobile-line-${lineIndex}`} className="block">
                {line.map((word, wordIndex) => (
                  <motion.span
                    key={`${word}-${lineIndex}-${wordIndex}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.06 * (lineIndex + wordIndex),
                    }}
                    className="inline-block"
                  >
                    {word}
                    {wordIndex < line.length - 1 ? " " : ""}
                  </motion.span>
                ))}
              </span>
            ))}
          </span>
          <span className="hidden lg:block">
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
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="absolute right-[4%] top-[101px] z-10 hidden w-48 lg:block"
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
          className="absolute right-[-1%] top-[46%] z-10 hidden w-36 lg:block"
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

      <motion.img
        src="/images/design/doodle-heart.svg"
        alt=""
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.45, delay: 0.65 }}
        className="absolute left-[249px] top-[342px] z-30 w-[51px] lg:left-[225px] lg:top-[491px] lg:w-[70px]"
      />

      <div className="absolute left-0 top-[391px] w-full lg:relative lg:top-auto lg:-mt-9">
        {/* Mobile: centered polaroid card between heading and photos. Desktop: left overlay on photos.
            Wrapper handles position so framer-motion's transform doesn't clobber the centering translate. */}
        <div className="absolute left-1/2 top-[-60px] z-20 h-[199px] w-[227px] -translate-x-1/2 lg:left-20 lg:top-0 lg:h-auto lg:w-[197px] lg:translate-x-0">
          <motion.div
            animate={{ opacity: [0, 1], x: [-32, 0] }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="h-full lg:h-auto"
          >
            <Image
              src="/images/design/polaroid-fairy.png"
              alt=""
              width={394}
              height={414}
              className="h-full w-full lg:h-auto"
            />
          </motion.div>
        </div>

        <div className="relative">
          <div className="flex h-[353px] lg:h-118">
            <div className="relative w-[189px] lg:w-1/2">
              <Image
                src="/images/design/mission-photo-1.webp"
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
              {/* 20% darkening on the left photo (Figma Rectangle 66) for text legibility */}
              <div aria-hidden className="absolute inset-0 bg-black/20" />
            </div>
            {/* Desktop: right photo is shorter and bottom-aligned (Figma Rectangle 65, inset ~77px). Mobile: equal halves. */}
            <div className="relative flex-1 lg:w-1/2 lg:flex-none lg:h-[84%] lg:self-end">
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
            className="absolute left-1/2 top-[-241px] h-[257px] w-[1210px] -translate-x-1/2 bg-[#efeeed] lg:-top-px lg:h-34 lg:w-[160%]"
            style={{ borderRadius: "0 0 100% 100% / 0 0 100% 100%" }}
          />

          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="absolute left-5 top-[177px] z-10 flex w-[339px] max-w-none flex-col items-start gap-0 lg:left-[6%] lg:top-[63%] lg:max-w-91 lg:gap-1"
          >
            {/* Figma tags are tilted marker highlights (#ffd000), not solid pills */}
            <span className="relative mb-1 w-fit -rotate-2 text-base font-medium leading-snug text-[#181818] sm:text-xl lg:mb-0">
              <span
                aria-hidden
                className="absolute inset-x-[-6px] inset-y-[2px] -z-10 bg-[#ffd000]"
              />
              {t("tagTribe")}
            </span>
            <span className="relative mb-3 w-fit rotate-1 text-base font-medium leading-snug text-[#181818] sm:text-xl lg:mb-0">
              <span
                aria-hidden
                className="absolute inset-x-[-6px] inset-y-[2px] -z-10 bg-[#ffd000]"
              />
              {t("tagNoise")}
            </span>
            <p className="text-xl font-medium leading-[1.2] text-[#fefefe] drop-shadow-md lg:mt-3">
              {t("paragraph")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
