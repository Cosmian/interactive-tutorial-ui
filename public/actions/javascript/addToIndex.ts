import { Findex, IndexedEntry } from "cloudproof_js";

// interface IndexedEntry {
//   indexedValue: IndexedValue | Location | Keyword;
//   keywords: Set<Keyword> | Keyword[] | string[];
// }

//
// Index your data
//
export const addToIndex = async (findex: Findex, associations: IndexedEntry[]): Promise<void> => {
  await findex.add(associations);
};
