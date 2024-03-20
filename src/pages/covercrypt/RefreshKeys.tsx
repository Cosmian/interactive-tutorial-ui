import { message } from "antd";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { KeysUid } from "../../utils/types";
import { activeLanguageList } from "./activeLanguages";
import { Link, useNavigate } from "react-router-dom";
import { rekeyAccessPolicy } from "../../actions/javascript/rekeyAction";

const RefreshKeys = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("rekeyAction", activeLanguageList);

  // states
  const { kmsToken, steps, setSteps } = useBoundStore((state) => state);
  const { rekeyPerformed, setRekeyPerformed, decryptionKeyUid, keyPairUids, setKeyPairUids } = useCovercryptStore((state) => state);
  const navigate = useNavigate();

  const handleRekeyOperation = async (): Promise<void> => {
    try {
      if (kmsToken) {
        const newKeys: string[] = await rekeyAccessPolicy(kmsToken, keyPairUids?.masterSecretKeyUId ?? "");
        console.log(newKeys);
        setKeyPairUids({ masterSecretKeyUId: newKeys[0], masterPublicKeyUId: newKeys[1] });
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
          It is best to perform rekeying using the KMS: the master keys will be automatically re-keyed and as long as a user key is active
          in the KMS (a.k.a not revoked), it will also be automatically re-keyed.
        </p>
        <p>
          In our case, when we perfortm a rekey operation on the partial access policy <code>country::Germany</code>, it is actually
          extended to <code>(Department::Marketing || Department::HR) && country::Germany</code>. It is of course possible to perform a
          rekey with a more granular access policy like <code>country::Germany && Department::HR</code>.
        </p>
        <p>
          Upon the successful rekey, the KMS will return the master key pair UIDs that should have been generated in the{" "}
          <Link to={"/encrypt-with-access-policies/generate-master-key-pair"}>Generate a master key pair</Link> step.
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
          runCode={decryptionKeyUid ? handleRekeyOperation : undefined}
        />
      </Split.Code>
    </Split>
  );
};

export default RefreshKeys;
