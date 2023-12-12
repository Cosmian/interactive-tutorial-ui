from cloudproof_findex import IndexedValuesAndKeywords


def add_to_index(findex: Findex, indexed_values_and_keywords: IndexedValuesAndKeywords):
    """Upsert data in indexes"""
    findex.add(indexed_values_and_keywords)
