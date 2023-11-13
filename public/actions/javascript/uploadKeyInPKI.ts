import { KmsClient, KmsObject } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

export const uploadKeyInPKI = async (
  kmsToken: string,
  uniqueIdentifier: string,
  kmsObject: KmsObject,
  unwrap: boolean,
  encryptionKeyUniqueIdentifier?: string
): Promise<string> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const uid = await client.importKey(uniqueIdentifier, kmsObject, unwrap, encryptionKeyUniqueIdentifier, true);
  return uid;
};
