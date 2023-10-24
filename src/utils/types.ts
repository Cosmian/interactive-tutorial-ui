import { FetchChains, FetchEntries, IndexedEntry, InsertChains, UpsertEntries } from "cloudproof_js";

export type Language = "cpp" | "flutter" | "java" | "javascript" | "python";

export type LanguageList = {
  java?: string;
  javascript?: string;
  python?: string;
  flutter?: string;
  cpp?: string;
};

export type PolicyAxisItem = {
  [key: string]: { name: string; isHybridized: boolean }[];
};

export type EncryptedResult = { key: number; marketing: Uint8Array; hr: Uint8Array };

export type KeysUid = {
  masterPublicKeyUId: string;
  masterSecretKeyUId: string;
};

export type FindexCallbacks = {
  fetchEntries: FetchEntries;
  fetchChains: FetchChains;
  upsertEntries: UpsertEntries;
  insertChains: InsertChains;
};

export type IndexedEntries = IndexedEntry[];
