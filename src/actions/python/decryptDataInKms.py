from cloudproof_py.kms import KmsClient


async def decrypt_data_in_kms(kms_server_url: string, api_key: string, user_key_uid: string, ciphertext: string):
    """Decrypt data in KMS"""
    kms_client = KmsClient(server_url=kms_server_url, api_key=api_key)
    plaintext, _ = await kms_client.cover_crypt_decryption(ciphertext, user_key_uid)
    return plaintext
