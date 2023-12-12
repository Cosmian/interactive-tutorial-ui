import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

export const uploadPrivateKeyInPKI = async (
  kmsToken: string,
  uniqueIdentifier: string,
  bytes: Uint8Array,
  certUid: string
): Promise<string> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const uid = await client.importPrivateKey(uniqueIdentifier, bytes, [], true, { certificateIdentifier: certUid });
  return uid;
};
