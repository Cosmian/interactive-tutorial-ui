//
// Define your callbacks
//

/**
 * Fetch the Entry Table lines for the list of given {@link Uid32}. If a line does not exist, there should be no entry in the returned map.
 *
 * @param uids the unique {@link Uid32}s used as line id
 * @return a {@link Map} of {@link Uid32} to {@link EntryTableValue}
 * @throws CloudproofException if anything goes wrong
 */

protected abstract List<Tuple<Uid32, EntryTableValue>> fetchEntries(List<Uid32> uids) throws CloudproofException;


/**
 * Fetch the Chain Table lines for the list of given {@link Uid32}. If a line does not exist, there should be no entry in the returned map.
 *
 * @param uids the unique {@link Uid32}s used as line id
 * @return a {@link Map} of {@link Uid32} to {@link ChainTableValue}
 * @throws CloudproofException if anything goes wrong
 */

protected abstract Map<Uid32, ChainTableValue> fetchChains(List<Uid32> uids) throws CloudproofException;


/**
 * Upsert the given lines into the Entry Table.
 *
 * @param uidsAndValues a {@link Map} of {@link Uid32} to {@link EntryTableValues}
 * @return a map of the {@link Uid32} that could not be updated and the current database value for the entry.
 * @throws CloudproofException if anything goes wrong
 */

protected abstract Map<Uid32, EntryTableValue> upsertEntries(Map<Uid32, EntryTableValues> uidsAndValues)
throws CloudproofException;


/**
 * Upsert the given lines into the Chain Table *
 *
 * @param uidsAndValues a {@link Map} of {@link Uid32} to {@link ChainTableValue}
 * @throws CloudproofException if anything goes wrong
 */

protected abstract void upsertChains(Map<Uid32, ChainTableValue> uidsAndValues) throws CloudproofException;
