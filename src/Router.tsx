import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./component/Layout";
import OverView from "./pages/OverView";
import AboutCovercrypt from "./pages/covercrypt/AboutCovercrypt";
import CovercryptSetup from "./pages/covercrypt/CovercryptSetup";
import CreateEncryptionPolicy from "./pages/covercrypt/CreateEncryptionPolicy";
import CreateMasterKeyPair from "./pages/covercrypt/CreateMasterKeyPair";
import EncryptData from "./pages/covercrypt/EncryptData";
import { navigationConfig } from "./utils/navigationConfig";

const componentsList: {
  [key: string]: JSX.Element;
} = {
  "client-side-encryption/overview": <OverView />,
  "encrypt-with-access-policies/about-covercrypt": <AboutCovercrypt />,
  "encrypt-with-access-policies/set-up-service": <CovercryptSetup />,
  "encrypt-with-access-policies/create-policy": <CreateEncryptionPolicy />,
  "encrypt-with-access-policies/generate-master-key-pair": <CreateMasterKeyPair />,
  "encrypt-with-access-policies/encrypt-data": <EncryptData />,
  "encrypt-with-access-policies/user-decryption-key": <>user-decryption-key</>,
  "encrypt-with-access-policies/decrypt-data": <>decrypt-data</>,
  "build-encrypted-indexes/about-findex": <>about-findex</>,
  "build-encrypted-indexes/set-up-service": <>set-up-service</>,
  "build-encrypted-indexes/generate-findex-key": <>generate-findex-key</>,
  "build-encrypted-indexes/labelling": <>labelling</>,
  "build-encrypted-indexes/callbacks": <>callbacks</>,
  "build-encrypted-indexes/index-database": <>index-database</>,
  "build-encrypted-indexes/search-in-database": <>search-in-database</>,
  "distibute-keys/about-pki": <>about-pki</>,
  "distibute-keys/set-up-service": <>set-up-service</>,
  "distibute-keys/save-sk-publish-certificate": <>save-sk-publish-certificate</>,
  "distibute-keys/grant-access": <>grant-access</>,
  "distibute-keys/retrieve-wrapped-decryption-key": <>retrieve-wrapped-decryption-key</>,
  "distibute-keys/send-key-in-kms": <>send-key-in-kms</>,
  "distibute-keys/unwrap-decryption-key": <>unwrap-decryption-key</>,
  "distibute-keys/decrypt-data": <>decrypt-data</>,
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Pages with layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<>Home</>} />
        <Route path="*" element={<>*</>} />
      </Route>
      {navigationConfig.map((item) => {
        return (
          <Route path={item.key} element={<Layout />} key={item.key}>
            {item.children.map((subItem) => {
              const component = componentsList[item.key + "/" + subItem.key] ? (
                componentsList[item.key + "/" + subItem.key]
              ) : (
                <>missing component</>
              );
              return <Route path={subItem.key} element={component} key={subItem.key} />;
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
