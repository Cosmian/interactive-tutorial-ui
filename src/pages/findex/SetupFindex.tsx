import { Link, useNavigate } from "react-router-dom";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useBoundStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python", "flutter"];

const SetupFindex = (): JSX.Element => {
  const serviceSetup = useBoundStore((state) => state.findexServiceSetup);
  const setServiceSetup = useBoundStore((state) => state.setFindexServiceSetup);
  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleSetupService = (): void => {
    console.log("# successfully installed");
    setServiceSetup();
    updateNavigationSteps(steps, setSteps);
    navigate("#");
  };

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          The Findex core cryptographic library is open-source and written in Rust. For cryptographic documentation and implementation
          details, check the{" "}
          <Link to={"https://github.com/Cosmian/findex"} target="_blank" rel="noopener noreferrer">
            Findex Github repository
          </Link>
          .
        </p>
        <p>Unless low-level programming in Rust, implementers should use Findex through the various cloudproof_xxx user libraries:</p>
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
              cloudproof_python
            </Link>
            : the Cloudproof Python Library,
          </li>
          <li>
            <Link to="https://github.com/Cosmian/cloudproof_flutter" target="_blank" rel="noopener noreferrer">
              cloudproof_flutter
            </Link>
            : the Cloudproof Flutter Library.
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
            flutter: FLUTTER_CODE,
          }}
          codeOutputList={
            serviceSetup
              ? {
                  java: "# successfully installed",
                  javascript: "# successfully installed",
                  python: "# successfully installed",
                  flutter: "# successfully installed",
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

export default SetupFindex;

const JS_CODE = `npm install covercrypt 
# or yarn install covercrypt or pnpm install covercrypt`;
const JAVA_CODE = `<dependency>
<groupId>com.cosmian</groupId>
<artifactId>cloudproof_java</artifactId>
<version>6.0.0</version>
<type>jar</type>
</dependency>`;
const PYTHON_CODE = `pip install cloudproof_python

# import library in your python file
from cloudproof_py.findex import Findex, Keyword, Label, Location, MasterKey

# needed if you use type checking
from cloudproof_py.findex.typing import IndexedValuesAndKeywords, ProgressResults`;
const FLUTTER_CODE = "flutter pub add cloudproof";
