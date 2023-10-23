import { FindexKey, KmsObject, Label, Policy } from "cloudproof_js";
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

// FINDEX
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

// PKI
interface PkiSlice {
  encryptedEmployeesPki: EncryptedResult[] | undefined;
  clearEmployeesPki: Employee[] | undefined;
  clientOneUdkUid: string | undefined;
  wrappedPk2: WrappedKey | undefined;
  savedSk2: string | undefined;
  wrappedPkCertUid: string | undefined;
  accessGranted: boolean;
  certificate: KmsObject | undefined;
  certificateUid: string | undefined;
  wrappedUdk: KmsObject | undefined;
  wrappedUdkUid: string | undefined;
  wrappedUdk2: KmsObject | undefined;
  unwrappedUdkUid: string | undefined;
  setEncryptedEmployeesPki: (encryptedEmployees: EncryptedResult[]) => void;
  setClearEmployeesPki: (clearEmployeesPki: Employee[]) => void;
  setClientOneUdkUid: (uid: string) => void;
  setWrappedPk2: (wrappedKey: WrappedKey) => void;
  setSavedSk2: (savedSk2: string) => void;
  setPublishedWrappedPkUid: (wrappedPkCertUid: string) => void;
  setAccessGranted: () => void;
  setCertificateUid: (certificateUid: string) => void;
  setWrappedUdk: (wrappedUdk: KmsObject) => void;
  setWrappedUdkUid: (wrappedUdkUid: string) => void;
  setWrappedUdk2: (wrappedUdk2: KmsObject) => void;
  setUnwrappedUdkUid: (unwrappedUdkUid: string) => void;
}
const createPkiSlice: StateCreator<PkiSlice, [], [], PkiSlice> = (set) => ({
  encryptedEmployeesPki: undefined,
  clearEmployeesPki: undefined,
  clientOneUdkUid: undefined,
  wrappedPk2: undefined,
  savedSk2: undefined,
  wrappedPkCertUid: undefined,
  certificate: undefined,
  accessGranted: false,
  certificateUid: undefined,
  wrappedUdk: undefined,
  wrappedUdkUid: undefined,
  wrappedUdk2: undefined,
  unwrappedUdkUid: undefined,
  setEncryptedEmployeesPki: (encryptedEmployeesPki: EncryptedResult[]) => set(() => ({ encryptedEmployeesPki })),
  setClearEmployeesPki: (clearEmployeesPki: Employee[]) => set(() => ({ clearEmployeesPki })),
  setClientOneUdkUid: (clientOneUdkUid: string) => set(() => ({ clientOneUdkUid })),
  setWrappedPk2: (wrappedPk2: WrappedKey) => set(() => ({ wrappedPk2 })),
  setSavedSk2: (savedSk2: string) => set(() => ({ savedSk2 })),
  setPublishedWrappedPkUid: (wrappedPkCertUid: string) => set(() => ({ wrappedPkCertUid })),
  setAccessGranted: () => set(() => ({ accessGranted: true })),
  setCertificateUid: (certificateUid: string) => set(() => ({ certificateUid })),
  setWrappedUdk: (wrappedUdk: KmsObject) => set(() => ({ wrappedUdk })),
  setWrappedUdk2: (wrappedUdk2: KmsObject) => set(() => ({ wrappedUdk2 })),
  setWrappedUdkUid: (wrappedUdkUid: string) => set(() => ({ wrappedUdkUid })),
  setUnwrappedUdkUid: (unwrappedUdkUid: string) => set(() => ({ unwrappedUdkUid })),
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
