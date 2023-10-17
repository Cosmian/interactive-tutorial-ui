//
// Decrypt data in KMS
//
public static void decryptDataInKms(String kmsServerUrl, String apiKey, String userDecryptionKey, String ciphertext) {
  KmsClient kmsClient = new KmsClient(kmsServerUrl, apiKey);
  String plaintext = new String(
    kmsClient.coverCryptDecrypt(userDecryptionKey, ciphertext)
    .getPlaintext(),
  StandardCharsets.UTF_8);
}
