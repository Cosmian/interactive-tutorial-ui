import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { grantGetKeyAccess } from "../../actions/javascript/grantGetKeyAccess";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { ClientTwo } from "../../component/Tags";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const GrantAccess = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("grantGetKeyAccess", activeLanguageList);
  // states
  const kmsTwoToken = useBoundStore((state) => state.kmsTwoToken);
  const accessGranted = useBoundStore((state) => state.accessGranted);
  const setAccessGranted = useBoundStore((state) => state.setAccessGranted);
  const wrappedPkCertUid = useBoundStore((state) => state.wrappedPkCertUid);
  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const navigate = useNavigate();

  const grantAccess = async (): Promise<void> => {
    try {
      if (kmsTwoToken && wrappedPkCertUid) {
        grantGetKeyAccess(kmsTwoToken, wrappedPkCertUid, "*");
        setAccessGranted();

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
        <h1>Granting access</h1>
        <p>
          <ClientTwo /> grants wildcard access for GET operation to his imported wrapped public key in <b>Cosmian KMS</b>
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={kmsTwoToken && wrappedPkCertUid ? grantAccess : undefined}
          codeOutputList={
            accessGranted
              ? {
                  javascript: "Access granted",
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default GrantAccess;
