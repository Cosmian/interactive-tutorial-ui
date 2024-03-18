from cloudproof_py.kms import KmsClient


async def create_decryption_key(kms_server_url: string, api_key: string, private_key_uid: string):
    """DO REKEY: Create Decryption Key"""
    kms_client = KmsClient(server_url=kms_server_url, api_key=api_key)
    await kms_client.rekey_cover_crypt_access_policy("country::Germany", private_key_uid)