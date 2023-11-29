import com.cosmian.jna.findex.Findex;
//
// Index your data
//
public static Map<Keyword, Set<Location>> addToIndex(Findex findex, Map<IndexedValue, Set<Keyword>> indexedValuesAndWords) {
  return findex.add(indexedValuesAndWords)
}
