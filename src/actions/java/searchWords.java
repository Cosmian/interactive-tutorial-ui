import com.cosmian.jna.findex.Findex;
//
// Search a list of words
//
public static Map<Keyword, Set<Location>> searchWords(byte[] key, byte[] label, Set<Keyword> keywords, Database db) {
  return Findex.search(key, label, keywords, db)
}
