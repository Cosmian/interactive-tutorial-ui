//
// Search a list of words

import { Findex, SearchResults } from "cloudproof_js";

//
export const searchWords = async (findex: Findex, words: string[]): Promise<number[]> => {
  const results: SearchResults = await findex.search(words);
  return results.toNumbers();
};
