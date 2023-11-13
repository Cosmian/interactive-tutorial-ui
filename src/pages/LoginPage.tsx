import { Button } from "cosmian_ui";

type LoginPageProps = {
  loginWithRedirect: () => void;
};
const LoginPage: React.FC<LoginPageProps> = ({ loginWithRedirect }) => {
  return (
    <main className="login-page">
      <div className="background">
        <div className="text-content">
          <p className="title">Cosmian client-side encryption</p>
          <p>Interactive tutorial and developer code examples</p>
          <Button onClick={loginWithRedirect}>Create an account or login</Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
