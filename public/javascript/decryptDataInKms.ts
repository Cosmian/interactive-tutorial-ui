import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

//
// Decrypt data in KMS
//
export const decryptDataInKms = async (encryptText: Uint8Array, kmsToken: string, decryptionKeyUid: string): Promise<string> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const decryptedData = await client.coverCryptDecrypt(decryptionKeyUid, encryptText);
  return new TextDecoder().decode(decryptedData.plaintext);
};

export const bulkDecryptInKms = async (encryptData: Uint8Array[], kmsToken: string, decryptionKey: string): Promise<string[]> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const decryptedData = await client.coverCryptBulkDecrypt(decryptionKey, encryptData);
  return decryptedData.plaintext.map((bits) => new TextDecoder().decode(bits));
};
