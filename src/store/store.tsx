import { FindexKey, Label, Policy } from "cloudproof_js";
import { StateCreator, create } from "zustand";
import { Employee, employees } from "../utils/covercryptConfig";
import { MenuItem, navigationConfig } from "../utils/navigationConfig";
import { EncryptedResult, FindexCallbacks, KeysUid, Language } from "../utils/types";

interface LanguageSlice {
  language: Language;
  setLanguage: (language: Language) => void;
}
interface StepSlice {
  steps: MenuItem[];
  setSteps: (newSteps: MenuItem[]) => void;
}
interface TokenSlice {
  kmsToken: string | undefined;
  setKmsToken: (token: string) => void;
}

interface CovercryptSlice {
  clearEmployees: Employee[];
  encryptedEmployees: EncryptedResult[] | undefined;
  decryptedEmployees: Employee[] | undefined;
  policy: Policy | undefined;
  keyPair: KeysUid | undefined;
  decryptionKeyUid: string | undefined;
  setPolicy: (policy: Policy) => void;
  setEncryptedEmployees: (encryptedEmployees: EncryptedResult[]) => void;
  setKeyPair: (keyPair: KeysUid) => void;
  setDecryptionKeyUid: (decryptionKeyUid: string) => void;
  setDecryptedEmployees: (decryptedEmployees: Employee[]) => void;
}
interface FindexSlice {
  findexKey: FindexKey | undefined;
  label: Label | undefined;
  callbacks: FindexCallbacks | undefined;
  resultEmployees: Employee[] | undefined;
  setFindexKey: (findexKey: FindexKey) => void;
  setLabel: (label: Label) => void;
  setCallbacks: (callbacks: FindexCallbacks) => void;
  setResultEmployees: (resultEmployees: Employee[]) => void;
}

const createLanguageSlice: StateCreator<LanguageSlice, [], [], LanguageSlice> = (set) => ({
  language: "java",
  setLanguage: (language: Language) => set(() => ({ language: language })),
});

const createStepSlice: StateCreator<StepSlice, [], [], StepSlice> = (set) => ({
  steps: navigationConfig as MenuItem[],
  setSteps: (newSteps: MenuItem[]) => set(() => ({ steps: newSteps })),
});

const createTokenSlice: StateCreator<TokenSlice, [], [], TokenSlice> = (set) => ({
  kmsToken: undefined,
  setKmsToken: (token: string) => set(() => ({ kmsToken: token })),
});

const createCovercryptSlice: StateCreator<CovercryptSlice, [], [], CovercryptSlice> = (set) => ({
  clearEmployees: employees,
  encryptedEmployees: undefined,
  decryptedEmployees: undefined,
  policy: undefined,
  keyPair: undefined,
  decryptionKeyUid: undefined,
  setPolicy: (policy: Policy) => set(() => ({ policy })),
  setEncryptedEmployees: (encryptedEmployees: EncryptedResult[]) => set(() => ({ encryptedEmployees })),
  setKeyPair: (keyPair: KeysUid) => set(() => ({ keyPair })),
  setDecryptionKeyUid: (decryptionKeyUid: string) => set(() => ({ decryptionKeyUid })),
  setDecryptedEmployees: (decryptedEmployees: Employee[]) => set(() => ({ decryptedEmployees })),
});

const createFindexSlice: StateCreator<FindexSlice, [], [], FindexSlice> = (set) => ({
  findexKey: undefined,
  label: undefined,
  callbacks: undefined,
  resultEmployees: undefined,
  setFindexKey: (findexKey: FindexKey) => set(() => ({ findexKey })),
  setLabel: (label: Label) => set(() => ({ label })),
  setCallbacks: (callbacks: FindexCallbacks) => set(() => ({ callbacks })),
  setResultEmployees: (resultEmployees: Employee[]) => set(() => ({ resultEmployees })),
});

export const useBoundStore = create<LanguageSlice & StepSlice & TokenSlice & CovercryptSlice & FindexSlice>((...a) => ({
  ...createLanguageSlice(...a),
  ...createStepSlice(...a),
  ...createTokenSlice(...a),
  ...createCovercryptSlice(...a),
  ...createFindexSlice(...a),
}));
