import { FetchEntries, Findex, FindexKey, IndexedValue, InsertChains, Keyword, Label, Location, UpsertEntries } from "cloudproof_js";

interface IndexedEntry {
  indexedValue: IndexedValue | Location | Keyword;
  keywords: Set<Keyword> | Keyword[] | string[];
}

//
// Index your data
//
export const upsertData = async (
  masterKey: FindexKey,
  label: Label,
  indexedEntries: IndexedEntry[],
  fetchEntries: FetchEntries,
  upsertEntries: UpsertEntries,
  insertChains: InsertChains
): Promise<void> => {
  const { upsert } = await Findex();

  await upsert(masterKey, label, indexedEntries, [], fetchEntries, upsertEntries, insertChains);
};
