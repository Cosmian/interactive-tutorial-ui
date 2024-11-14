import { findexDatabaseEmployee, findexDatabaseEmployeeBytes } from "../../utils/covercryptConfig";
import aes from "js-crypto-aes";

export const encryptDatabase = async (
  clearDatabase: findexDatabaseEmployee[],
  key: Uint8Array,
  iv: Uint8Array
): Promise<findexDatabaseEmployeeBytes[]> => {
  const encryptField = async (field?: string | number): Promise<Uint8Array> => {
    if (!field) return new Uint8Array();
    return await aes.encrypt(new TextEncoder().encode(field.toString()), key, {
      name: "AES-CBC",
      iv,
    });
  };

  return await Promise.all(
    clearDatabase.map(async (employee) => ({
      ...employee,
      first: await encryptField(employee.first),
      last: await encryptField(employee.last),
      email: await encryptField(employee.email),
      country: await encryptField(employee.country),
      salary: await encryptField(employee.salary),
    }))
  );
};
