from cloudproof_py.kms import KmsClient


async def create_covercrypt_master_key_pair(kms_server_url: string, api_key: string, policy):
    """Create Master Key Pair"""
    kms_client = KmsClient(server_url=kms_server_url, api_key=api_key)
    (
        public_key_uid,
        private_key_uid,
    ) = await kms_client.create_cover_crypt_master_key_pair(policy)
