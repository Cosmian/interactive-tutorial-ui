import { useEffect, useState } from "react";
import { getLanguageExtension } from "../utils/languageConfig";
import { Language, LanguageList } from "../utils/types";

export const useFetchCodeList = (filename: string, activeLanguageList: Language[]): { loadingCode: boolean; codeList: LanguageList } => {
  const [loadingCode, setLoadingcode] = useState(true);
  const [codeList, setCodeList] = useState<LanguageList>({
    java: undefined,
    javascript: undefined,
    python: undefined,
    flutter: undefined,
    cpp: undefined,
  });

  useEffect(() => {
    getTextFromFiles(filename, activeLanguageList);
  }, [filename, activeLanguageList]);

  const getTextFromFiles = async (filename: string, activeLanguageList: Language[]): Promise<void> => {
    const origin = window.location.origin;

    for (const language of activeLanguageList) {
      const extension = getLanguageExtension(language);
      const response = await fetch(`${origin}/actions/${language}/${filename}${extension}`);
      const text = await response.text();
      const codeListCopy = codeList;
      codeListCopy[language] = text;
      setCodeList(codeListCopy);
    }
    setLoadingcode(false);
  };
  return { loadingCode, codeList };
};
