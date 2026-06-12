"use client";

import { Asset } from "@/06.entities";
import { PREVIEW_THROTTLE_MS } from "@/07.shared/const";
import { useThrottledCallback } from "@/07.shared/hooks";
import { useCallback, useRef, useState } from "react";
import {
  SwapDirection,
  SwapPreview,
  SwapPreviewPayload,
  usePreviewSwapMutation,
} from "../../api";
import { DEFAULT_FROM_ASSET, DEFAULT_TO_ASSET, SWAP_BALANCE_TYPES } from "../const";
import { formatAmount, isPositiveAmount, sanitizeAmountInput } from "../lib";

interface SwapAmounts {
  from: string;
  to: string;
}

const EMPTY_AMOUNTS: SwapAmounts = { from: "", to: "" };

export const useSwapForm = () => {
  const [fromAsset, setFromAsset] = useState<Asset>(DEFAULT_FROM_ASSET);
  const [toAsset, setToAsset] = useState<Asset>(DEFAULT_TO_ASSET);
  const [amounts, setAmounts] = useState<SwapAmounts>(EMPTY_AMOUNTS);
  const [preview, setPreview] = useState<SwapPreview | null>(null);
  const [isPreviewError, setIsPreviewError] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [previewSwap, { isLoading: isPreviewLoading }] = usePreviewSwapMutation();

  // Guards against out-of-order responses: only the latest request may
  // write its result into the form.
  const requestSeq = useRef(0);
  // The side the user edited last — the opposite one is auto-calculated.
  const [activeDirection, setActiveDirection] = useState<SwapDirection>("from");

  const runPreview = useCallback(
    async (payload: Omit<SwapPreviewPayload, "balanceType">) => {
      const seq = ++requestSeq.current;
      try {
        const result = await previewSwap({
          ...payload,
          balanceType: SWAP_BALANCE_TYPES,
        }).unwrap();
        if (seq !== requestSeq.current) return;

        setPreview(result);
        setIsPreviewError(false);
        setAmounts((prev) =>
          payload.direction === "from"
            ? { ...prev, to: formatAmount(result.estimatedReceive) }
            : { ...prev, from: formatAmount(result.estimatedGive) },
        );
      } catch {
        if (seq !== requestSeq.current) return;
        setPreview(null);
        setIsPreviewError(true);
        setAmounts((prev) =>
          payload.direction === "from" ? { ...prev, to: "" } : { ...prev, from: "" },
        );
      }
    },
    [previewSwap],
  );

  const { throttled: requestPreview, cancel: cancelPendingPreview } =
    useThrottledCallback(runPreview, PREVIEW_THROTTLE_MS);

  /** Drops the current rate and ignores any in-flight preview response. */
  const invalidatePreview = useCallback(() => {
    requestSeq.current += 1;
    cancelPendingPreview();
    setPreview(null);
    setIsPreviewError(false);
  }, [cancelPendingPreview]);

  const handleAmountChange = (direction: SwapDirection, raw: string) => {
    const value = sanitizeAmountInput(raw);
    if (value === null) return;

    setActiveDirection(direction);
    setAmounts((prev) =>
      direction === "from" ? { ...prev, from: value } : { ...prev, to: value },
    );

    invalidatePreview();
    if (!isPositiveAmount(value)) {
      setAmounts((prev) =>
        direction === "from" ? { ...prev, to: "" } : { ...prev, from: "" },
      );
      return;
    }

    requestPreview({
      fromAssetId: fromAsset.id,
      toAssetId: toAsset.id,
      direction,
      amount: value,
    });
  };

  const handleSelectAsset = (side: SwapDirection, asset: Asset) => {
    const current = side === "from" ? fromAsset : toAsset;
    if (asset.id === current.id) return;

    const opposite = side === "from" ? toAsset : fromAsset;
    if (asset.id === opposite.id) {
      // Picking the opposite token is treated as swapping the pair.
      setFromAsset(toAsset);
      setToAsset(fromAsset);
    } else if (side === "from") {
      setFromAsset(asset);
    } else {
      setToAsset(asset);
    }

    // Token change resets the rate and clears both inputs (placeholders stay).
    invalidatePreview();
    setAmounts(EMPTY_AMOUNTS);
  };

  const handleSwapSides = () => {
    const nextFrom = toAsset;
    const nextTo = fromAsset;
    setFromAsset(nextFrom);
    setToAsset(nextTo);

    invalidatePreview();

    // Amounts stay in place; the rate is recalculated for the new pair
    // based on the side the user edited last.
    const amount = activeDirection === "from" ? amounts.from : amounts.to;
    if (!isPositiveAmount(amount)) return;

    requestPreview({
      fromAssetId: nextFrom.id,
      toAssetId: nextTo.id,
      direction: activeDirection,
      amount,
    });
  };

  const resetForm = useCallback(() => {
    invalidatePreview();
    setAmounts(EMPTY_AMOUNTS);
    setActiveDirection("from");
  }, [invalidatePreview]);

  const openConfirm = () => setIsConfirmOpen(true);

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    resetForm();
  };

  const canConfirm =
    Boolean(preview) &&
    !isPreviewLoading &&
    isPositiveAmount(amounts.from) &&
    isPositiveAmount(amounts.to);

  return {
    fromAsset,
    toAsset,
    amounts,
    preview,
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
  };
};
