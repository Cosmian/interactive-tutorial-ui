import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { createDecryptionKey } from "../../actions/javascript/createDecryptionKey";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { ACCESS_POLICY } from "../../utils/covercryptConfig";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";
const activeLanguageList: Language[] = ["java", "javascript"];

const GenerateUDK = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("createDecryptionKey", activeLanguageList);
  // states
  const kmsToken = useBoundStore((state) => state.kmsToken);
  const keyPair = useBoundStore((state) => state.keyPair);
  const policy = useBoundStore((state) => state.policy);
  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const decryptionKeyUid = useBoundStore((state) => state.decryptionKeyUid);
  const setDecryptionKeyUid = useBoundStore((state) => state.setDecryptionKeyUid);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleGenerateUDK = async (): Promise<void> => {
    try {
      if (kmsToken && policy && keyPair) {
        const decryptionAccessPolicy = ACCESS_POLICY;
        const udk = await createDecryptionKey(kmsToken, keyPair.masterSecretKeyUId, decryptionAccessPolicy);
        setDecryptionKeyUid(udk);
        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  if (loadingCode) return <Spinner fullcontent />;

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
          <code>(country::Germany) && (department::HR)</code>.
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={keyPair && policy ? () => handleGenerateUDK() : undefined}
          codeOutputList={
            decryptionKeyUid
              ? {
                  java: JSON.stringify(decryptionKeyUid, undefined, 2),
                  javascript: JSON.stringify(decryptionKeyUid, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default GenerateUDK;
