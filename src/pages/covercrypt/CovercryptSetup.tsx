import { Link } from "react-router-dom";
import Code from "../../component/Code";
import Split from "../../component/Split";

const CovercryptSetup = () => {
  return (
    <Split>
      <Split.Content>
        <h1>Set up your service</h1>
        <p>
          The attribute-based encryption scheme is called Covercrypt. It is open-source and written in Rust. For the cryptographic
          documentation and implementation details, please check its{" "}
          <Link to={"https://github.com/Cosmian/cover_crypt"}>Github repository</Link>.
        </p>
        <p>Unless low-level programming in Rust, implementers should use Covercrypt through the various cloudproof_xxx user libraries:</p>
        <ul>
          <li>
            <Link to="https://github.com/Cosmian/cloudproof_java">cloudproof_java</Link>: the Cloudproof Java Library,
          </li>
          <li>
            <Link to="https://github.com/Cosmian/js">cloudproof_js</Link>: the Cloudproof Javascript Library,
          </li>
          <li>
            <Link to="https://github.com/Cosmian/python">cloudproof_python</Link>: the Cloudproof Python Library,
          </li>
          <li>
            <Link to="https://github.com/Cosmian/flutter">cloudproof_flutter</Link>: the Cloudproof Flutter Library.
          </li>
          <li>
            <Link to="https://github.com/Cosmian/spark">cloudproof_spark</Link>: the Cloudproof Spark Library.
          </li>
        </ul>
        <p>
          All these libraries are open-source and available on <Link to="https://github.com/Cosmian/">Github</Link>
        </p>
        <p>The user libraries all contain extensive tests, and it is highly recommended to start by hacking those tests.</p>
      </Split.Content>
      <Split.Code>
        <Code
          codeInputList={{
            java: JAVA_CODE,
            javascript: JS_CODE,
            python: PYTHON_CODE,
            flutter: FLUTTER_CODE,
            "c++": CPP_CODE,
          }}
          codeLanguage="zsh"
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
const PYTHON_CODE = `pip install cloudproof_py`;
const FLUTTER_CODE = `flutter pub add cloudproof`;
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