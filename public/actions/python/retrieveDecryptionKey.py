
async def retrieveDecryptionKey(kmsServerUrl: string, apiKey: string, user_key_uid: string):
  """Retrieve key in KMS"""
  kms_client = KmsClient(server_url=kmsServerUrl, api_key=apiKey)
  user_key = await kms_client.retrieve_cover_crypt_user_decryption_key(
    user_key_uid,
  )
