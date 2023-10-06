import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./component/Layout";
import { navigationConfig } from "./utils/navigationConfig";

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
          <Route path={item.key} element={<Layout />}>
            {item.children.map((subItem) => (
              <Route path={subItem.key} element={subItem.component} />
            ))}
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
