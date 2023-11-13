import { FindexKey } from "cloudproof_js";

//
// Create findex key
//
export const createFindexKey = (): FindexKey => {
  return new FindexKey(Uint8Array.from(Array(16).keys()));
};
