def search_words(findex: Findex, keywords: List[str]):
    """Search words"""
    results = findex.search(keywords)
    return results
