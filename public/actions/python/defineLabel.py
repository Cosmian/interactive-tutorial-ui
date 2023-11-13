from cloudproof_py.findex import Label


def defineLabel(label: string):
    """Define label, salting the encryption"""
    return Label.from_string(label)
