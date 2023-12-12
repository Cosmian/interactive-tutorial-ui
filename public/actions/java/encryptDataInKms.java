//
// Encrypt data in KMS
//
public static void encryptDataInKms(String kmsServerUrl, String apiKey, String publicMasterKeyUniqueIdentifier, String plaintext, Policy policy) {
  KmsClient kmsClient = new KmsClient(kmsServerUrl, apiKey);
  byte[] ciphertext = kmsClient.coverCryptEncrypt(publicMasterKeyUniqueIdentifier, plaintext.getBytes(StandardCharsets.UTF_8), policy);
}
