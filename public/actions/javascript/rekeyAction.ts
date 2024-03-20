import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";
//
// Perform a rekey operation
//
export const rekeyAccessPolicy = async (kmsToken: string, masterSecretKeyUId: string): Promise<string[]> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  return await client.rekeyCoverCryptAccessPolicy(masterSecretKeyUId, "country::Germany");
};
