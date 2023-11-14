import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

//
// Get KMS version
//
export const getKmsVersion = async (kmsToken: string): Promise<string> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const version = await client.version();
  return version.text();
};
