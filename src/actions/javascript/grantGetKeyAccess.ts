import { KMIPOperations, KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

export const grantGetKeyAccess = async (kmsToken: string, uniqueIdentifier: string, userIdentifier: string): Promise<void> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  await client.grantAccess(uniqueIdentifier, userIdentifier, KMIPOperations.get);
};
