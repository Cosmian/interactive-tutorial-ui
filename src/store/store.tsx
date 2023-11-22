import { FindexKey, IndexedEntry, KmsObject, Label, Policy } from "cloudproof_js";
import { StateCreator, create } from "zustand";
import { Employee, employees } from "../utils/covercryptConfig";
import { NavigationConfig, navigationConfig } from "../utils/navigationConfig";
import { EncryptedResult, FindexCallbacks, KeysUid, Language } from "../utils/types";

export const CLIENT_2_TOKEN = import.meta.env.VITE_CLIENT_2_TOKEN as string;

interface LanguageSlice {
  language: Language;
  setLanguage: (language: Language) => void;
}
const createLanguageSlice: StateCreator<LanguageSlice, [], [], LanguageSlice> = (set) => ({
  language: "java",
  setLanguage: (language: Language) => set(() => ({ language: language })),
});

interface StepSlice {
  steps: NavigationConfig;
  setSteps: (newSteps: NavigationConfig) => void;
}
const createStepSlice: StateCreator<StepSlice, [], [], StepSlice> = (set) => ({
  steps: navigationConfig,
  setSteps: (newSteps: NavigationConfig) => set(() => ({ steps: newSteps })),
});

interface TokenSlice {
  kmsToken: string | undefined;
  kmsTwoToken: string;
  setKmsToken: (token: string) => void;
}
const createTokenSlice: StateCreator<TokenSlice, [], [], TokenSlice> = (set) => ({
  kmsToken: undefined,
  kmsTwoToken: CLIENT_2_TOKEN,
  setKmsToken: (token: string) => set(() => ({ kmsToken: token })),
});

// COVERCRYPT
interface CovercryptState {
  clearEmployees: Employee[];
  policy: Policy | undefined;
  keyPairUids: KeysUid | undefined;
  encryptedEmployees: EncryptedResult[] | undefined;
  decryptionKeyUid: string | undefined;
  decryptedEmployees: Employee[] | undefined;
  setPolicy: (policy: Policy) => void;
  setKeyPairUids: (keyPairUids?: KeysUid) => void;
  setEncryptedEmployees: (encryptedEmployees?: EncryptedResult[]) => void;
  setDecryptionKeyUid: (decryptionKeyUid?: string) => void;
  setDecryptedEmployees: (decryptedEmployees?: Employee[]) => void;
}
export const useCovercryptStore = create<CovercryptState>()((set) => ({
  clearEmployees: employees,
  policy: undefined,
  keyPairUids: undefined,
  encryptedEmployees: undefined,
  decryptionKeyUid: undefined,
  decryptedEmployees: undefined,
  setPolicy: (policy: Policy) =>
    set((state) => {
      state.setKeyPairUids(); // reset next steps
      return { policy };
    }),
  setKeyPairUids: (keyPairUids?: KeysUid) =>
    set((state) => {
      state.setEncryptedEmployees(); // reset next steps
      return { keyPairUids };
    }),
  setEncryptedEmployees: (encryptedEmployees?: EncryptedResult[]) =>
    set((state) => {
      state.setDecryptionKeyUid(); // reset next steps
      return { encryptedEmployees };
    }),
  setDecryptionKeyUid: (decryptionKeyUid?: string) =>
    set((state) => {
      state.setDecryptedEmployees(); // reset next steps
      return { decryptionKeyUid };
    }),
  setDecryptedEmployees: (decryptedEmployees?: Employee[]) => set(() => ({ decryptedEmployees })),
}));

