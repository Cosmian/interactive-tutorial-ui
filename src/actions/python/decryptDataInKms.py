async def decryptDataInKms(
    kmsServerUrl: string, apiKey: string, user_key_uid: string, ciphertext: string
):
    """Decrypt data in KMS"""
    kms_client = KmsClient(server_url=kmsServerUrl, api_key=apiKey)
    plaintext, _ = await kms_client.cover_crypt_decryption(ciphertext, user_key_uid)
    return plaintext
