import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

//
// Perform a rekey operation
//
export const createDecryptionKey = async (
  kmsToken: string,
  masterSecretKeyUId: string,
  decryptionAccessPolicy: string,
  tags: string[] | undefined = undefined
): Promise<string> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);

  // TODO: Implement rekey operation
  const decryptionKeyUId = await client.createCoverCryptUserDecryptionKey(decryptionAccessPolicy, masterSecretKeyUId, tags);
  return decryptionKeyUId;
};
