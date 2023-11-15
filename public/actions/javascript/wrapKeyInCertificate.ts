import { toByteArray } from "base64-js";

import { NIST_P256_CERTIFICATE, NIST_P256_PRIVATE_KEY } from "../../utils/certificates";

export const wrapKeyInCertificate = (): {
  certBytes: Uint8Array;
  privateKeyBytes: Uint8Array;
} => {
  const certBytes = toByteArray(NIST_P256_CERTIFICATE);
  const privateKeyBytes = toByteArray(NIST_P256_PRIVATE_KEY);
  return {
    certBytes,
    privateKeyBytes,
  };
};
