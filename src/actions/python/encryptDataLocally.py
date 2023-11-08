def encryptDataLocally(
    public_key: string, plaintext: string, policy: string, encryption_policy: string
):
    """Encrypt data locally"""
    cover_crypt = CoverCrypt()
    ciphertext = cover_crypt.encrypt(
        policy,
        encryption_policy,
        public_key,
        plaintext,
    )
    return ciphertext
