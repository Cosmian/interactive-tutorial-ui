def search_words(keywords: List[str]):
    """Search words"""
    results = findex.search(keywords)
    return results
