import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { uploadKeyInPKI } from "../../actions/javascript/uploadKeyInPKI";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { ClientTwo } from "../../component/Tags";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const ImportAndUnwrapUDK = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("uploadKeyInPKI", activeLanguageList);
  // states
  const kmsToken = useBoundStore((state) => state.kmsToken);
  const kmsTwoToken = useBoundStore((state) => state.kmsTwoToken);
  const setUnwrappedUdkUid = useBoundStore((state) => state.setUnwrappedUdkUid);
  const wrappedUdk2 = useBoundStore((state) => state.wrappedUdk2);
  const unwrappedUdkUid = useBoundStore((state) => state.unwrappedUdkUid);
  const wrappedPkCertUid = useBoundStore((state) => state.wrappedPkCertUid);
  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const navigate = useNavigate();

  const importAndUnwrapUDK = async (): Promise<void> => {
    try {
      if (kmsToken && wrappedUdk2 && wrappedPkCertUid) {
        const uid = await uploadKeyInPKI(kmsTwoToken, uuidv4(), wrappedUdk2, true, wrappedPkCertUid);
        setUnwrappedUdkUid(uid);

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
        <h1>Importing and unwrapping Decryption Key</h1>
        <p>
          <ClientTwo /> imports and unwraps the decryption key <code>Wrap(sk_a)</code> in his KMS (<b>KMS 2</b>).
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={kmsToken && wrappedUdk2 && wrappedPkCertUid ? importAndUnwrapUDK : undefined}
          codeOutputList={
            unwrappedUdkUid
              ? {
                  javascript: JSON.stringify(unwrappedUdkUid, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default ImportAndUnwrapUDK;
