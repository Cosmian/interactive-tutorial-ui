import { Link, useNavigate } from "react-router-dom";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python", "flutter", "cpp"];

const CovercryptSetup = (): JSX.Element => {
  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const navigate = useNavigate();

  const handleSetupService = (): void => {
    console.log("# successfully installed");
    updateNavigationSteps(steps, setSteps);
    navigate("#");
  };

  return (
    <Split>
      <Split.Content>
        <h1>Set up your service</h1>
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
            flutter: FLUTTER_CODE,
            cpp: CPP_CODE,
          }}
          codeOutputList={{
            java: "# successfully installed",
            javascript: "# successfully installed",
            python: "# successfully installed",
            flutter: "# successfully installed",
            cpp: "# successfully installed",
          }}
          codeLanguage="zsh"
          runCode={handleSetupService}
        />
      </Split.Code>
    </Split>
  );
};

export default CovercryptSetup;

const JS_CODE = `npm install covercrypt 
# or yarn install covercrypt or pnpm install covercrypt`;
const JAVA_CODE = `<dependency>
<groupId>com.cosmian</groupId>
<artifactId>cloudproof_java</artifactId>
<version>6.0.0</version>
<type>jar</type>
</dependency>`;
const PYTHON_CODE = "pip install cloudproof_py";
const FLUTTER_CODE = "flutter pub add cloudproof";
const CPP_CODE = `#include "cloudproof.h"

# Compile and run on Linux
g++ main.cpp -o main -I include/ -L lib/ -lcloudproof
LD_LIBRARY_PATH=lib ./main

# Compile and run on MacOS
g++ main.cpp -o main -I include/ -L lib/ -lcloudproof
DYLD_FALLBACK_LIBRARY_PATH=lib ./main

#Compile and run on Windows
cl main.cpp  /I "include" /link "lib/libcloudproof.dll.a" /OUT:main.exe
main.exe`;
