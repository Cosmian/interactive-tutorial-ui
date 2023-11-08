async def createCoverCryptMasterKeyPair(kmsServerUrl: string, apiKey: string, policy):
  """Create Master Key Pair"""
  kms_client = KmsClient(server_url=kmsServerUrl, api_key=apiKey)
  (
    public_key_uid,
    private_key_uid,
  ) = await kms_client.create_cover_crypt_master_key_pair(policy)
