import sqlite3

from cloudproof_findex import IndexedValuesAndKeywords, Label, MasterKey
from findex_db import FindexSQLite


def upsert_data(master_key: MasterKey, label: Label,  indexed_values_and_keywords: IndexedValuesAndKeywords,):
    conn = sqlite3.connect(":memory:")
    findex_interface = FindexSQLite(conn)
    
    """Upsert data in indexes"""
    findex_interface.upsert(master_key, label, indexed_values_and_keywords, {})
