//
// Create findex key
//
public static byte[] createFindexKey(String kmsServerUrl, String apiKey) {
  byte[] key = new byte[16];
  SecureRandom sr = new SecureRandom();
  sr.nextBytes(key);
  return key;
}
