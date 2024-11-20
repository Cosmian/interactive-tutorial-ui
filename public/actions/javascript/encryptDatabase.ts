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
    clearDatabase.map((e) =>
      Object.keys(e)
        .filter((k) => k !== "uuid")
        .reduce(
          (acc, k) => {
            const index = k as keyof Omit<typeof e, "uuid">;
            const field = typeof e[index] === "number" ? e[index].toString() : e[index];
            return {
              ...acc,
              [index]: Aes256Gcm.encrypt(field, key, nonce, authData),
            };
          },
          { uuid: e.uuid } as findexDatabaseEmployeeBytes
        )
    )
  );
};
