
def decryptDataLocally(user_key: string, ciphertext: string):
  """Decrypt data locally"""
  cover_crypt = CoverCrypt()
  ciphertext = cover_crypt.decrypt(
    user_key,
    ciphertext,
  )
