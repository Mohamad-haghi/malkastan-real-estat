import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'malkastan_compare';
const MAX_COMPARE = 3;

function readCompare(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function useCompare() {
  const [compareList, setCompareList] = useState<string[]>(readCompare);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
    } catch {
      // ignore
    }
  }, [compareList]);

  const toggleCompare = useCallback((id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((c) => c !== id);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const isComparing = useCallback(
    (id: string) => compareList.includes(id),
    [compareList],
  );

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((c) => c !== id));
  }, []);

  const clearCompare = useCallback(() => setCompareList([]), []);

  const canAddMore = compareList.length < MAX_COMPARE;

  return {
    compareList,
    toggleCompare,
    isComparing,
    removeFromCompare,
    clearCompare,
    canAddMore,
    maxCompare: MAX_COMPARE,
  };
}
