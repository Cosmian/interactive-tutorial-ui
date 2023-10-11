import { useLanguageStore } from "../store/store";
import { languageList } from "../utils/languageConfig";
import { Language } from "../utils/types";

const LanguageTabs = () => {
  const changeLanguage = useLanguageStore((state) => state.changeLanguage);
  const language = useLanguageStore((state) => state.language);

  const handleChangeLanguage = (language: Language) => {
    changeLanguage(language);
  };

  return (
    <div className="language-tabs">
      <ul role="tablist">
        {languageList.map((languageItem) => {
          return (
            <li key={languageItem}>
              <a
                onClick={() => handleChangeLanguage(languageItem)}
                aria-controls={languageItem}
                aria-selected={language === languageItem}
                href={`#${languageItem}`}
                id={`tab-${languageItem}`}
                role="tab"
                className={language === languageItem ? "selected" : ""}
              >
                {languageItem.charAt(0).toUpperCase() + languageItem.slice(1)}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageTabs;
