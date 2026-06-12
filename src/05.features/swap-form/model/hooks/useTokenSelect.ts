"use client";

import { useGetAssetsInfiniteQuery } from "@/06.entities";
import { SEARCH_DEBOUNCE_MS } from "@/07.shared/const";
import { useClickOutside, useDebouncedValue } from "@/07.shared/hooks";
import { UIEvent, useCallback, useMemo, useRef, useState } from "react";

const SCROLL_THRESHOLD_PX = 48;

export const useTokenSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS);
  const rootRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetAssetsInfiniteQuery(debouncedSearch, { skip: !isOpen });

  const assets = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch("");
  }, []);

  const toggle = () => setIsOpen((open) => !open);

  useClickOutside(rootRef, close, isOpen);

  const handleListScroll = (event: UIEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const nearBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - SCROLL_THRESHOLD_PX;
    if (nearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    isOpen,
    toggle,
    close,
    search,
    setSearch,
    rootRef,
    assets,
    isError,
    // First load or a new search — the list body shows a spinner.
    isListLoading: isFetching && !isFetchingNextPage,
    isFetchingNextPage,
    refetch,
    handleListScroll,
  };
};
