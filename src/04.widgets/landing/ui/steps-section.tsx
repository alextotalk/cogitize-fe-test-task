"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const VIEWPORT = { once: true, amount: 0.3 } as const;

type Sticker = {
  src: string;
  className: string;
  rotate: number;
};

type CardConfig = {
  key: string;
  bg: string;
  stripe: string;
  stickers: Sticker[];
};

// One config per Figma step card. Content comes from the `steps.cards` dictionary array.
const CARDS: CardConfig[] = [
  {
    key: "one",
    bg: "#ffd909",
    stripe: "#FFD000",
    stickers: [
      {
        src: "/images/design/badge-start-2.svg",
        className: "-left-7 top-[21%] w-[120px] sm:w-[130px]",
        rotate: -13,
      },
      {
        src: "/images/design/badge-start-2.svg",
        className: "-right-6 top-[46%] w-[120px] sm:w-[130px]",
        rotate: 0,
      },
    ],
  },
  {
    key: "two",
    bg: "#bf57f3",
    stripe: "rgba(198,94,250,0.6)",
    stickers: [
      {
        src: "/images/design/doodle-heart.svg",
        className: "left-3 top-[28%] w-14 sm:w-16",
        rotate: -10,
      },
      {
        src: "/images/design/doodle-sparkle.svg",
        className: "right-4 top-[44%] w-14 sm:w-16",
        rotate: 8,
      },
    ],
  },
  {
    key: "three",
    bg: "#ffd000",
    stripe: "rgba(255,217,9,0.6)",
    stickers: [
      {
        src: "/images/design/doodle-smiley.svg",
        className: "right-5 top-[30%] w-20 sm:w-24",
        rotate: 8,
      },
    ],
  },
];

const SWIPE_THRESHOLD = 70;
const SWIPE_VELOCITY = 400;
const AUTOPLAY_MS = 6000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 280 : -280,
    opacity: 0,
    scale: 0.92,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -280 : 280,
    opacity: 0,
    scale: 0.92,
  }),
};

