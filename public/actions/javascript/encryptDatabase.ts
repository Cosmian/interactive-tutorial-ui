import { findexDatabaseEmployee, findexDatabaseEmployeeBytes } from "../../utils/covercryptConfig";
import aes from "js-crypto-aes";

export const encryptDatabase = async (clearDatabase: findexDatabaseEmployee[]): Promise<findexDatabaseEmployeeBytes[]> => {
  const key = new Uint8Array([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  ]);
  const nonce = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

  const clearEmployeeToEncByteEmployee = async (field?: string | number): Promise<Uint8Array> => {
    return await aes.encrypt(new TextEncoder().encode(field?.toString() ?? ""), key, {
      name: "AES-CBC",
      iv: nonce,
    });
  };

  return await Promise.all(
    clearDatabase.map(async (employee) => ({
      ...employee,
      first: await clearEmployeeToEncByteEmployee(employee?.first),
      last: await clearEmployeeToEncByteEmployee(employee?.last),
      email: await clearEmployeeToEncByteEmployee(employee?.email),
      country: await clearEmployeeToEncByteEmployee(employee?.country),
      salary: await clearEmployeeToEncByteEmployee(employee?.salary),
    }))
  );
};
