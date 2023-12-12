//
// Encrypt data locally
//
public static void encryptDataLocally(String userDecryptionKey, String plaintext, Policy policy, MasterKeys masterKeys) {
    String encryptionPolicy = "department::HR && country::Germany";
    byte[] ciphertext = CoverCrypt.encrypt(policy, masterKeys.getPublicKey(), encryptionPolicy, plaintext,
    Optional.of(uid), Optional.empty());
}
