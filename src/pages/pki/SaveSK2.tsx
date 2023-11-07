import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { uploadPemInPKI } from "../../actions/javascript/uploadPemInPKI";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { ClientTwo } from "../../component/Tags";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, usePkiStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const SaveSK2 = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("uploadPemInPKI", activeLanguageList);
  // states
  const { wrappedPk2, wrappedPkCertUid, savedSk2, setSavedSk2, setPublishedWrappedPkUid } = usePkiStore((state) => state);
  const { kmsTwoToken, steps, setSteps } = useBoundStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const saveSecretKeyAndPublishCertificate = async (): Promise<void> => {
    try {
      if (kmsTwoToken && wrappedPk2) {
        const savedSk2Uid = await uploadPemInPKI(kmsTwoToken, uuidv4(), wrappedPk2.privateKeyBytes);
        setSavedSk2(savedSk2Uid);
        const wrappedPkCertUid = await uploadPemInPKI(kmsTwoToken, uuidv4(), wrappedPk2.certBytes);
        setPublishedWrappedPkUid(wrappedPkCertUid);
        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
    }
  };

  if (loadingCode) return <Spinner fullcontent />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <ul>
          <li>
            <ClientTwo /> saves its secret key sk_2 in his own KMS <b>KMS 2</b>
          </li>
          <li>
            <ClientTwo /> publishes its public key pk_2 wrapped in a certificate in <b>Cosmian KMS</b>
          </li>
        </ul>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={kmsTwoToken && wrappedPk2 ? saveSecretKeyAndPublishCertificate : undefined}
          codeOutputList={
            wrappedPkCertUid && savedSk2
              ? {
                  javascript: `${JSON.stringify(savedSk2, undefined, 2)}  
${JSON.stringify(wrappedPkCertUid, undefined, 2)}`,
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default SaveSK2;
