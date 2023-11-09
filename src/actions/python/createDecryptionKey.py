from cloudproof_py.kms import KmsClient


async def create_decryption_key(kms_server_url: string, api_key: string, private_key_uid: string):
    """Create Decryption Key"""
    kms_client = KmsClient(server_url=kms_server_url, api_key=api_key)
    user_key_uid = await kms_client.create_cover_crypt_user_decryption_key(
        "(country::Germany) && (department::Marketing)",
        private_key_uid,
    )
    return user_key_uid
