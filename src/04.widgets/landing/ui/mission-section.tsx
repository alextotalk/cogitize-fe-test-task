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
      <p
        className="absolute left-1/2 top-10 z-30 w-[299px] -translate-x-1/2 text-center text-base font-normal leading-[21px] text-[#181818] lg:left-[calc(50vw-187px)] lg:top-[100px] lg:w-[373px] lg:translate-x-0 lg:text-xl lg:leading-6"
      >
        {t("kicker")}
      </p>

      <div className="absolute left-0 top-0 h-[407px] w-full lg:relative lg:mx-auto lg:mt-6 lg:h-auto lg:max-w-290 lg:px-5">
        <h2 className="absolute left-1/2 top-[89px] z-20 h-[230px] w-[335px] -translate-x-1/2 text-center text-[58px] font-extrabold uppercase leading-[0.8] text-[#050505] lg:relative lg:left-[7.5px] lg:top-[45px] lg:mx-auto lg:h-[424px] lg:w-[930px] lg:max-w-none lg:translate-x-0 lg:text-[132px] lg:tracking-[-0.01em]">
          <motion.img
            src="/images/design/note-audience.png"
            alt={t("sticker")}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.08, rotate: -2 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
            className="absolute left-[10px] top-[-19px] z-30 h-[31px] w-[108px] lg:left-[166px] lg:top-[-20px] lg:h-[52px] lg:w-[176px] cursor-pointer"
          />
          <span className="block lg:hidden relative z-10">
            {(() => {
              let absoluteWordIndex = 0;
              return [
                words.slice(0, 3),
                words.slice(3, 5),
                words.slice(5, 6),
                words.slice(6, 8),
                words.slice(8),
              ].map((line, lineIndex) => (
                <span key={`mobile-line-${lineIndex}`} className="block">
                  {line.map((word, wordIndex) => {
                    const currentIdx = absoluteWordIndex++;
                    return (
                      <motion.span
                        key={`${word}-${lineIndex}-${wordIndex}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.06 * currentIdx,
                        }}
                        className="inline-block"
                      >
                        {word}
                        {wordIndex < line.length - 1 ? " " : ""}
                      </motion.span>
                    );
                  })}
                </span>
              ));
            })()}
          </span>
          <span className="hidden lg:block relative z-10">
            {(() => {
              let absoluteWordIndex = 0;
              return [words.slice(0, 3), words.slice(3, 5), words.slice(5, 7), words.slice(7)].map(
                (line, lineIndex) => (
                  <span key={`desktop-line-${lineIndex}`} className="block">
                    {line.map((word, wordIndex) => {
                      const currentIdx = absoluteWordIndex++;
                      return (
                        <motion.span
                          key={`${word}-${lineIndex}-${wordIndex}`}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={VIEWPORT}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.06 * currentIdx,
                          }}
                          className="inline-block"
                        >
                          {word}
                          {wordIndex < line.length - 1 ? " " : ""}
                        </motion.span>
                      );
                    })}
                  </span>
                ),
              );
            })()}
          </span>
          <motion.img
            src="/images/design/doodle-arrow.svg"
            alt=""
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.45 }}
            className="absolute z-0 w-[28px] h-[37px] left-[238px] top-[192px] lg:w-[34px] lg:h-[46px] lg:left-[873px] lg:top-[339px] cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{
              scale: 1.04,
              rotate: -2,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)"
            }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.3 }}
            className="absolute z-0 hidden lg:flex flex-col items-start bg-[#fefefe] shadow-xl pt-[2px] pr-[2px] pb-[16px] pl-[2px] gap-[10px] w-[193px] h-[116px] left-[799px] top-[94px] cursor-pointer"
          >
            <Image
              src="/images/design/polaroid-girl.png"
              alt=""
              width={189}
              height={98}
              className="w-[189px] h-[98px] rounded-none flex-none order-0 self-stretch grow object-cover"
            />
          </motion.div>
          <motion.img
            src="/images/design/sticker-mission.png"
            alt=""
            initial={{ opacity: 0, scale: 0.7, rotate: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
            className="absolute z-0 hidden lg:block w-[141px] h-[53px] left-[916px] top-[199px] cursor-pointer"
          />
        </h2>


      </div>



      <div className="absolute left-0 top-[391px] w-full lg:top-[537px] lg:h-[473px]">
        {/* Mobile: centered polaroid card between heading and photos. Desktop: left overlay on photos.
            Wrapper handles position so framer-motion's transform doesn't clobber the centering translate. */}
        <div className="absolute left-1/2 top-[-60px] z-20 h-[199px] w-[227px] -translate-x-1/2 lg:left-20 lg:top-[-45px] lg:h-[207px] lg:w-[197px] lg:translate-x-0">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.04,
              rotate: 2,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)"
            }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.25 }}
            className="w-full h-full flex flex-col justify-center items-center bg-[#FEFEFE] shadow-xl p-[2px_2px_8px] gap-[10px] lg:p-[2px_2px_16px] cursor-pointer"
          >
            <Image
              src="/images/design/polaroid-fairy.png"
              alt=""
              width={394}
              height={414}
              className="w-full h-full object-cover rounded-none flex-none self-stretch grow"
            />
          </motion.div>

          <motion.img
            src="/images/design/doodle-heart.svg"
            alt=""
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            whileInView={{
              opacity: 1,
              scale: [1, 1.15, 1, 1.15, 1, 1, 1],
              rotate: [-3, 3, -3, 3, 0, 0, 0],
            }}
            viewport={VIEWPORT}
            transition={{
              opacity: { duration: 0.4, delay: 0.6 },
              scale: {
                delay: 0.6,
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              },
              rotate: {
                delay: 0.6,
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              },
            }}
            className="absolute z-30 w-[51px] left-[175px] top-[11px] lg:w-[70px] lg:h-[70px] lg:left-[145px] lg:top-[-1px]"
          />
        </div>

        <div className="relative">
          <div className="relative w-full h-[353px] lg:h-[473px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-0 top-0 w-[50.4%] h-[353px] lg:w-[49.24%] lg:h-[473px] overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full relative cursor-pointer"
              >
                <Image
                  src="/images/design/mission-photo-1.webp"
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </motion.div>
              {/* 20% darkening on the left photo (Figma Rectangle 66) for text legibility */}
              <div aria-hidden className="absolute inset-0 bg-black/20 pointer-events-none" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="absolute left-[50.4%] top-0 w-[49.6%] h-[353px] lg:w-[50.76%] lg:h-[396px] lg:left-[49.24%] lg:top-[77px] overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full relative cursor-pointer"
              >
                <Image
                  src="/images/design/mission-photo-2.webp"
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Curved transition from the section background into the photos (Ellipse 3). */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bg-[#efeeed] w-[1210px] h-[257px] top-[-241px] min-[581px]:w-[3372px] min-[581px]:h-[609px] min-[581px]:top-[-473px]"
            style={{ borderRadius: "0 0 100% 100% / 0 0 100% 100%" }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="absolute left-5 top-[177px] z-10 flex w-[339px] h-[130px] flex-col items-start gap-3 lg:left-[80px] lg:top-[301px] lg:w-[364px] lg:h-[136px]"
          >
            {/* Frame 1321318558 */}
            <div className="relative flex flex-col items-start gap-1 isolate w-[173px] h-[46px] lg:w-[216px] lg:h-[52px]">
              {/* Highlight Line 1 */}
              <motion.svg
                width="185"
                height="25"
                viewBox="0 0 185 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                className="absolute z-0 w-[184.41px] h-[31.74px] left-[-5px] top-[-2px] lg:w-[221px] lg:h-[36px] lg:left-[-3.84px] lg:top-[-3px] origin-top-left"
              >
                <path d="M123.001 0.19309C125.523 0.253842 134.434 0.734034 140.167 0.721394C153.436 0.683799 166.693 0.876779 179.76 3.43003C181.802 3.83227 185.314 3.91329 184.762 11.359C184.188 19.1073 181.544 23.5877 177.959 23.2499C169.281 22.4232 160.63 20.5138 151.864 21.744C139.04 23.5407 126.433 22.3045 113.724 22.5289C102.312 22.7303 90.945 22.1744 79.5294 22.4482C68.8061 22.7004 58.0036 24.243 47.3147 24.0216C38.0891 23.829 28.9884 21.7806 19.8 20.9625C17.6372 20.7696 14.932 22.1105 12.5566 21.9614C10.5927 21.8361 7.31086 21.7323 5.40056 21.062C4.57629 20.7696 3.72394 20.4024 2.88117 20.6708C0.0582134 17.2774 0.0564668 16.4136 -2.7112e-05 10.6698C0.400292 8.80128 0.236226 6.34876 1.23602 5.08012C1.27752 5.03028 1.35994 4.92395 1.39863 4.85406C4.51181 -0.266143 7.20889 2.16861 10.0902 2.084C24.228 1.69399 38.336 1.81763 52.4541 1.75684C61.1169 1.71603 69.7588 2.16309 78.4598 1.27858C80.8424 1.03805 83.2792 -0.0383759 85.6377 0.645222L85.5966 0.642183C88.1175 0.418495 90.6554 -0.0486275 93.158 0.00410015C102.628 0.208114 112.564 -0.313889 121.612 0.487248C121.969 0.513606 122.474 0.1806 123.001 0.19309Z" fill="#FFD000" />
              </motion.svg>
              {/* Highlight Line 2 */}
              <motion.svg
                width="174"
                height="23"
                viewBox="0 0 174 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
                className="absolute z-10 w-[172.43px] h-[29.35px] left-[-5.83px] top-[24px] lg:w-[197.43px] lg:h-[33.3px] lg:left-[-4.94px] lg:top-[27px] origin-top-left"
              >
                <path d="M115.555 0.236664C117.906 0.2977 126.215 0.758956 131.561 0.758285C143.932 0.749015 156.293 0.952979 168.475 3.3396C170.378 3.71555 173.652 3.79724 173.133 10.6828C172.591 17.848 170.124 21.9868 166.781 21.6675C158.691 20.8862 150.625 19.1036 142.451 20.2246C130.493 21.8617 118.739 20.6941 106.889 20.8773C96.2491 21.0416 85.6512 20.5056 75.0074 20.7369C65.009 20.9495 54.9358 22.3555 44.9698 22.1302C36.3682 21.9344 27.8842 20.0223 19.3178 19.248C17.3013 19.0654 14.7781 20.3004 12.5566 20.1579C10.7324 20.0382 7.67255 19.936 5.89189 19.3123C5.12358 19.0403 4.32912 18.699 3.54314 18.9456C-0.0675796 20.0436 -0.837395 17.5387 0.863914 9.69015C1.23602 7.96275 1.08728 5.6941 2.02038 4.52266C2.05911 4.47665 2.13603 4.37845 2.17216 4.31389C5.07849 -0.415806 7.59146 1.84128 10.278 1.76856C23.4601 1.43501 36.6141 1.57648 49.7776 1.54739C57.8547 1.5263 65.9119 1.95639 74.0252 1.15503C76.2468 0.937146 78.5196 -0.0537615 80.7183 0.583031L80.6799 0.580142C83.0305 0.378097 85.3972 -0.0490673 87.7304 0.00450971C96.5596 0.211403 105.825 -0.252299 114.26 0.506062C114.593 0.531126 115.064 0.2241 115.555 0.236664Z" fill="#FFD000" />
              </motion.svg>
              
              {/* Just you and your tribe */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="relative z-20 font-medium text-base text-[#181818] text-center w-[173px] h-[21px] lg:text-[20px] lg:leading-[24px] lg:w-[216px] lg:h-[24px]"
              >
                {t("tagTribe")}
              </motion.span>
              
              {/* Zero algorithm noise. */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="relative z-30 font-medium text-base text-[#181818] text-center w-[156px] h-[21px] lg:text-[20px] lg:leading-[24px] lg:w-[194px] lg:h-[24px]"
              >
                {t("tagNoise")}
              </motion.span>
            </div>

            {/* Paragraph Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-medium text-[20px] leading-[24px] text-[#FEFEFE] w-[339px] h-[72px] lg:w-[364px] lg:h-[72px] self-stretch"
            >
              {t("paragraph")}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
