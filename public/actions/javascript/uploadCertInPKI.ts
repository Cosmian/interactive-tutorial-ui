import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

export const uploadCertInPKI = async (
  kmsToken: string,
  uniqueIdentifier: string,
  bytes: Uint8Array,
  privateKeyUid: string
): Promise<string> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const uid = await client.importCertificate(uniqueIdentifier, bytes, [], true, { privateKeyIdentifier: privateKeyUid });
  return uid;
};
