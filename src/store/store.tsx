import { FindexKey, IndexedEntry, KmsObject, Label, Policy } from "cloudproof_js";
import { StateCreator, create } from "zustand";
import { Employee, employees } from "../utils/covercryptConfig";
import { MenuItem, navigationConfig } from "../utils/navigationConfig";
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
  steps: MenuItem[];
  setSteps: (newSteps: MenuItem[]) => void;
}
const createStepSlice: StateCreator<StepSlice, [], [], StepSlice> = (set) => ({
  steps: navigationConfig as MenuItem[],
  setSteps: (newSteps: MenuItem[]) => set(() => ({ steps: newSteps })),
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
interface CovercryptSlice {
  clearEmployees: Employee[];
  covercryptServiceSetup: boolean;
  policy: Policy | undefined;
  keyPair: KeysUid | undefined;
  encryptedEmployees: EncryptedResult[] | undefined;
  decryptionKeyUid: string | undefined;
  decryptedEmployees: Employee[] | undefined;
  setCovercryptServiceSetup: () => void;
  setPolicy: (policy: Policy) => void;
  setKeyPair: (keyPair?: KeysUid) => void;
  setEncryptedEmployees: (encryptedEmployees?: EncryptedResult[]) => void;
  setDecryptionKeyUid: (decryptionKeyUid?: string) => void;
  setDecryptedEmployees: (decryptedEmployees?: Employee[]) => void;
}
const createCovercryptSlice: StateCreator<CovercryptSlice, [], [], CovercryptSlice> = (set) => ({
  clearEmployees: employees,
  covercryptServiceSetup: false,
  policy: undefined,
  keyPair: undefined,
  encryptedEmployees: undefined,
  decryptionKeyUid: undefined,
  decryptedEmployees: undefined,
  setCovercryptServiceSetup: () => set(() => ({ covercryptServiceSetup: true })),
  setPolicy: (policy: Policy) =>
    set((state) => {
      state.setKeyPair(); // reset next steps
      return { policy };
    }),
  setKeyPair: (keyPair?: KeysUid) =>
    set((state) => {
      state.setEncryptedEmployees(); // reset next steps
      return { keyPair };
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
});

// FINDEX
interface FindexSlice {
  findexServiceSetup: boolean;
  findexKey: FindexKey | undefined;
  label: Label | undefined;
  callbacks: FindexCallbacks | undefined;
  indexedEntries: IndexedEntry[] | undefined;
  resultEmployees: Employee[] | undefined;
  setFindexServiceSetup: () => void;
  setFindexKey: (findexKey: FindexKey) => void;
  setLabel: (label?: Label) => void;
  setCallbacks: (callbacks?: FindexCallbacks) => void;
  setIndexedEntries: (indexedEntries?: IndexedEntry[]) => void;
  setResultEmployees: (resultEmployees?: Employee[]) => void;
}
const createFindexSlice: StateCreator<FindexSlice, [], [], FindexSlice> = (set) => ({
  findexServiceSetup: false,
  findexKey: undefined,
  label: undefined,
  callbacks: undefined,
  indexedEntries: undefined,
  resultEmployees: undefined,
  setFindexServiceSetup: () => set(() => ({ findexServiceSetup: true })),
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
});

// PKI
interface PkiSlice {
  pkiServiceSetup: boolean;
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
  setPkiServiceSetup: () => void;
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
const createPkiSlice: StateCreator<PkiSlice, [], [], PkiSlice> = (set) => ({
  pkiServiceSetup: false,
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
  setPkiServiceSetup: () => set(() => ({ pkiServiceSetup: true })),
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
});

// BOUND STORE
export const useBoundStore = create<LanguageSlice & StepSlice & TokenSlice & CovercryptSlice & FindexSlice & PkiSlice>((...a) => ({
  ...createLanguageSlice(...a),
  ...createStepSlice(...a),
  ...createTokenSlice(...a),
  ...createCovercryptSlice(...a),
  ...createFindexSlice(...a),
  ...createPkiSlice(...a),
}));

// TYPES
type WrappedKey = { certBytes: Uint8Array; privateKeyBytes: Uint8Array };
