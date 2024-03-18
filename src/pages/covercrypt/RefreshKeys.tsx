import { message } from "antd";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { KeysUid } from "../../utils/types";
import { activeLanguageList } from "./activeLanguages";
import { Button } from "cosmian_ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RefreshKeys = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("rekeyAction", activeLanguageList);

  // states
  const [rekeyPerformed, setRekeyPerformed] = useState(false);
  const { kmsToken, steps, setSteps } = useBoundStore((state) => state);
  const { decryptionKeyUid, keyPairUids } = useCovercryptStore((state) => state);
  const navigate = useNavigate();

  const handleDecryptData = async (): Promise<void> => {
    try {
      if (kmsToken) {
        /**
         * TODO: implement me when the update is done
         */
        message.info("This feature is not yet implemented");
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
    return JSON.stringify(keyPairUids, undefined, 2) || "";
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
          In our case, when perform the rekey on Germany, the partial access policy <code>Country::Germany</code> is actually extended to{" "}
          <code>(Department::Marketing || Department::HR) && Country::France</code>. It is of course to perform a rekey with a more granular
          access policy like <code>Country::germany && Department::HR</code>.
        </p>
        <p>
          The master keys before the rekey operation are: <br></br>
          <br></br>
          <code> {111} </code>
        </p>
        <Button
          disabled={keyPairUids == null}
          onClick={() => {
            setRekeyPerformed(true);
          }}
          style={{ width: "100%", margin: "20px 0" }}
        >
          Refresh keys
        </Button>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          codeOutputList={
            keyPairUids && rekeyPerformed
              ? {
                  java: "New master keys UIDs after performing a rekey operation : \n" + stringifyKeyPairUids(keyPairUids),
                  javascript: "New master keys UIDs after performing a rekey operation : \n" + stringifyKeyPairUids(keyPairUids),
                  python: "New master keys UIDs after performing a rekey operation : \n" + stringifyKeyPairUids(keyPairUids),
                }
              : keyPairUids
              ? {
                  java: "Current master keys UIDs : \n" + stringifyKeyPairUids(keyPairUids),
                  javascript: "Current master keys UIDs : \n" + stringifyKeyPairUids(keyPairUids),
                  python: "Current master keys UIDs : \n" + stringifyKeyPairUids(keyPairUids),
                }
              : undefined
          }
          runCode={decryptionKeyUid ? handleDecryptData : undefined}
        />
      </Split.Code>
    </Split>
  );
};

export default RefreshKeys;
