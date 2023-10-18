import { useAuth0 } from "@auth0/auth0-react";
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
    return <>Loading...</>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return <>Not authenticated</>;
  }

  if (error) {
    handleLogout();
    return <>Error</>;
  }

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
