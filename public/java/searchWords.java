import com.cosmian.jna.findex.Findex;
//
// Search a list of words
//
public static Map<Keyword, Set<Location>> searchWords(Findex findex, Set<Keyword> words) {
  return findex.search(words)
}
