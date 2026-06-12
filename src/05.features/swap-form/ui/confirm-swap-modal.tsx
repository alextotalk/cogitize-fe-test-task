"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ConfirmSwapModalProps {
  isOpen: boolean;
  fromSymbol: string;
  fromAmount: string;
  toSymbol: string;
  toAmount: string;
  onClose: () => void;
}

const ConfirmSwapModal = ({
  isOpen,
  fromSymbol,
  fromAmount,
  toSymbol,
  toAmount,
  onClose,
}: ConfirmSwapModalProps) => {
  const t = useTranslations("swap.modal");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-90 flex-col items-center gap-5 rounded-3xl bg-[#1d1d1d] p-8 text-center"
          >
            <CheckCircle2 className="h-12 w-12 text-[#05d533]" />
            <p className="text-lg font-medium leading-snug text-[#f1f1f1]">
              {t("message", { fromSymbol, fromAmount, toSymbol, toAmount })}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="h-10 w-full rounded-lg bg-[#05d533] font-medium text-[#050505] transition-colors hover:bg-[#04c02e]"
            >
              {t("ok")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmSwapModal;
