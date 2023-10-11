import { create } from "zustand";
import { Language } from "../utils/types";

interface LanguageState {
  language: Language;
  changeLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "c++",
  changeLanguage: (language: Language) => set(() => ({ language: language })),
}));
