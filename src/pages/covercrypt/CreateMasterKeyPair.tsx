import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { createCovercryptKeyPair } from "../../actions/javascript/createCovercryptKeyPair";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const CreateMasterKeyPair = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("createCovercryptKeyPair", activeLanguageList);
  // states
  const kmsToken = useBoundStore((state) => state.kmsToken);
  const keyPairUids = useBoundStore((state) => state.keyPairUids);
  const policy = useBoundStore((state) => state.policy);
  const setSteps = useBoundStore((state) => state.setSteps);
  const setKeyPairUids = useBoundStore((state) => state.setKeyPairUids);
  const steps = useBoundStore((state) => state.steps);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleCreateMasterKeyPair = async (): Promise<void> => {
    try {
      if (policy && kmsToken) {
        setKeyPairUids(await createCovercryptKeyPair(kmsToken, policy));
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
                  flutter: JSON.stringify(keyPairUids, undefined, 2),
                  cpp: JSON.stringify(keyPairUids, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default CreateMasterKeyPair;
