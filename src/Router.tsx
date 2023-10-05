import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import CovercryptSetup from "./component/CovercryptSetup";
import Layout from "./component/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Pages with layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<CovercryptSetup />} />
        <Route path={"*"} element={<>CONTENT</>} />
      </Route>

      {/* Pages without layout */}
      <Route path="/">
        {/* <Route path="404" element={<>404</>} />
        <Route path="*" element={<Navigate to={"404"} />} /> */}
      </Route>
    </>
  )
);

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
