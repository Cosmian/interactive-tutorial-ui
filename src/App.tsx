import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "cosmian_ui";
import "cosmian_ui/style.css";
import { useEffect } from "react";
import AppRouter from "./Router";
import LoginPage from "./pages/LoginPage";
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

  if (error) {
    handleLogout();
    console.log("Authentication error");
    return <Spinner fullpage />;
  }

  if (!isAuthenticated) {
    return (
      <LoginPage
        loginWithRedirect={() => loginWithRedirect()}
        signUpWithRedirect={() =>
          // https://github.com/auth0/auth0-react/issues/571#issuecomment-1718878155
          loginWithRedirect({
            authorizationParams: {
              screen_hint: "signup",
            },
          })
        }
      />
    );
  }

  return <AppRouter />;
};

export default App;
