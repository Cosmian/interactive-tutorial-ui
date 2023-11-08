from cloudproof_py.findex import MasterKey


def createFindexKey():
    """Create Findex Key"""
    return MasterKey.random()
