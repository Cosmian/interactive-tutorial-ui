def upsertData(master_key: MasterKey, label: Label, indexed_values_and_keywords: IndexedValuesAndKeywords):
  """Upsert data in indexes"""
  findex_interface.upsert(master_key, label, indexed_values_and_keywords, {})
