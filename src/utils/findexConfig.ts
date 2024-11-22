import { Employee } from "./covercryptConfig";

// in the findex workflow we need to have the country as a string because it will be encrypted
// using this new type to avoid breaking changes (OCP)
export type findexClearEmployeesDatabase = Required<Omit<Employee, "country"> & { country: string }>;

export type encryptedEmployeesDatabase = {
  uuid: number;
  first: Uint8Array;
  last: Uint8Array;
  country: Uint8Array;
  email: Uint8Array;
  salary: Uint8Array;
};
