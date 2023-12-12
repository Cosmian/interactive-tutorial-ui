import aes from "js-crypto-aes";
import { MSE_APP_URL } from "./backendConfig";

export const sendEncryptedDocument = async (
  textInput: Uint8Array,
  keyBytes: Uint8Array,
  keyUid: string,
  iv: Uint8Array
): Promise<{ nonce: string; encrypted_summary: string }> => {
  const encryptedText = await aes.encrypt(textInput, keyBytes, { name: "AES-GCM", iv });

  const formData = new FormData();
  formData.append("key_id", keyUid);
  formData.append("nonce", btoa(String.fromCodePoint(...iv)));
  formData.append("encrypted_doc", new Blob([encryptedText]), "text.doc");
  const response = await fetch(`${MSE_APP_URL}/kms_summarize`, {
    method: "POST",
    body: formData,
  });
  return await response.json();
};
