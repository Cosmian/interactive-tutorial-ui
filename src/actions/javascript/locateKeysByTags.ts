import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

//
// locate Keys by Tag(s)
///
export const locateKeysByTags = async (kmsToken: string, tags: string[]): Promise<string[]> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const locatedKeysUid = await client.getUniqueIdentifiersByTags(tags);
  return locatedKeysUid;
};
