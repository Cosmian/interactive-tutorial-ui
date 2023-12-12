import { toByteArray } from "base64-js";
import { Findex, inMemoryDbInterfaceExample } from "cloudproof_js";

//
// Instantiate Findex
//
export const instantiateFindex = async (): Promise<Findex> => {
  // Findex key
  const key = toByteArray("6hb1TznoNQFvCWisGWajkA==");

  // Public label.
  const label = "hello, world!";

  const { entryInterface, chainInterface } = await inMemoryDbInterfaceExample();
  const findex = new Findex(key, label);
  await findex.instantiateCustomInterface(entryInterface, chainInterface);
  return findex;
};
