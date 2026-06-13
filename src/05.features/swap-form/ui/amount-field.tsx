"use client";

import { Asset } from "@/06.entities";
import { Loader2 } from "lucide-react";
import TokenSelect from "./token-select";

interface AmountFieldProps {
  label: string;
  asset: Asset;
  amount: string;
  placeholder: string;
  isCalculating?: boolean;
  onAmountChange: (value: string) => void;
  onSelectAsset: (asset: Asset) => void;
}

const AmountField = ({
  label,
  asset,
  amount,
  placeholder,
  isCalculating = false,
  onAmountChange,
  onSelectAsset,
}: AmountFieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm text-content-secondary">{label}</span>
      <div className="flex items-center justify-between gap-3">
        <TokenSelect asset={asset} onSelect={onSelectAsset} />
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          {isCalculating && (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-content-muted" />
          )}
          <input
            inputMode="decimal"
            autoComplete="off"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            placeholder={placeholder}
            aria-label={label}
            className="w-full min-w-0 bg-transparent text-right text-2xl font-semibold text-content-primary outline-none placeholder:text-content-muted"
          />
        </div>
      </div>
    </div>
  );
};

export default AmountField;
