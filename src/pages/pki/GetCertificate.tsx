import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { fetchPKI } from "../../actions/javascript/fetchPKI";
import { fetchWrappedKey } from "../../actions/javascript/fetchWrappedKey";
import { uploadPemInPKI } from "../../actions/javascript/uploadPemInPKI";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { ClientOne, ClientTwo } from "../../component/Tags";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const GetCertificate = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("fetchWrappedKey", activeLanguageList);
  // states
  const accessGranted = useBoundStore((state) => state.accessGranted);
  const kmsToken = useBoundStore((state) => state.kmsToken);
  const clientOneUdkUid = useBoundStore((state) => state.clientOneUdkUid);
  const setCertificateUid = useBoundStore((state) => state.setCertificateUid);
  const wrappedPkCertUid = useBoundStore((state) => state.wrappedPkCertUid);
  const setWrappedUdk = useBoundStore((state) => state.setWrappedUdk);
  const wrappedUdk = useBoundStore((state) => state.wrappedUdk);

  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const getCertificateAndRetriveKey = async (): Promise<void> => {
    try {
      if (accessGranted && kmsToken && wrappedPkCertUid && clientOneUdkUid) {
        const kmsObject = await fetchPKI(kmsToken, wrappedPkCertUid);
        if (kmsObject.type === "Certificate") {
          const uid = await uploadPemInPKI(kmsToken, uuidv4(), kmsObject.value.certificateValue);
          setCertificateUid(uid);
          const wrappedKey = await fetchWrappedKey(kmsToken, clientOneUdkUid, uid);
          setWrappedUdk(wrappedKey);
        }

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
        <h1>{currentItem?.label}</h1>
        <ul>
          <li>
            <ClientOne /> gets the certificate from the <b>Cosmian KMS</b>
          </li>
          <li>
            After importing in his KMS <ClientTwo />
            ’s certificate, <ClientOne /> retrieves the user decryption key from his KMS <code>Wrap(sk_a)</code> wrapped with the public key
            of this certificate.
          </li>
        </ul>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={accessGranted && kmsToken && wrappedPkCertUid && clientOneUdkUid ? getCertificateAndRetriveKey : undefined}
          codeOutputList={
            wrappedUdk
              ? {
                  javascript: JSON.stringify(wrappedUdk, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default GetCertificate;
