import { create } from "zustand";
import { persist } from "zustand/middleware";

interface KeywordStore {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

export const useKeywordStore = create<KeywordStore>()(
  persist(
    (set) => ({
      keywords: [],
      setKeywords: (keywords) => set({ keywords }),
    }),
    {
      name: "keyword-storage",
    },
  ),
);
