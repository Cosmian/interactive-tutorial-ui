import { message } from "antd";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { KeysUid, Language } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { rekeyAccessPolicy } from "../../actions/javascript/rekeyAction";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const RefreshKeys = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("rekeyAction", activeLanguageList);

  // states
  const { kmsToken, steps, setSteps } = useBoundStore((state) => state);
  const { rekeyPerformed, setRekeyPerformed, keyPairUids, decryptedEmployees } = useCovercryptStore((state) => state);
  const navigate = useNavigate();

  const handleRekeyOperation = async (): Promise<void> => {
    try {
      if (kmsToken && decryptedEmployees) {
        const outputKeys: string[] = await rekeyAccessPolicy(kmsToken, keyPairUids?.masterSecretKeyUId ?? ""); // as long as decryptedEmployees is not null, keyPairUids is not null
        if (outputKeys[0] !== keyPairUids?.masterSecretKeyUId && outputKeys[1] !== keyPairUids?.masterPublicKeyUId) {
          message.error("The rekey operation provided UIDs that do not correspond to the old UIDs.");
        }
        setRekeyPerformed(true);
        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  if (loadingCode) return <ContentSkeleton />;

  const stringifyKeyPairUids = (keyPairUids: KeysUid): string => {
    /**
     * This function is used to stringify the keyPairUids object
     * @returns {string} - the stringified keyPairUids object
     */
    return JSON.stringify(Object.values(keyPairUids), undefined, 2) || "";
  };

  return (
    <Split>
      <Split.Content>
        <h1>Performing a rekey action</h1>
        <p>
          The Master Authority can generate new keys for any access policy. This can be useful, in the scenario we described, if there are
          for example rumors about a key leakage in Germany without information about the department it originated from. Performing a rekey
          operation insures that future encryption of data for a given access policy cannot be decrypted with non refreshed (a.k.a rekeyed)
          keys.
          <br></br>
        </p>
        <p>
          The rekey operation is performed by using the KMS. Once the master keys are rekeyed, the KMS will also automatically rekey all
          user keys that are active (a.k.a not revoked) in the KMS.
        </p>
        <p>
          In our case, when we perform a rekey operation on the partial access policy <code>country::Germany</code>, it is actually extended
          to <code>(Department::Marketing || Department::HR) && country::Germany</code>. It is of course possible to perform a rekey with a
          more granular access policy like <code>country::Germany && Department::HR</code>.
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          codeOutputList={
            keyPairUids && rekeyPerformed
              ? {
                  java: stringifyKeyPairUids(keyPairUids),
                  javascript: stringifyKeyPairUids(keyPairUids),
                  python: stringifyKeyPairUids(keyPairUids),
                }
              : undefined
          }
          runCode={decryptedEmployees ? handleRekeyOperation : undefined}
        />
      </Split.Code>
    </Split>
  );
};

export default RefreshKeys;