const StepsSection = () => {
  const t = useTranslations("design.steps");
  const words = t("heading").split(" ");
  const headingLines = words.length >= 4 
    ? [words[0], words.slice(1, -1).join(" "), words[words.length - 1]]
    : words;

  // [active card index, slide direction]
  const [[active, direction], setState] = useState<[number, number]>([0, 0]);
  // Pause autoplay while the user is hovering or dragging the card.
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((step: number) => {
    setState(([current]) => [
      (current + step + CARDS.length) % CARDS.length,
      step,
    ]);
  }, []);

  // Auto-advance to the next card on a loop (interval = AUTOPLAY_MS).
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, paginate, active]);

  // Switch cards with the keyboard left/right arrows.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (event.key === "ArrowLeft") paginate(-1);
      else if (event.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const card = CARDS[active];

  return (
    <section id="steps" className="bg-[#181818] py-20 sm:py-24 lg:py-0">
      {/* Desktop mirrors the Figma 1440 frame: heading (left 80) | card (left 712) | blurb (left 1165) */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14 px-5 sm:gap-16 sm:px-10 lg:px-12 xl:grid xl:min-h-[835px] xl:grid-cols-[minmax(0,1fr)_minmax(300px,431px)_minmax(150px,195px)] xl:items-center xl:gap-10 xl:px-20">
        {/* Heading + tag */}
        <div className="relative w-full max-w-[335px] xl:max-w-none">
          <h2 className="text-center text-[58px] font-extrabold uppercase leading-[0.9] tracking-tight text-[#fefefe] xl:text-[122px] xl:text-left">
            {headingLines.map((line, index) => (
              <motion.span
                key={`${line}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.07 * index }}
                className="block whitespace-nowrap"
              >
                {line}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.5 }}
            className="absolute top-[33px] left-[42.4%] flex items-center justify-center w-[123px] h-[29px] xl:top-[203px] xl:left-[120px] xl:bottom-auto xl:w-[159px] xl:h-[34px]"
          >
            {/* Purple background shape - horizontal (0deg) */}
            <svg
              viewBox="0 0 122 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full"
            >
              <path
                d="M82.5374 0.493528C84.1739 0.581932 89.9299 1.17568 93.6661 1.21692C102.313 1.30352 110.929 1.63433 119.182 4.46443C120.471 4.91012 122.75 5.02943 121.636 12.9141C120.476 21.1192 118.3 25.8416 115.999 25.4495C110.43 24.4909 104.988 22.3852 99.1527 23.6052C90.6173 25.3869 82.5303 23.9568 74.2288 24.0735C66.7748 24.1781 59.4269 23.4807 51.963 23.6621C44.9523 23.8272 37.7592 25.3589 30.8189 25.0225C24.8289 24.7305 19.1084 22.4732 13.2061 21.5187C11.8168 21.2936 9.91867 22.6888 8.3865 22.5081C7.11993 22.3566 4.99267 22.2154 3.81628 21.4869C3.30902 21.1692 2.79104 20.772 2.21485 21.0483C-0.428363 22.2779 -0.693028 19.402 1.35237 10.4232C1.80264 8.44705 1.94451 5.84665 2.72444 4.51186C2.75653 4.45944 2.821 4.34754 2.85329 4.27385C5.40051 -1.12215 6.91044 1.48355 8.79588 1.42135C18.0448 1.14279 27.2221 1.40823 36.4248 1.47835C42.0719 1.51765 47.6558 2.07372 53.4134 1.21935C54.9897 0.987183 56.6862 -0.130247 58.1533 0.616608L58.1268 0.612997C59.7916 0.399983 61.4922 -0.070825 63.117 0.00889425C69.2647 0.315313 75.7905 -0.143145 81.6031 0.792003C81.8326 0.823331 82.1955 0.475272 82.5374 0.493528Z"
                fill="#BF57F3"
              />
            </svg>

            {/* Centered text overlay */}
            <span
              className="relative z-10 text-center text-[16px] xl:text-[20px] font-medium leading-none text-[#fefefe] select-none"
            >
              {t("tag")}
            </span>
          </motion.div>
        </div>

        {/* Step cards carousel: one at a time, swipeable in a loop + arrow keys */}
        <div className="flex flex-col">
          <div
            className="relative mx-auto min-h-[500px] w-full max-w-[479px] overflow-hidden px-6 sm:min-h-[540px] lg:min-h-[635px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.article
                key={card.key}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY) {
                    paginate(1);
                  } else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > SWIPE_VELOCITY) {
                    paginate(-1);
                  }
                  setIsPaused(false);
                }}
                className="relative flex min-h-[500px] cursor-grab touch-pan-y select-none flex-col border-[5px] border-b-[20px] border-[#fefefe] p-5 active:cursor-grabbing sm:min-h-[540px] sm:p-6 lg:min-h-[635px] xl:px-[15px] xl:py-[24px]"
                style={{ backgroundColor: card.bg }}
              >
                {/* Soft vertical stripes (Frame 1321318543 in Figma) */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                  {/* Rectangle 78 */}
                  <div
                    className="absolute"
                    style={{
                      width: "125.98px",
                      height: "396.18px",
                      left: "0px",
                      top: "0px",
                      backgroundColor: card.stripe,
                    }}
                  />
                  {/* Rectangle 79 */}
                  <div
                    className="absolute"
                    style={{
                      width: "151.82px",
                      height: "214.81px",
                      left: "62.99px",
                      top: "396.19px",
                      backgroundColor: card.stripe,
                    }}
                  />
                  {/* Rectangle 80 */}
                  <div
                    className="absolute"
                    style={{
                      width: "151.82px",
                      height: "214.81px",
                      left: "276.18px",
                      top: "396.19px",
                      backgroundColor: card.stripe,
                    }}
                  />
                  {/* Rectangle 81 */}
                  <div
                    className="absolute"
                    style={{
                      width: "117.9px",
                      height: "214.81px",
                      left: "276.18px",
                      top: "262.41px",
                      backgroundColor: card.stripe,
                    }}
                  />
                  {/* Rectangle 82 */}
                  <div
                    className="absolute"
                    style={{
                      width: "69.45px",
                      height: "396.18px",
                      left: "214.81px",
                      top: "0px",
                      backgroundColor: card.stripe,
                    }}
                  />
                </div>

                {/* Top: progress bar (one segment per card, filled up to the active one) + brand */}
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex gap-3">
                    {CARDS.map((item, segment) => (
                      <span
                        key={item.key}
                        className={`h-[5px] flex-1 rounded-full ${
                          segment <= active ? "bg-[#464646]" : "bg-[#fefefe]"
                        }`}
                      />
                    ))}
                  </div>
                  {/* Brand mark: 36px badge + wordmark (Figma Frame 2118530912) */}
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/design/gifty-mark.png"
                      alt=""
                      aria-hidden
                      width={80}
                      height={80}
                      className="pointer-events-none h-9 w-9 rounded-full"
                      draggable={false}
                    />
                    <span className="text-xl font-medium leading-none text-[#050505]">
                      {t("cardBrand")}
                    </span>
                  </div>
                </div>

                {/* Decorative doodles in the gap */}
                {card.stickers.map((sticker, index) => (
                  <motion.img
                    key={`${sticker.src}-${index}`}
                    src={sticker.src}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    initial={{ opacity: 0, scale: 0.5, rotate: sticker.rotate - 14 }}
                    animate={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
                    transition={{ type: "spring", stiffness: 220, damping: 13, delay: 0.2 }}
                    className={`pointer-events-none absolute z-20 ${sticker.className}`}
                  />
                ))}

                {/* Bottom: number + title + text (Frame 2118530920) */}
                <div className="relative z-10 mt-auto flex flex-col gap-3 pt-16 xl:gap-[40px] xl:w-[391px] xl:h-[315px] xl:items-start xl:pt-0">
                  {/* Frame 2118530911 */}
                  <div className="flex flex-col gap-2 xl:gap-[16px] xl:w-[391px] xl:h-[136px] xl:items-start xl:self-stretch">
                    {/* 01 */}
                    <span className="text-base font-medium text-[#181818] sm:text-lg xl:text-[20px] xl:leading-[24px] xl:w-[391px] xl:h-[24px] xl:self-stretch">
                      {t(`cards.${active}.number`)}
                    </span>
                    {/* Create your account */}
                    <h4 className="text-[28px] font-medium leading-tight tracking-[-0.03em] text-[#050505] sm:text-[34px] xl:text-[44px] xl:leading-[48px] xl:w-[346px] xl:h-[96px] xl:font-medium">
                      {t(`cards.${active}.title`)}
                    </h4>
                  </div>
                  {/* Paragraph text */}
                  <p className="text-lg leading-snug text-[#181818] sm:text-xl xl:text-[24px] xl:leading-[28px] xl:w-[391px] xl:h-[84px] xl:self-stretch">
                    {t(`cards.${active}.text`)}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Short blurb — Figma: left 1165, top 195 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto flex max-w-[301px] flex-col gap-2 items-center text-center xl:mx-0 xl:max-w-[195px] xl:self-start xl:pt-[195px] xl:text-left xl:items-start xl:gap-[12px]"
        >
          <h3 className="text-lg font-medium text-[#fefefe] sm:text-xl xl:text-[20px] xl:leading-[24px]">
            {t("asideTitle")}
          </h3>
          <p className="text-base leading-snug text-[#fefefe]/80 xl:text-[16px] xl:leading-[20px] xl:text-[#fefefe]">
            {t("asideText")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StepsSection;
