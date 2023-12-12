import { KmsClient, KmsObject } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

export const fetchWrappedKey = async (kmsToken: string, decryptionKeyUId: string, certificateUId: string): Promise<KmsObject> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const wrappedUserDecryptionKey = await client.getWrappedKey(decryptionKeyUId, certificateUId);
  return wrappedUserDecryptionKey;
};
