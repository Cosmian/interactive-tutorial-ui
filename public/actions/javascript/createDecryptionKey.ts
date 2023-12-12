import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

//
// Create Decryption Key
//
export const createDecryptionKey = async (
  kmsToken: string,
  masterSecretKeyUId: string,
  decryptionAccessPolicy: string,
  tags: string[] | undefined = undefined
): Promise<string> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);

  const decryptionKeyUId = await client.createCoverCryptUserDecryptionKey(decryptionAccessPolicy, masterSecretKeyUId, tags);
  return decryptionKeyUId;
};
