//
// Create Covercrypt Key Pair
//
public static void createCoverCryptMasterKeyPair(String kmsServerUrl, String apiKey) {
  Policy policy = policy();
  KmsClient kmsClient = new KmsClient(kmsServerUrl, apiKey);
  String[] ids = kmsClient.createCoverCryptMasterKeyPair(policy);
}
