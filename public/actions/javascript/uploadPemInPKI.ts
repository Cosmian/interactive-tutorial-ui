import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

export const uploadPemInPKI = async (kmsToken: string, uniqueIdentifier: string, bytes: Uint8Array): Promise<string> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const uid = await client.importPem(uniqueIdentifier, bytes, [], true);
  return uid;
};