// FINDEX
interface FindexState {
  findexKey: FindexKey | undefined;
  label: Label | undefined;
  callbacks: FindexCallbacks | undefined;
  indexedEntries: IndexedEntry[] | undefined;
  resultEmployees: Employee[] | undefined;
  setFindexKey: (findexKey: FindexKey) => void;
  setLabel: (label?: Label) => void;
  setCallbacks: (callbacks?: FindexCallbacks) => void;
  setIndexedEntries: (indexedEntries?: IndexedEntry[]) => void;
  setResultEmployees: (resultEmployees?: Employee[]) => void;
}
export const useFindexStore = create<FindexState>()((set) => ({
  findexKey: undefined,
  label: undefined,
  callbacks: undefined,
  indexedEntries: undefined,
  resultEmployees: undefined,
  setFindexKey: (findexKey: FindexKey) =>
    set((state) => {
      state.setLabel(); // reset next steps
      return { findexKey };
    }),
  setLabel: (label?: Label) =>
    set((state) => {
      state.setCallbacks();
      return { label };
    }),
  setCallbacks: (callbacks?: FindexCallbacks) =>
    set((state) => {
      state.setIndexedEntries(); // reset next steps
      return { callbacks };
    }),
  setIndexedEntries: (indexedEntries?: IndexedEntry[]) =>
    set((state) => {
      state.setResultEmployees(); // reset next steps
      return { indexedEntries };
    }),
  setResultEmployees: (resultEmployees?: Employee[]) => set(() => ({ resultEmployees })),
}));

// PKI
interface PkiState {
  clientOneUdkUid: string | undefined;
  encryptedEmployeesPki: EncryptedResult[] | undefined;
  wrappedPk2: WrappedKey | undefined;
  savedSk2: string | undefined;
  wrappedPkCertUid: string | undefined;
  accessGranted: boolean;
  certificateUid: string | undefined;
  wrappedUdk: KmsObject | undefined;
  wrappedUdkUid: string | undefined;
  wrappedUdk2: KmsObject | undefined;
  unwrappedUdkUid: string | undefined;
  clearEmployeesPki: Employee[] | undefined;
  setClientOneUdkUid: (uid: string) => void;
  setEncryptedEmployeesPki: (encryptedEmployees: EncryptedResult[]) => void;
  setWrappedPk2: (wrappedPk2?: WrappedKey) => void;
  setSavedSk2: (savedSk2?: string) => void;
  setPublishedWrappedPkUid: (wrappedPkCertUid?: string) => void;
  setAccessGranted: (granted: boolean) => void;
  setCertificateUid: (certificateUid?: string) => void;
  setWrappedUdk: (wrappedUdk?: KmsObject) => void;
  setWrappedUdkUid: (wrappedUdkUid?: string) => void;
  setWrappedUdk2: (wrappedUdk2?: KmsObject) => void;
  setUnwrappedUdkUid: (unwrappedUdkUid?: string) => void;
  setClearEmployeesPki: (clearEmployeesPki?: Employee[]) => void;
}

export const usePkiStore = create<PkiState>()((set) => ({
  clientOneUdkUid: undefined,
  encryptedEmployeesPki: undefined,
  wrappedPk2: undefined,
  savedSk2: undefined,
  wrappedPkCertUid: undefined,
  accessGranted: false,
  certificateUid: undefined,
  wrappedUdk: undefined,
  wrappedUdkUid: undefined,
  wrappedUdk2: undefined,
  unwrappedUdkUid: undefined,
  clearEmployeesPki: undefined,
  setClientOneUdkUid: (clientOneUdkUid: string) => set(() => ({ clientOneUdkUid })),
  setEncryptedEmployeesPki: (encryptedEmployeesPki: EncryptedResult[]) =>
    set((store) => {
      store.setWrappedPk2(); // reset next steps
      return { encryptedEmployeesPki };
    }),
  setWrappedPk2: (wrappedPk2?: WrappedKey) =>
    set((state) => {
      state.setSavedSk2();
      return { wrappedPk2 };
    }),
  setSavedSk2: (savedSk2?: string) =>
    set((store) => {
      store.setPublishedWrappedPkUid();
      return { savedSk2 };
    }),
  setPublishedWrappedPkUid: (wrappedPkCertUid?: string) =>
    set((state) => {
      state.setAccessGranted(false);
      return { wrappedPkCertUid };
    }),
  setAccessGranted: (granted: boolean) =>
    set((state) => {
      state.setCertificateUid(); // reset next steps
      return { accessGranted: granted };
    }),
  setCertificateUid: (certificateUid?: string) =>
    set((state) => {
      state.setWrappedUdk(); // reset next steps
      return { certificateUid };
    }),
  setWrappedUdk: (wrappedUdk?: KmsObject) =>
    set((state) => {
      state.setWrappedUdkUid(); // reset next steps
      return { wrappedUdk };
    }),
  setWrappedUdkUid: (wrappedUdkUid?: string) =>
    set((state) => {
      state.setWrappedUdk2(); // reset next steps
      return { wrappedUdkUid };
    }),
  setWrappedUdk2: (wrappedUdk2?: KmsObject) =>
    set((state) => {
      state.setUnwrappedUdkUid(); // reset next steps
      return { wrappedUdk2 };
    }),
  setUnwrappedUdkUid: (unwrappedUdkUid?: string) =>
    set((state) => {
      state.setClearEmployeesPki(); // reset next steps
      return { unwrappedUdkUid };
    }),
  setClearEmployeesPki: (clearEmployeesPki?: Employee[]) => set(() => ({ clearEmployeesPki })),
}));

