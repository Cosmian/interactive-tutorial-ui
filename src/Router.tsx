import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./component/Layout";
import OverView from "./pages/OverView";
import AuditSnapshot from "./pages/confidentialVm/AuditSnapshot";
import DeployApplication from "./pages/confidentialVm/DeployApplication";
import DetectMalware from "./pages/confidentialVm/DetectMalware";
import SnapshotVm from "./pages/confidentialVm/SnapshotVm";
import UseConfidentialVm from "./pages/confidentialVm/UseConfidentialVm";
import VerifyIntegrity from "./pages/confidentialVm/VerifyIntegrity";
import AboutCovercrypt from "./pages/covercrypt/AboutCovercrypt";
import CreateEncryptionPolicy from "./pages/covercrypt/CreateEncryptionPolicy";
import CreateMasterKeyPair from "./pages/covercrypt/CreateMasterKeyPair";
import DecryptData from "./pages/covercrypt/DecryptData";
import EncryptData from "./pages/covercrypt/EncryptData";
import GenerateUDK from "./pages/covercrypt/GenerateUDK";
import SetupCovercrypt from "./pages/covercrypt/SetupCovercrypt";
import AboutCse from "./pages/cse/AboutCse";
import CreateSymmetricKey from "./pages/cse/CreateSymmetricKey";
import Decrypt from "./pages/cse/Decrypt";
import EncryptAndSend from "./pages/cse/EncryptAndSend";
import SetupCse from "./pages/cse/SetupCse";
import AboutFindex from "./pages/findex/AboutFindex";
import DefineCallbacks from "./pages/findex/DefineCallbacks";
import GenerateFindexKey from "./pages/findex/GenerateFindexKey";
import IndexDatabase from "./pages/findex/IndexDatabase";
import Labelling from "./pages/findex/Labelling";
import SearchInDatabase from "./pages/findex/SearchInDatabase";
import SetupFindex from "./pages/findex/SetupFindex";
import AboutPKI from "./pages/pki/AboutPKI";
import DecryptDataPKI from "./pages/pki/DecryptDataPKI";
import EncryptDataPki from "./pages/pki/EncryptDataPki";
import GetCertificate from "./pages/pki/GetCertificate";
import GrantAccess from "./pages/pki/GrantAccess";
import ImportAndUnwrapUDK from "./pages/pki/ImportAndUnwrapUDK";
import SaveSK2 from "./pages/pki/SaveSK2";
import SendWrappedDecryptionKey from "./pages/pki/SendWrappedDecryptionKey";
import SetupPki from "./pages/pki/SetupPki";
import { navigationConfig } from "./utils/navigationConfig";

const componentsList: {
  [key: string]: JSX.Element;
} = {
  // Overview
  overview: <OverView />,
  // Covercrypt
  "encrypt-with-access-policies/about-covercrypt": <AboutCovercrypt />,
  "encrypt-with-access-policies/set-up-service": <SetupCovercrypt />,
  "encrypt-with-access-policies/create-policy": <CreateEncryptionPolicy />,
  "encrypt-with-access-policies/generate-master-key-pair": <CreateMasterKeyPair />,
  "encrypt-with-access-policies/encrypt-data": <EncryptData />,
  "encrypt-with-access-policies/user-decryption-key": <GenerateUDK />,
  "encrypt-with-access-policies/decrypt-data": <DecryptData />,
  // Findex
  "build-encrypted-indexes/about-findex": <AboutFindex />,
  "build-encrypted-indexes/set-up-service": <SetupFindex />,
  "build-encrypted-indexes/generate-findex-key": <GenerateFindexKey />,
  "build-encrypted-indexes/labelling": <Labelling />,
  "build-encrypted-indexes/callbacks": <DefineCallbacks />,
  "build-encrypted-indexes/index-database": <IndexDatabase />,
  "build-encrypted-indexes/search-in-database": <SearchInDatabase />,
  // PKI
  "distibute-keys/about-pki": <AboutPKI />,
  "distibute-keys/set-up-service": <SetupPki />,
  "distibute-keys/encrypt-data": <EncryptDataPki />,
  "distibute-keys/save-sk-publish-certificate": <SaveSK2 />,
  "distibute-keys/grant-access": <GrantAccess />,
  "distibute-keys/retrieve-wrapped-decryption-key": <GetCertificate />,
  "distibute-keys/send-key-in-kms": <SendWrappedDecryptionKey />,
  "distibute-keys/unwrap-decryption-key": <ImportAndUnwrapUDK />,
  "distibute-keys/decrypt-data": <DecryptDataPKI />,

  // Confidential VM
  "confidential-vm/about-cosmian-vm": <UseConfidentialVm />,
  "confidential-vm/deploy-application": <DeployApplication />,
  "confidential-vm/snapshot-cosmian-vm": <SnapshotVm />,
  "confidential-vm/audit-snapshot": <AuditSnapshot />,
  "confidential-vm/verify-integrity": <VerifyIntegrity />,
  "confidential-vm/detect-malicious-activities": <DetectMalware />,

  // CSE
  "client-side-encryption/about-cse": <AboutCse />,
  "client-side-encryption/set-up-service": <SetupCse />,
  "client-side-encryption/create-symmetric-key": <CreateSymmetricKey />,
  "client-side-encryption/encrypt-send-document": <EncryptAndSend />,
  "client-side-encryption/decrypt": <Decrypt />,
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Pages with layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={"overview"} />} />
        <Route path="*" element={<>*</>} />
      </Route>
      {Object.entries(navigationConfig).map((item) => {
        const itemKey = item[0];
        const itemValue = item[1];
        return (
          <Route path={itemKey} element={<Layout />} key={itemKey}>
            {itemValue.children == null && <Route path={"/" + itemKey} element={componentsList[itemKey]} key={itemKey} />}
            {itemValue.children != null &&
              Object.entries(itemValue.children).map((childrenItem) => {
                const childrenItemKey = childrenItem[0];
                const component = componentsList[itemKey + "/" + childrenItemKey] ? (
                  componentsList[itemKey + "/" + childrenItemKey]
                ) : (
                  <>missing component</>
                );
                return <Route path={childrenItemKey} element={component} key={childrenItemKey} />;
              })}
          </Route>
        );
      })}

      {/* Pages without layout */}
      <Route path="/">
        <Route path="404" element={<>404</>} />
        <Route path="*" element={<Navigate to={"404"} />} />
      </Route>
    </>
  )
);

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
