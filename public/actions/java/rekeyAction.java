//
// REKEY ACTION
//
public static void rekeyAccessPolicy(String kmsServerUrl, String apiKey, String privateMasterKeyUniqueIdentifier) {
  KmsClient kmsClient = new KmsClient(kmsServerUrl, apiKey);
  kmsClient.rekeyCoverCryptAccessPolicy(privateMasterKeyUniqueIdentifier,"Country::Germany");
}
