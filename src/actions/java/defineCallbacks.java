//
// Define your callbacks
//

/**
 * Fetch the Entry Table lines for the list of given {@link Uid32}. If a line does not exist, there should be no entry in the returned map.
 */

protected abstract List<Tuple<Uid32, EntryTableValue>> fetchEntries(List<Uid32> uids) throws CloudproofException;


/**
 * Fetch the Chain Table lines for the list of given {@link Uid32}. If a line does not exist, there should be no entry in the returned map.
 */

protected abstract Map<Uid32, ChainTableValue> fetchChains(List<Uid32> uids) throws CloudproofException;


/**
 * Upsert the given lines into the Entry Table.
 */

protected abstract Map<Uid32, EntryTableValue> upsertEntries(Map<Uid32, EntryTableValues> uidsAndValues)
throws CloudproofException;


/**
 * Upsert the given lines into the Chain Table *
 */

protected abstract void upsertChains(Map<Uid32, ChainTableValue> uidsAndValues) throws CloudproofException;
