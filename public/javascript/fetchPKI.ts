import { KmsClient, KmsObject } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

export const fetchPKI = async (kmsToken: string, uniqueIdentifier: string): Promise<KmsObject> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const kmsObject = await client.getObject(uniqueIdentifier);
  return kmsObject;
};
