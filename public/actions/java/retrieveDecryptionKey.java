//
// Retrieve Decryption Key
//
public static void retrieveDecryptionKey(String kmsServerUrl, String apiKey, String userDecryptionKeyUniqueIdentifier) {
  KmsClient kmsClient = new KmsClient(kmsServerUrl, apiKey);
  PrivateKey decryptionKey = client.retrieveCoverCryptUserDecryptionKey(userDecryptionKeyUniqueIdentifier);
  return decryptionKey;
};
