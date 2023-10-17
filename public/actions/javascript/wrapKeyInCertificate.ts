import { NIST_P256_CERTIFICATE, NIST_P256_PRIVATE_KEY } from "../utils/certificates";

export const wrapKeyInCertificate = (): {
  certBytes: Uint8Array;
  privateKeyBytes: Uint8Array;
} => {
  const encoder = new TextEncoder();
  const certBytes = encoder.encode(NIST_P256_CERTIFICATE);
  const privateKeyBytes = encoder.encode(NIST_P256_PRIVATE_KEY);
  return {
    certBytes,
    privateKeyBytes,
  };
};
