import { useEffect, useState } from "react";
import { getLanguageExtension } from "../utils/languageConfig";
import { CodeContent, Language } from "../utils/types";

/**
 * Custom hook to fetch code content for a given filename and active language list.
 *
 * @param {string} filename - The name of the file to fetch code content for. Must be placed like following : actions/${language}/${filename}${extension}
 * @param {Language[]} activeLanguageList - The list of active languages to fetch code content for.
 */
export const useFetchCodeContent = (
  filename: string,
  activeLanguageList: Language[]
): { loadingCode: boolean; codeContent: CodeContent } => {
  const [loadingCode, setLoadingCode] = useState(true);
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
    setLoadingCode(false);
  };
  return { loadingCode, codeContent };
};
