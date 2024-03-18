//
// REKEY ACTION
//
// TODO: Implement createDecryptionKey
public static void createDecryptionKey(String kmsServerUrl, String apiKey, String privateMasterKeyUniqueIdentifier) {
  KmsClient kmsClient = new KmsClient(kmsServerUrl, apiKey);
  String userDecryptionKeyUniqueIdentifier = kmsClient.createCoverCryptUserDecryptionKey(
    "(country::Germany) && (department::HR)",
    privateMasterKeyUniqueIdentifier
  );
}
