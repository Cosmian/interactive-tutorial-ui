import { createCovercryptKeyPair } from "../../actions/javascript/createCovercryptKeyPair";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const CreateMasterKeyPair: React.FC = () => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("createCovercryptKeyPair", activeLanguageList);
  // states
  const keyPair = useBoundStore((state) => state.keyPair);
  const policy = useBoundStore((state) => state.policy);
  const updateSteps = useBoundStore((state) => state.updateSteps);
  const setKeyPair = useBoundStore((state) => state.setKeyPair);
  const steps = useBoundStore((state) => state.steps);

  const handleCreateMasterKeyPair = async (): Promise<void> => {
    try {
      if (policy) {
        setKeyPair(await createCovercryptKeyPair("coucou", policy));
        updateNavigationSteps(steps, updateSteps);
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
            codeOutputList={{
              java: "result", // TODO too long to be displayed (component crashing)
              javascript: "result",
              python: "result",
              flutter: "result",
              cpp: "result",
            }}
          />
        )}
      </Split.Code>
    </Split>
  );
};

export default CreateMasterKeyPair;
