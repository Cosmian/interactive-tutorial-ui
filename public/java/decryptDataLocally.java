//
// Decrypt data locally
//
public static void decryptDataLocally(byte[] userDecryptionKey, byte[] ciphertext) {
  String plaintext = CoverCrypt.decrypt(userDecryptionKey, ciphertext, Optional.of(uid));
}
