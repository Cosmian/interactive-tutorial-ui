import { KmsClient, Policy } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

//
// Create Covercrypt Key Pair
//
export type KeysUid = {
  masterPublicKeyUId: string;
  masterSecretKeyUId: string;
};

export const createCovercryptKeyPair = async (
  kmsToken: string,
  policy: Policy,
  tags: string[] | undefined = undefined
): Promise<KeysUid> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const [masterSecretKeyUId, masterPublicKeyUId] = await client.createCoverCryptMasterKeyPair(policy, tags);
  return {
    masterSecretKeyUId,
    masterPublicKeyUId,
  };
};
