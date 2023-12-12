import { KmsClient } from "cloudproof_kms_js";
import { BACKEND_URL } from "./backendConfig";

//
// Create Symmetric Key
//
export const createSymmetricKey = async (kmsToken: string, tags: string[] | undefined = undefined): Promise<string> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  return await client.createSymmetricKey(undefined, undefined, undefined, tags);
};
