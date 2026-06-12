"use client";

import { SwapWidget } from "@/04.widgets";
import { LocaleSwitcher } from "@/07.shared/components";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Roboto } from "next/font/google";

const ROBOTO = Roboto({ weight: ["700"], subsets: ["latin", "cyrillic"] });

const SwapView = () => {
  const t = useTranslations("swap");

  return (
    <main className="relative flex min-h-screen flex-col items-center gap-12 bg-white px-4 py-16 sm:py-24">
      <div className="absolute right-4 top-4 sm:right-8 sm:top-6">
        <LocaleSwitcher variant="light" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`${ROBOTO.className} text-center text-[42px] font-bold text-[#050505] sm:text-[58px]`}
      >
        {t("heading")}
      </motion.h1>

      <SwapWidget />
    </main>
  );
};

export default SwapView;
