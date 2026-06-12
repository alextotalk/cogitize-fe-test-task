"use client";

import { AmountField, ConfirmSwapModal, SwapSidesButton, useSwapForm } from "@/05.features";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const SwapWidget = () => {
  const t = useTranslations("swap");
  const {
    fromAsset,
    toAsset,
    amounts,
    activeDirection,
    isPreviewLoading,
    isPreviewError,
    isConfirmOpen,
    canConfirm,
    handleAmountChange,
    handleSelectAsset,
    handleSwapSides,
    openConfirm,
    closeConfirm,
  } = useSwapForm();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex w-full max-w-125 flex-col gap-6 rounded-3xl bg-[#1d1d1d] p-6 sm:p-10"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-[#f1f1f1]">{t("title")}</h2>

        <div className="rounded-[20px] border border-[#272727] px-5 py-6">
          <AmountField
            label={t("youSend")}
            asset={fromAsset}
            amount={amounts.from}
            placeholder={t("amountPlaceholder")}
            isCalculating={isPreviewLoading && activeDirection === "to"}
            onAmountChange={(value) => handleAmountChange("from", value)}
            onSelectAsset={(asset) => handleSelectAsset("from", asset)}
          />

          <SwapSidesButton onClick={handleSwapSides} label={t("swapSides")} />

          <AmountField
            label={t("youReceive")}
            asset={toAsset}
            amount={amounts.to}
            placeholder={t("amountPlaceholder")}
            isCalculating={isPreviewLoading && activeDirection === "from"}
            onAmountChange={(value) => handleAmountChange("to", value)}
            onSelectAsset={(asset) => handleSelectAsset("to", asset)}
          />
        </div>
      </div>

      {isPreviewError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-400"
          role="alert"
        >
          {t("previewError")}
        </motion.p>
      )}

      <button
        type="button"
        disabled={!canConfirm}
        onClick={openConfirm}
        className="h-10 rounded-lg bg-[#05d533] text-base font-medium text-[#050505] transition-all hover:bg-[#04c02e] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("next")}
      </button>

      <ConfirmSwapModal
        isOpen={isConfirmOpen}
        fromSymbol={fromAsset.symbol}
        fromAmount={amounts.from}
        toSymbol={toAsset.symbol}
        toAmount={amounts.to}
        onClose={closeConfirm}
      />
    </motion.section>
  );
};

export default SwapWidget;
