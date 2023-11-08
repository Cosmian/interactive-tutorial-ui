def searchWords(master_key: MasterKey, label: Label, keywords_to_search: List[str]):
  """Upsert data in indexes"""
  findex_interface.findex_interface.search(master_key, label, keywords_to_search)
