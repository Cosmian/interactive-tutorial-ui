import { CoverCrypt, PrivateKey } from "cloudproof_js";

//
// Decrypt data locally
//
export const decryptDataLocally = async (encryptedData: Uint8Array, decryptionKey: Uint8Array | PrivateKey): Promise<string> => {
  const { CoverCryptHybridDecryption } = await CoverCrypt();
  const decrypter = new CoverCryptHybridDecryption(decryptionKey);
  const decryptedData = decrypter.decrypt(encryptedData);
  return new TextDecoder().decode(decryptedData.plaintext);
};
