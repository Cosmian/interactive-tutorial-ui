import { findexDatabaseEmployee, findexDatabaseEmployeeBytes } from "../../utils/covercryptConfig";
import { AesGcm } from "cloudproof_js";

export const encryptDatabase = async (
  clearDatabase: findexDatabaseEmployee[],
  key: Uint8Array,
  nonce: Uint8Array,
  authData: Uint8Array
): Promise<findexDatabaseEmployeeBytes[]> => {
  // const ciphertext = Aes256Gcm.encrypt(plaintext, key, nonce, authenticatedData);

  // const encryptField = async (field?: string | number): Promise<Uint8Array> => {
  //   if (!field) return new Uint8Array();
  //   return Aes256Gcm.encrypt(field, key, nonce, authData);
  // };

  const { Aes256Gcm } = await AesGcm();
  return Promise.all(
    clearDatabase.map(async (employee) => ({
      uuid: employee.uuid,
      first: Aes256Gcm.encrypt(employee.first ?? "", key, nonce, authData),
      last: Aes256Gcm.encrypt(employee.last ?? "", key, nonce, authData),
      email: Aes256Gcm.encrypt(employee.email ?? "", key, nonce, authData),
      country: Aes256Gcm.encrypt(employee.country ?? "", key, nonce, authData),
      salary: Aes256Gcm.encrypt(employee.salary?.toString() ?? "", key, nonce, authData),
    }))
  );
};

// byteTable.map((employee) => ({
//   uuid: employee.uuid,
//   first: new TextDecoder().decode(employee?.first),
//   last: new TextDecoder().decode(employee?.last),
//   email: new TextDecoder().decode(employee?.email),
//   country: new TextDecoder().decode(employee?.country),
//   salary: new TextDecoder().decode(employee?.salary),
// }))
