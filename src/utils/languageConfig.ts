import { Language } from "./types";

export const allLanguageList: Language[] = ["java", "javascript", "python", "flutter", "cpp"];

export const getLanguageExtension = (language: Language): string => {
  switch (language) {
    case "javascript":
      return ".ts";
    case "java":
      return ".java";
    case "python":
      return ".py";
    case "cpp":
      return ".cpp";
    case "flutter":
      return ".dart";
    default:
      throw new Error("Not existing language");
  }
};
