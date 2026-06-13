"use client";

import { Asset, AssetIcon } from "@/06.entities";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTokenSelect } from "../model";

interface TokenSelectProps {
  asset: Asset;
  onSelect: (asset: Asset) => void;
}

const TokenSelect = ({ asset, onSelect }: TokenSelectProps) => {
  const t = useTranslations("swap");
  const {
    isOpen,
    toggle,
    close,
    search,
    setSearch,
    rootRef,
    assets,
    isError,
    isListLoading,
    isFetchingNextPage,
    refetch,
    handleListScroll,
  } = useTokenSelect();

  const handleSelect = (item: Asset) => {
    onSelect(item);
    close();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <AssetIcon asset={asset} size={24} />
        <span className="flex flex-col">
          <span className="flex items-center gap-2 text-2xl font-semibold leading-tight text-content-primary">
            {asset.symbol}
            <ChevronDown
              className={`h-6 w-6 text-content-secondary transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
          <span className="text-sm leading-tight text-content-secondary">{asset.name}</span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full z-30 mt-2 w-[232px] rounded-xl border border-content-secondary bg-panel p-3 shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
          >
            <label className="mb-2 flex h-10 items-center gap-2 rounded-lg border border-content-secondary bg-panel px-3 focus-within:border-panel-ring">
              <Search className="h-5 w-5 shrink-0 text-panel-ring" />
              <input
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-transparent text-base text-ink outline-none placeholder:text-panel-ring"
              />
            </label>

            <ul
              role="listbox"
              onScroll={handleListScroll}
              className="scroll-bar -mr-1 flex max-h-60 flex-col overflow-y-auto pr-1"
            >
              {isListLoading && (
                <li className="flex justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-content-muted" />
                </li>
              )}

              {!isListLoading && isError && (
                <li className="flex flex-col items-center gap-2 py-4 text-center">
                  <span className="text-sm text-content-muted">{t("listError")}</span>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="text-sm font-medium text-ink underline"
                  >
                    {t("retry")}
                  </button>
                </li>
              )}

              {!isListLoading && !isError && assets.length === 0 && (
                <li className="py-4 text-center text-sm text-content-muted">
                  {t("noResults")}
                </li>
              )}

              {!isListLoading &&
                !isError &&
                assets.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={item.id === asset.id}
                      onClick={() => handleSelect(item)}
                      className="flex h-11 w-full items-center gap-2 rounded-lg px-1.5 transition-colors hover:bg-black/5"
                    >
                      <AssetIcon asset={item} size={24} />
                      <span className="truncate text-base font-medium text-ink">
                        {item.symbol}
                      </span>
                      <span className="ml-auto max-w-[90px] truncate text-xs text-content-faint">
                        {item.name}
                      </span>
                    </button>
                  </li>
                ))}

              {isFetchingNextPage && (
                <li className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-content-muted" />
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TokenSelect;
