import { Link, useNavigate } from "react-router-dom";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useBoundStore, useCovercryptStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const SetupCovercrypt = (): JSX.Element => {
  const { covercryptService, setCovercryptService } = useCovercryptStore((state) => state);

  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleSetupService = (): void => {
    setCovercryptService(true);
    updateNavigationSteps(steps, setSteps);
    navigate("#");
  };

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          The attribute-based encryption scheme is called Covercrypt. It is open-source and written in Rust. For the cryptographic
          documentation and implementation details, please check its{" "}
          <Link to={"https://github.com/Cosmian/cover_crypt"} target="_blank" rel="noopener noreferrer">
            Github repository
          </Link>
          .
        </p>
        <p>Unless low-level programming in Rust, implementers should use Covercrypt through the various cloudproof_xxx user libraries:</p>
        <ul>
          <li>
            <Link to="https://github.com/Cosmian/cloudproof_java" target="_blank" rel="noopener noreferrer">
              cloudproof_java
            </Link>
            : the Cloudproof Java Library,
          </li>
          <li>
            <Link to="https://github.com/Cosmian/cloudproof_js" target="_blank" rel="noopener noreferrer">
              cloudproof_js
            </Link>
            : the Cloudproof Javascript Library,
          </li>
          <li>
            <Link to="https://github.com/Cosmian/cloudproof_python" target="_blank" rel="noopener noreferrer">
              cloudproof_py
            </Link>
            : the Cloudproof Python Library,
          </li>
          <li>
            <Link to="https://github.com/Cosmian/cloudproof_flutter" target="_blank" rel="noopener noreferrer">
              cloudproof_flutter
            </Link>
            : the Cloudproof Flutter Library.
          </li>
          <li>
            <Link to="https://github.com/Cosmian/cloudproof_spark" target="_blank" rel="noopener noreferrer">
              cloudproof_spark
            </Link>
            : the Cloudproof Spark Library.
          </li>
        </ul>
        <p>
          All these libraries are open-source and available on <Link to="https://github.com/Cosmian/">Github</Link>.
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={{
            java: JAVA_CODE,
            javascript: JS_CODE,
            python: PYTHON_CODE,
          }}
          codeOutputList={
            covercryptService
              ? {
                  java: "# successfully installed",
                  javascript: "# successfully installed",
                  python: "# successfully installed",
                }
              : undefined
          }
          codeLanguage="bash"
          runCode={handleSetupService}
        />
      </Split.Code>
    </Split>
  );
};

export default SetupCovercrypt;

const JS_CODE = `npm install cloudproof_js
# or yarn install cloudproof_js or pnpm install cloudproof_js`;
const JAVA_CODE = `<dependency>
<groupId>com.cosmian</groupId>
<artifactId>cloudproof_java</artifactId>
<version>6.0.0</version>
<type>jar</type>
</dependency>`;
const PYTHON_CODE = "pip install cloudproof_py";
