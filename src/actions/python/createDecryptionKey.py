async def createDecryptionKey(
    kmsServerUrl: string, apiKey: string, private_key_uid: string
):
    """Create Decryption Key"""

    kms_client = KmsClient(server_url=kmsServerUrl, api_key=apiKey)
    user_key_uid = await kms_client.create_cover_crypt_user_decryption_key(
        "(country::Germany) && (department::Marketing)",
        private_key_uid,
    )
    return user_key_uid
