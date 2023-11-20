import { message } from "antd";
import { PolicyKms } from "cloudproof_js";
import { useNavigate } from "react-router-dom";
import { createCovercryptKeyPair } from "../../actions/javascript/createCovercryptKeyPair";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const CreateMasterKeyPair = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("createCovercryptKeyPair", activeLanguageList);
  // states
  const { policy, keyPairUids, setKeyPairUids } = useCovercryptStore((state) => state);
  const { kmsToken, steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleCreateMasterKeyPair = async (): Promise<void> => {
    try {
      if (policy && kmsToken) {
        const bytesPolicy: PolicyKms = new PolicyKms(policy.toBytes());
        setKeyPairUids(await createCovercryptKeyPair(kmsToken, bytesPolicy));
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
        <p>The master authority possesses the master key pair:</p>
        <ol>
          <li>
            a <em>Master Secret Key</em> which is used to generate user keys;
          </li>
          <li>
            and a <em>Public Key</em> which is used for encryption. Since it cannot decrypt, the public key can be freely distributed to
            encrypting systems.
          </li>
        </ol>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={policy ? () => handleCreateMasterKeyPair() : undefined}
          codeOutputList={
            keyPairUids
              ? {
                  java: JSON.stringify(keyPairUids, undefined, 2),
                  javascript: JSON.stringify(keyPairUids, undefined, 2),
                  python: JSON.stringify(keyPairUids, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default CreateMasterKeyPair;
