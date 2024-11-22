import { AesGcm } from "cloudproof_js";
import { findexClearEmployeesDatabase, encryptedEmployeesDatabase } from "../../utils/findexConfig";

export const encryptDatabase = async (
  clearDatabase: findexClearEmployeesDatabase[],
  key: Uint8Array,
  nonce: Uint8Array,
  authData: Uint8Array
): Promise<encryptedEmployeesDatabase[]> => {
  const { Aes256Gcm } = await AesGcm();

  return Promise.all(
    clearDatabase.map((e) =>
      Object.keys(e)
        .filter((k) => k !== "uuid")
        .reduce(
          (acc, k) => {
            const index = k as keyof Omit<typeof e, "uuid">;
            return {
              ...acc,
              [index]: Aes256Gcm.encrypt(e[index].toString(), key, nonce, authData),
            };
          },
          { uuid: e.uuid } as encryptedEmployeesDatabase
        )
    )
  );
};
