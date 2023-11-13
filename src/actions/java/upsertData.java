import com.cosmian.jna.findex.Findex;
//
// Index your data
//
public static Map<Keyword, Set<Location>> upsertData(byte[] key, byte[] label, Map<IndexedValue, Set<Keyword>> indexedValuesAndWords, Database db) {
  return Findex.upsert(key, label, indexedValuesAndWords, db)
}
