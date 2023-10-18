import { createCovercryptKeyPair } from "../../actions/javascript/createCovercryptKeyPair";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const CreateMasterKeyPair = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("createCovercryptKeyPair", activeLanguageList);
  // states
  const kmsToken = useBoundStore((state) => state.kmsToken);
  const keyPair = useBoundStore((state) => state.keyPair);
  const policy = useBoundStore((state) => state.policy);
  const setSteps = useBoundStore((state) => state.setSteps);
  const setKeyPair = useBoundStore((state) => state.setKeyPair);
  const steps = useBoundStore((state) => state.steps);

  const handleCreateMasterKeyPair = async (): Promise<void> => {
    try {
      if (policy && kmsToken) {
        setKeyPair(await createCovercryptKeyPair(kmsToken, policy));
        updateNavigationSteps(steps, setSteps);
      }
    } catch (error) {
      // TODO: create toast
    }
  };

  return (
    <Split>
      <Split.Content>
        <h1>Generating the master key pair</h1>
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
        {!loadingCode && (
          <Code
            activeLanguageList={activeLanguageList}
            codeInputList={codeList}
            runCode={policy ? () => handleCreateMasterKeyPair() : undefined}
            codeOutputList={
              keyPair
                ? {
                    java: JSON.stringify(keyPair, undefined, 2),
                    javascript: JSON.stringify(keyPair, undefined, 2),
                    python: JSON.stringify(keyPair, undefined, 2),
                    flutter: JSON.stringify(keyPair, undefined, 2),
                    cpp: JSON.stringify(keyPair, undefined, 2),
                  }
                : undefined
            }
          />
        )}
      </Split.Code>
    </Split>
  );
};

export default CreateMasterKeyPair;
