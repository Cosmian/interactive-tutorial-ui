from cloudproof_py.kms import KmsClient


async def encrypt_data_in_kms(kms_server_url: string, api_key: string, public_key_uid: string, plaintext: string, policy: string):
    """Encrypt data in KMS"""
    kms_client = KmsClient(server_url=kms_server_url, api_key=api_key)
    ciphertext = await kms_client.cover_crypt_encryption(
        policy,
        plaintext,
        public_key_uid,
    )
    return ciphertext
