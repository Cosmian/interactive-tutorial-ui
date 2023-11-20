import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { createDecryptionKey } from "../../actions/javascript/createDecryptionKey";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore } from "../../store/store";
import { ACCESS_POLICY } from "../../utils/covercryptConfig";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";
const activeLanguageList: Language[] = ["java", "javascript", "python"];

const GenerateUDK = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("createDecryptionKey", activeLanguageList);
  // states
  const { policy, keyPairUids, encryptedEmployees, decryptionKeyUid, setDecryptionKeyUid } = useCovercryptStore((state) => state);
  const { kmsToken, steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleGenerateUDK = async (): Promise<void> => {
    try {
      if (kmsToken && policy && keyPairUids) {
        const decryptionAccessPolicy = ACCESS_POLICY;
        const udk = await createDecryptionKey(kmsToken, keyPairUids.masterSecretKeyUId, decryptionAccessPolicy);
        setDecryptionKeyUid(udk);
        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  if (loadingCode) return <ContentSkeleton />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          A User Decryption Key is issued from the Master Private Key and for a given access Policy that will determine its rights to
          decrypt some of the ciphertexts. User decryption keys have a unique fingerprint: two keys with the same policy will have a
          different value, so they can easily be traced in case of leakage. They are anonymous too: there is no way to determine what they
          will decrypt, by simply looking at the key.
        </p>
        <p>
          In this example we will generate a User Decryption Key with the following given access policy:{" "}
          <code>(country::Germany) && (department::Marketing)</code>.
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={encryptedEmployees ? () => handleGenerateUDK() : undefined}
          codeOutputList={
            decryptionKeyUid
              ? {
                  java: JSON.stringify(decryptionKeyUid, undefined, 2),
                  javascript: JSON.stringify(decryptionKeyUid, undefined, 2),
                  python: JSON.stringify(decryptionKeyUid, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default GenerateUDK;