// CONFIDENTIAL VM
interface ConfidentialVmState {
  helloWorld: boolean;
  snapshot: boolean;
  integrity: boolean;
  malware: boolean;
  setHelloWorld: (helloWorld?: boolean) => void;
  setSnapshot: (snapshot?: boolean) => void;
  setIntegrity: (integrity?: boolean) => void;
  setMalware: (malware?: boolean) => void;
}
export const useConfidentialVmSore = create<ConfidentialVmState>()((set) => ({
  helloWorld: false,
  snapshot: false,
  integrity: false,
  malware: false,
  setHelloWorld: (helloWorld?: boolean) =>
    set((state) => {
      state.setSnapshot(false); // reset next steps
      return { helloWorld };
    }),
  setSnapshot: (snapshot?: boolean) =>
    set((state) => {
      state.setIntegrity(false); // reset next steps
      return { snapshot };
    }),
  setIntegrity: (integrity?: boolean) =>
    set((state) => {
      state.setMalware(false); // reset next steps
      return { integrity };
    }),
  setMalware: (malware?: boolean) =>
    set(() => {
      return { malware };
    }),
}));
// CSE
type SummarizeApiResponse = {
  nonce: string;
  encrypted_summary: string;
};
interface CseState {
  symmetricKeyUid: string | undefined;
  summarizeApiResponse: SummarizeApiResponse | undefined;
  keyBytes: Uint8Array | undefined;
  clearSummary: string | undefined;
  setSymmetricKeyUid: (symmetricKeyUid?: string) => void;
  setSummarizeApiResponse: (summarizeApiResponse?: SummarizeApiResponse) => void;
  setKeyBytes: (keyBytes?: Uint8Array) => void;
  setClearSummary: (clearSummary?: string) => void;
}
export const useCseStore = create<CseState>()((set) => ({
  symmetricKeyUid: undefined,
  summarizeApiResponse: undefined,
  keyBytes: undefined,
  clearSummary: undefined,
  setSymmetricKeyUid: (symmetricKeyUid?: string) =>
    set((state) => {
      state.setSummarizeApiResponse(); // reset next steps
      return { symmetricKeyUid };
    }),
  setSummarizeApiResponse: (summarizeApiResponse?: SummarizeApiResponse) =>
    set((state) => {
      state.setClearSummary(); // reset next steps
      return { summarizeApiResponse };
    }),
  setKeyBytes: (keyBytes?: Uint8Array) =>
    set((_state) => {
      return { keyBytes };
    }),
  setClearSummary: (clearSummary?: string) =>
    set((_state) => {
      return { clearSummary };
    }),
}));

// BOUND STORE
export const useBoundStore = create<LanguageSlice & StepSlice & TokenSlice>((...a) => ({
  ...createLanguageSlice(...a),
  ...createStepSlice(...a),
  ...createTokenSlice(...a),
}));

// TYPES
type WrappedKey = { certBytes: Uint8Array; privateKeyBytes: Uint8Array };
