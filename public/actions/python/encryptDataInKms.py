async def encryptDataInKms(kmsServerUrl: string, apiKey: string, public_key_uid: string, plaintext: string, policy: string):
  """Encrypt data in KMS"""
  kms_client = KmsClient(server_url=kmsServerUrl, api_key=apiKey)
  ciphertext = await kms_client.cover_crypt_encryption(
    policy,
    plaintext,
    public_key_uid,
  )
