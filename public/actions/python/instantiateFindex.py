from cloudproof_py.findex import Findex, Key


def instantiateFindex():
    """Instantiate Findex"""
    # Findex key
    key = Key.random()

    # Public label.
    label = 'hello, world!'

    entry_backend = Backend.new()
    entry_backend.set_fetch(fetch_entry)
    entry_backend.set_insert(insert_entry)
    entry_backend.set_upsert(upsert_entry)
    entry_backend.set_delete(delete_entry)
    entry_backend.set_dump_tokens(dump_entry_tokens)

    chain_backend = Backend.new()
    chain_backend.set_fetch(fetch_chain)
    chain_backend.set_insert(insert_chain)
    chain_backend.set_delete(delete_chain)

    findex = Findex.new_with_custom_backend(key,
                                        label,
                                        entry_backend,
                                        chain_backend)
    return findex
