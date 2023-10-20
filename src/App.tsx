import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "cosmian_ui";
import "cosmian_ui/style.css";
import { useEffect } from "react";
import AppRouter from "./Router";
import { useBoundStore } from "./store/store";

const App = (): JSX.Element => {
  const { isLoading, error, user, loginWithRedirect, getIdTokenClaims, logout, isAuthenticated } = useAuth0();
  const setKmsToken = useBoundStore((state) => state.setKmsToken);

  useEffect(() => {
    if (user) {
      const getToken = async (): Promise<void> => {
        const claims = await getIdTokenClaims();
        if (claims) setKmsToken(claims?.__raw);
      };
      getToken();
    }
  }, [user]);

  const handleLogout = (): void => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isLoading) {
    return <Spinner fullpage />;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    console.log("Not authenticated");
    return <Spinner fullpage />;
  }

  if (error) {
    handleLogout();
    console.log("Authentication error");
    return <>Error</>;
  }

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
