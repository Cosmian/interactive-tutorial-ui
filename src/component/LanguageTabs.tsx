import { useBoundStore } from "../store/store";
import { allLanguageList } from "../utils/languageConfig";
import { Language } from "../utils/types";

type LanguageTabsProps = {
  activeLanguageList: Language[];
};

const LanguageTabs: React.FC<LanguageTabsProps> = ({ activeLanguageList }) => {
  const changeLanguage = useBoundStore((state) => state.changeLanguage);
  const language = useBoundStore((state) => state.language);

  const handleChangeLanguage = (language: Language, disabled?: boolean): void => {
    if (!disabled) changeLanguage(language);
  };

  return (
    <div className="language-tabs">
      <ul role="tablist">
        {allLanguageList.map((languageItem) => {
          const classNames = [];
          const disabled = activeLanguageList?.find((el) => el === languageItem) == null;
          if (disabled) classNames.push("disabled");
          if (language === languageItem) classNames.push("selected");
          const prettyLangageItem = languageItem === "cpp" ? "C++" : languageItem.charAt(0).toUpperCase() + languageItem.slice(1);
          return (
            <li key={languageItem}>
              <a
                onClick={() => handleChangeLanguage(languageItem, disabled)}
                aria-controls={languageItem}
                aria-selected={language === languageItem}
                id={`tab-${languageItem}`}
                role="tab"
                className={classNames.join(" ")}
              >
                {prettyLangageItem}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageTabs;
