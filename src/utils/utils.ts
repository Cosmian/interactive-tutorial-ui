import { encryptedEmployeesDatabase, findexClearEmployeesDatabase } from "./findexConfig";

export const convertString = (data: string): Uint8Array => {
  const bianryString = atob(data);
  const uint8Array = new Uint8Array(bianryString.length);
  for (let i = 0; i < bianryString.length; i++) {
    uint8Array[i] = bianryString.charCodeAt(i);
  }
  return uint8Array;
};

export const byteEmployeeToString = (employee: encryptedEmployeesDatabase): findexClearEmployeesDatabase => {
  const textDecoder = new TextDecoder();
  return {
    ...employee,
    first: textDecoder.decode(employee.first),
    last: textDecoder.decode(employee.last),
    country: textDecoder.decode(employee.country),
    email: textDecoder.decode(employee.email),
    salary: textDecoder.decode(employee.salary),
  };
};
