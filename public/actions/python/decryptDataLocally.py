
from cloudproof_py.cover_crypt import CoverCrypt


def decrypt_data_locally(user_key: string, ciphertext: string):
    """Decrypt data locally"""
    cover_crypt = CoverCrypt()
    plaintext = cover_crypt.decrypt(user_key,ciphertext)
    return plaintext
