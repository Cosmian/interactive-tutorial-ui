import { CoverCrypt, Policy } from "cloudproof_js";

//
// Encrypt data locally
//
export const encryptDataLocally = async (
  publicKey: Uint8Array,
  policy: Policy,
  accessPolicy: string,
  clearData: Uint8Array
): Promise<Uint8Array> => {
  const { CoverCryptHybridEncryption } = await CoverCrypt();
  const encryption = new CoverCryptHybridEncryption(policy, publicKey);
  return encryption.encrypt(accessPolicy, clearData);
};
