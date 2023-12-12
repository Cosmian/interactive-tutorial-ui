import aes from "js-crypto-aes";
import { convertString } from "../../utils/utils";

export const decryptWithAes = async (cipherText: string, keyBytes: Uint8Array, nonce: string): Promise<string> => {
  const decoder = new TextDecoder();
  const encryptedSummary = convertString(cipherText);
  const iv = convertString(nonce);
  const clearText = await aes.decrypt(encryptedSummary, keyBytes, { name: "AES-GCM", iv });
  return decoder.decode(clearText);
};
