export type Language = "java" | "javascript" | "python";

export type CodeContent = {
  java?: string;
  javascript?: string;
  python?: string;
};

export type PolicyAxisItem = {
  [key: string]: { name: string; isHybridized: boolean }[];
};

export type EncryptedResult = { key: number; marketing: Uint8Array; hr: Uint8Array };

export type KeysUid = {
  masterPublicKeyUId: string;
  masterSecretKeyUId: string;
};
