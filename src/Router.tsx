import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./component/Layout";
import { generateComponentsList, navigationConfig } from "./utils/navigationConfig";
import { pagesConfig } from "./utils/pageConfig";

const componentsList: {
  [key: string]: JSX.Element;
} = generateComponentsList(pagesConfig);

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
    </>,
  ),
);

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
