import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { uploadCertInPKI } from "../../actions/javascript/uploadCertInPKI";
import { uploadPrivateKeyInPKI } from "../../actions/javascript/uploadPrivateKeyInPKI";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { ClientTwo } from "../../component/Tags";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, usePkiStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const UploadCert = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("uploadCertInPKI", activeLanguageList);
  // states
  const { certAndPrivateKey, publishedCertUid, setSavedSk2, setPublishedCertUid } = usePkiStore((state) => state);
  const { kmsTwoToken, steps, setSteps } = useBoundStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const saveSecretKeyAndPublishCertificate = async (): Promise<void> => {
    try {
      if (kmsTwoToken && certAndPrivateKey) {
        const certUid = uuidv4();
        const savedSk2Uid = await uploadPrivateKeyInPKI(kmsTwoToken, uuidv4(), certAndPrivateKey.privateKeyBytes, certUid);
        setSavedSk2(savedSk2Uid);
        const CertUid = await uploadCertInPKI(kmsTwoToken, certUid, certAndPrivateKey.certBytes, savedSk2Uid);
        setPublishedCertUid(CertUid);
        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
    }
  };

  if (loadingCode) return <ContentSkeleton />;

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
          runCode={kmsTwoToken && certAndPrivateKey ? saveSecretKeyAndPublishCertificate : undefined}
          codeOutputList={
            publishedCertUid
              ? {
                  javascript: `${JSON.stringify(publishedCertUid, undefined, 2)}`,
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default UploadCert;
