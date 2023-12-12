import { KmsClient } from "cloudproof_js";
import { BACKEND_URL } from "./backendConfig";

//
// Encrypt data in KMS
//
export const encryptDataInKms = async (
  clearData: string,
  kmsToken: string,
  accessPolicy: string,
  masterPublicKeyUid: string
): Promise<Uint8Array> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const data = new TextEncoder().encode(clearData);
  const encryptedData = await client.coverCryptEncrypt(masterPublicKeyUid, accessPolicy, data);
  return encryptedData;
};

export const bulkEncryptInKms = async (
  clearData: string[],
  kmsToken: string,
  accessPolicy: string,
  mpkID: string
): Promise<Uint8Array[]> => {
  const client = new KmsClient(BACKEND_URL, kmsToken);
  const data = clearData.map((clear) => new TextEncoder().encode(clear));
  const response = await client.coverCryptBulkEncrypt(mpkID, accessPolicy, data);
  return response;
};
