import { useEffect, useState } from "react";
import { getLanguageExtension } from "../utils/languageConfig";
import { CodeContent, Language } from "../utils/types";

export const useFetchCodeContent = (
  filename: string,
  activeLanguageList: Language[]
): { loadingCode: boolean; codeContent: CodeContent } => {
  const [loadingCode, setLoadingcode] = useState(true);
  const [codeContent, setCodeContent] = useState<CodeContent>({
    java: undefined,
    javascript: undefined,
    python: undefined,
  });

  useEffect(() => {
    getTextFromFiles(filename, activeLanguageList);
  }, [filename, activeLanguageList]);

  const getTextFromFiles = async (filename: string, activeLanguageList: Language[]): Promise<void> => {
    const origin = window.location.origin;
    const tempContent = {} as CodeContent;
    for (const language of activeLanguageList) {
      const extension = getLanguageExtension(language);
      const response = await fetch(`${origin}/actions/${language}/${filename}${extension}`);
      const text = await response.text();
      tempContent[language] = text;
    }
    setCodeContent(tempContent);
    setLoadingcode(false);
  };
  return { loadingCode, codeContent };
};
