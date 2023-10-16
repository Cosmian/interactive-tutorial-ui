import { useBoundStore } from "../store/store";
import { languageList } from "../utils/languageConfig";
import { Language } from "../utils/types";

type LanguageTabsProps = {
  dactivatedLanguageList?: Language[];
};

const LanguageTabs: React.FC<LanguageTabsProps> = ({ dactivatedLanguageList }) => {
  const changeLanguage = useBoundStore((state) => state.changeLanguage);
  const language = useBoundStore((state) => state.language);

  const handleChangeLanguage = (language: Language, disabled?: boolean) => {
    if (!disabled) changeLanguage(language);
  };

  return (
    <div className="language-tabs">
      <ul role="tablist">
        {languageList.map((languageItem) => {
          const classNames = [];
          const disabled = dactivatedLanguageList?.find((el) => el == languageItem) != null;
          if (disabled) classNames.push("disabled");
          if (language === languageItem) classNames.push("selected");
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
