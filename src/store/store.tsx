import { Policy } from "cloudproof_js";
import { StateCreator, create } from "zustand";
import { Employee, employees } from "../utils/covercryptConfig";
import { MenuItem, navigationConfig } from "../utils/navigationConfig";
import { EncryptedResult, KeysUid, Language } from "../utils/types";

interface LanguageSlice {
  language: Language;
  changeLanguage: (language: Language) => void;
}
interface StepSlice {
  steps: MenuItem[];
  updateSteps: (newSteps: MenuItem[]) => void;
}

interface CovercryptSlice {
  clearEmployees: Employee[];
  encryptedEmployees: EncryptedResult[] | undefined;
  policy: Policy | undefined;
  keyPair: KeysUid | undefined;
  decryptionKeyUid: string | undefined;
  setPolicy: (policy: Policy) => void;
  setEncryptedEmployees: (encryptedEmployees: EncryptedResult[]) => void;
  setKeyPair: (keyPair: KeysUid) => void;
  setDecryptionKeyUid: (decryptionKeyUid: string) => void;
}

const createLanguageSlice: StateCreator<LanguageSlice, [], [], LanguageSlice> = (set) => ({
  language: "java",
  changeLanguage: (language: Language) => set(() => ({ language: language })),
});

const createStepSlice: StateCreator<StepSlice, [], [], StepSlice> = (set) => ({
  steps: navigationConfig as MenuItem[],
  updateSteps: (newSteps: MenuItem[]) => set(() => ({ steps: newSteps })),
});

const createCovercryptSlice: StateCreator<CovercryptSlice, [], [], CovercryptSlice> = (set) => ({
  clearEmployees: employees,
  encryptedEmployees: undefined,
  policy: undefined,
  keyPair: undefined,
  decryptionKeyUid: undefined,
  setPolicy: (policy: Policy) => set(() => ({ policy })),
  setEncryptedEmployees: (encryptedEmployees: EncryptedResult[]) => set(() => ({ encryptedEmployees })),
  setKeyPair: (keyPair: KeysUid) => set(() => ({ keyPair })),
  setDecryptionKeyUid: (decryptionKeyUid: string) => set(() => ({ decryptionKeyUid })),
});

export const useBoundStore = create<LanguageSlice & StepSlice & CovercryptSlice>((...a) => ({
  ...createLanguageSlice(...a),
  ...createStepSlice(...a),
  ...createCovercryptSlice(...a),
}));
