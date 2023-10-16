import { StateCreator, create } from "zustand";
import { MenuItem, navigationConfig } from "../utils/navigationConfig";
import { Language } from "../utils/types";

interface LanguageSlice {
  language: Language;
  changeLanguage: (language: Language) => void;
}
interface StepSlice {
  steps: MenuItem[];
  updateSteps: (newSteps: MenuItem[]) => void;
}

const createLanguageSlice: StateCreator<LanguageSlice, [], [], LanguageSlice> = (set) => ({
  language: "java",
  changeLanguage: (language: Language) => set(() => ({ language: language })),
});

const createStepSlice: StateCreator<StepSlice, [], [], StepSlice> = (set) => ({
  steps: navigationConfig as MenuItem[],
  updateSteps: (newSteps: MenuItem[]) => set(() => ({ steps: newSteps })),
});

export const useBoundStore = create<LanguageSlice & StepSlice>((...a) => ({
  ...createLanguageSlice(...a),
  ...createStepSlice(...a),
}));
