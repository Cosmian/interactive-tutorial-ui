import { CheckCircleOutlined } from "@ant-design/icons/lib/icons";
import { Button } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierSulphurpoolDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import HelloWorldGithub from "../../assets//helloworld_app.png";
import { CodeBackground, VmCode } from "../../component/Code";
import { ImageWrapper } from "../../component/Layout";
import Split from "../../component/Split";
import { useBoundStore, useConfidentialVmSore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";

const DeployApplication = (): JSX.Element => {
  const { helloWorld, setHelloWorld } = useConfidentialVmSore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);
  const navigate = useNavigate();

  const runApplication = (): void => {
    setHelloWorld(true);

    updateNavigationSteps(steps, setSteps);
    navigate("#");
  };

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          As a company running on a cloud provider, we would like to deploy an application (called helloworld here) on a confidential
          environment and we will use the product <b>Cosmian VM</b>.
        </p>
        <p>In this example, the application has been released on github and its hash has been computed during the release flow.</p>

        {/* TODO grab a screenshot on light mode more narrow */}
        <ImageWrapper>
          <img src={HelloWorldGithub} alt="Github actions" style={{ maxWidth: "100%" }} />
        </ImageWrapper>
        <p>
          <b>Helloworld</b> application hash:
        </p>
        <SyntaxHighlighter
          language={"shell"}
          style={atelierSulphurpoolDark}
          wrapLongLines={true}
          showLineNumbers={false} // disable line numbers to wrap long lines
          class="code-block"
        >
          {SHA}
        </SyntaxHighlighter>
        <p>Once the VM instantiated, the administrator can start its application:</p>
        <Button
          style={{ width: "100%" }}
          onClick={runApplication}
          disabled={helloWorld}
          icon={helloWorld ? <CheckCircleOutlined /> : <></>}
        >
          {helloWorld ? "Application started" : "Start the application"}
        </Button>
      </Split.Content>

      <Split.Code>
        <CodeBackground>
          {helloWorld && <VmCode code={HELLO_CODE_1} machine="vm" />}
          {helloWorld && <VmCode code={HELLO_CODE_2} machine="vm" />}
        </CodeBackground>
      </Split.Code>
    </Split>
  );
};

export default DeployApplication;

const SHA = "SHA2 - 256 (target/release/helloworld)= 7891fddbb1419cd96dc4c787347fe3a45d805529ba3c446c016c3c2f74e8d";
const HELLO_CODE_1 = "sh-5. 1$ . /helloworld";
const HELLO_CODE_2 = `sh-5. 1# COSMIAN VM AGENT_ CERTIFICATE=/etc/letsencrypt/live/cosmianvm2.cosmian.dev/cert.pem ./cosmian vm agent
2023-11 - 14T13:49:15.901683Z INFO cosmian vm agent: Starting server on 127.0.0.1:5355...
2023-11-14T13:49:15.901966Z INFO actix server: :builder: starting 2 workers
2023-11-14T13:49:15.902019Z INFO actix_server::server: Actix runtime found; starting in Actix runtime
`;
