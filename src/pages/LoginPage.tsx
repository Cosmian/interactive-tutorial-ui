import { Row, Col } from "antd";
import logo from "../assets/cosmian_logo.svg";

type LoginPageProps = {
  loginWithRedirect: () => void;
  signUpWithRedirect: () => void;
};
const LoginPage: React.FC<LoginPageProps> = ({ loginWithRedirect, signUpWithRedirect }) => {
  return (
    <main className="login-page">
      <header>
        <img loading="lazy" decoding="async" src={logo} alt="Cosmian logo white" title="Cosmian Logo" />
      </header>
      <div className="text-content">
        <p className="title">
          Cosmian
          <br />
          client-side encryption
        </p>
        <p className="subtitle">
          Interactive tutorial and
          <br /> developer code examples
        </p>
        <Row className="buttons" align={"middle"} justify={"center"}>
          <Col>
            <button onClick={signUpWithRedirect}>
              SIGN UP <ButtonsIcon className="arrow" />
            </button>
          </Col>
          <Col offset={1}>
            <button onClick={loginWithRedirect}>
              LOG IN <ButtonsIcon className="arrow" />
            </button>
          </Col>
        </Row>
      </div>
    </main>
  );
};

import { memo, SVGProps } from "react";

const ButtonsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio="none" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10.5716 0.029705L19.5419 9L10.5716 17.9703"
      stroke="white"
      strokeWidth={3.58812}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M19.5417 9.00032L0.458008 9.00032Z" fill="white" />
    <path d="M19.5417 9.00032L0.458008 9.00032" stroke="white" strokeWidth={3.58812} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Memo = memo(ButtonsIcon);
export { Memo as ButtonsIcon };

export default LoginPage;
