import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { grantGetKeyAccess } from "../../actions/javascript/grantGetKeyAccess";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { ClientTwo } from "../../component/Tags";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, usePkiStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const GrantAccess = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("grantGetKeyAccess", activeLanguageList);
  // states
  const { accessGranted, wrappedPkCertUid, setAccessGranted } = usePkiStore((state) => state);
  const { kmsTwoToken, steps, setSteps } = useBoundStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const grantAccess = async (): Promise<void> => {
    try {
      if (kmsTwoToken && wrappedPkCertUid) {
        grantGetKeyAccess(kmsTwoToken, wrappedPkCertUid, "*");
        setAccessGranted(true);
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
        <p>
          <ClientTwo /> grants wildcard access for GET operation to his imported wrapped public key in <b>Cosmian KMS</b>
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
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
