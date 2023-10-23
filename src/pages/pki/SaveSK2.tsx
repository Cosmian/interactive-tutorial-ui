import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { uploadPemInPKI } from "../../actions/javascript/uploadPemInPKI";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { ClientTwo } from "../../component/Tags";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const SaveSK2 = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("uploadPemInPKI", activeLanguageList);
  // states
  const kmsTwoToken = useBoundStore((state) => state.kmsTwoToken);
  const setPublishedWrappedPkUid = useBoundStore((state) => state.setPublishedWrappedPkUid);
  const wrappedPk2 = useBoundStore((state) => state.wrappedPk2);
  const setSavedSk2 = useBoundStore((state) => state.setSavedSk2);
  const savedSk2 = useBoundStore((state) => state.savedSk2);
  const wrappedPkCertUid = useBoundStore((state) => state.wrappedPkCertUid);
  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const navigate = useNavigate();

  const saveSecretKeyAndPublishCertificate = async (): Promise<void> => {
    try {
      if (kmsTwoToken && wrappedPk2) {
        const savedSk2Uid = await uploadPemInPKI(kmsTwoToken, uuidv4(), wrappedPk2.privateKeyBytes);
        setSavedSk2(savedSk2Uid);
        const wrappedPkCertUid = await uploadPemInPKI(kmsTwoToken, uuidv4(), wrappedPk2.certBytes);
        setPublishedWrappedPkUid(wrappedPkCertUid);

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
        <h1>Saving Secret Key and publishing certificate</h1>
        <ul>
          <li>
            <ClientTwo /> saves its secret key sk_2 in his own KMS <b>KMS 2</b>
          </li>
          <li>
            <ClientTwo /> publishes its public key pk_2 wrapped in a certificate in <b>Cosmian KMS</b>
          </li>
        </ul>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={kmsTwoToken && wrappedPk2 ? saveSecretKeyAndPublishCertificate : undefined}
          codeOutputList={
            wrappedPkCertUid && savedSk2
              ? {
                  javascript: JSON.stringify(savedSk2, undefined, 2) + JSON.stringify(wrappedPkCertUid, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default SaveSK2;
