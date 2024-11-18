
from typing import List
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding


def encrypt_database(clear_database: List[dict]) -> List[EmployeeBytes]:
    key = b'\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f '
    nonce = b'\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10'

    def encrypt_field(field: str) -> bytes:
        padder = padding.PKCS7(algorithms.AES.block_size).padder()
        plaintext = field.encode()
        padded_plaintext = padder.update(plaintext) + padder.finalize()
        cipher = Cipher(algorithms.AES(key), modes.CBC(nonce))
        encryptor = cipher.encryptor()
        return encryptor.update(padded_plaintext) + encryptor.finalize()

    return [
        EmployeeBytes(
            encrypt_field(str(uuid.uuid4().bytes)),
            encrypt_field(emp["first"]),
            encrypt_field(emp["last"]), 
            encrypt_field(emp["email"]),
            encrypt_field(emp["country"]),
            encrypt_field(str(emp["salary"]))
        )
        for emp in clear_database
    ]