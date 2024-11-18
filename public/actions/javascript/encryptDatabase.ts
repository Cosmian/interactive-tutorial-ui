import { findexDatabaseEmployee, findexDatabaseEmployeeBytes } from "../../utils/covercryptConfig";
import { AesGcm } from "cloudproof_js";

export const encryptDatabase = async (
  clearDatabase: findexDatabaseEmployee[],
  key: Uint8Array,
  nonce: Uint8Array,
  authData: Uint8Array
): Promise<findexDatabaseEmployeeBytes[]> => {
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
