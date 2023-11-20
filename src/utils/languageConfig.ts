import { Language } from "./types";

export const allLanguageList: Language[] = ["java", "javascript", "python"];

export const getLanguageExtension = (language: Language): string => {
  switch (language) {
    case "javascript":
      return ".ts";
    case "java":
      return ".java";
    case "python":
      return ".py";
    default:
      throw new Error("Not existing language");
  }
};
