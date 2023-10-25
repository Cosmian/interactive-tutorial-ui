import { message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getKmsVersion } from "../../actions/javascript/testKmsVersion";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useBoundStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = [];

const SetupPki = (): JSX.Element => {
  // states
  const [version, setVersion] = useState<string | undefined>();
  const setServiceSetup = useBoundStore((state) => state.setPkiServiceSetup);
  const kmsToken = useBoundStore((state) => state.kmsToken);
  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleSetupService = async (): Promise<void> => {
    try {
      if (kmsToken) {
        const version = await getKmsVersion(kmsToken);
        if (version) {
          setVersion(version);
          setServiceSetup();
          updateNavigationSteps(steps, setSteps);
          navigate("#");
        }
      }
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
    }
  };

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          The Cosmian Key Management System (KMS) is a high-performance, open-source, server application written in Rust that provides a{" "}
          <Link to={"https://docs.cosmian.com/cosmian_key_management_system/#kmip-21-api"} target="_blank" rel="noopener noreferrer">
            KMIP
          </Link>{" "}
          REST API to store and manage keys used in many standard (AES, ECIES,…) cryptographic stacks as well as Cosmian cryptographic
          stacks (Covercrypt, Findex). The KMS can also be used to perform encryption and decryption operations.
        </p>
        <p>
          The Cosmian KMS is designed to operate in{" "}
          <Link to={"https://docs.cosmian.com/cosmian_key_management_system/zero_trust/"} target="_blank" rel="noopener noreferrer">
            zero-trust
          </Link>{" "}
          environments, such as the public cloud, using confidential VMs and a fully application-level encrypted database.
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={{
            java: QUICK_START,
            javascript: QUICK_START,
            python: QUICK_START,
            flutter: QUICK_START,
            cpp: QUICK_START,
          }}
          codeOutputList={
            version
              ? {
                  java: version,
                  javascript: version,
                  python: version,
                  flutter: version,
                  cpp: version,
                }
              : undefined
          }
          codeLanguage="bash"
          runCode={handleSetupService}
        />
      </Split.Code>
    </Split>
  );
};

export default SetupPki;

const QUICK_START = `# Quick start
docker run -p 9998:9998 --name kms ghcr.io/cosmian/kms:4.8.0

# Check the Cosmian KMS server version
curl http://localhost:9998/version`;
