import logo from "../assets/cosmian_logo.svg";

type LoginPageProps = {
  loginWithRedirect: () => void;
  signUpWithRedirect: () => void;
};
const LoginPage: React.FC<LoginPageProps> = ({ loginWithRedirect, signUpWithRedirect }) => {
  return (
    <main className="login-page">
      <header>
        <a href="https://cosmian.com" target="_blank">
          <img loading="lazy" decoding="async" src={logo} alt="Cosmian logo white" title="Cosmian Logo" />
        </a>
      </header>
      <div className="text-content">
        <p className="title">Interactive tutorial and developer code examples</p>
        <div className="buttons">
          <button onClick={signUpWithRedirect}>
            SIGN UP <ButtonsIcon className="arrow" />
          </button>

          <button onClick={loginWithRedirect}>
            LOG IN <ButtonsIcon className="arrow" />
          </button>
        </div>
      </div>
    </main>
  );
};

import { memo, SVGProps } from "react";

const ButtonsIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12.5713 2.0293L21.5416 10.9996L12.5713 19.9699"
      stroke="white"
      stroke-width="3.58812"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M21.5417 11L2.45801 11L21.5417 11Z" fill="white" />
    <path d="M21.5417 11L2.45801 11" stroke="white" stroke-width="3.58812" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const Memo = memo(ButtonsIcon);
export { Memo as ButtonsIcon };

export default LoginPage;
