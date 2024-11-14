import { findexDatabaseEmployeeBytes, findexDatabaseEmployee } from "./covercryptConfig";

export const convertString = (data: string): Uint8Array => {
  const bianryString = atob(data);
  const uint8Array = new Uint8Array(bianryString.length);
  for (let i = 0; i < bianryString.length; i++) {
    uint8Array[i] = bianryString.charCodeAt(i);
  }
  return uint8Array;
};

export const byteEmployeeToString = (employee: findexDatabaseEmployeeBytes): findexDatabaseEmployee => {
  const textDecoder = new TextDecoder();
  return {
    ...employee,
    first: employee.first ? textDecoder.decode(employee.first) : undefined,
    last: employee.last ? textDecoder.decode(employee.last) : undefined,
    country: employee.country ? textDecoder.decode(employee.country) : undefined,
    email: employee.email ? textDecoder.decode(employee.email) : undefined,
    salary: employee.salary ? textDecoder.decode(employee.salary) : undefined,
  };
};
