import sqlite3

from cloudproof_findex import Label, MasterKey
from findex_db import FindexSQLite


def search_words(master_key: MasterKey, label: Label, keywords_to_search: List[str]):
    conn = sqlite3.connect(":memory:")
    findex_interface = FindexSQLite(conn)
    
    """Upsert data in indexes"""
    results = findex_interface.findex_interface.search(
        master_key, label, keywords_to_search
    )
    return results
