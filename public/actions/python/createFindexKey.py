from cloudproof_py.findex import MasterKey


def create_findex_key():
    """Create Findex Key"""
    return MasterKey.random()
