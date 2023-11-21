import SetupFlow from "../../assets/confidential_vm_setup_flow.drawio.svg";
import VerificationFlow from "../../assets/confidential_vm_verification_flow.drawio.svg";
import { ImageWrapper, SingleContent } from "../../component/Layout";

const UseConfidentialVm = (): JSX.Element => {
  return (
    <SingleContent>
      <h1>Use Cosmian VM</h1>
      <p className="introduction">
        Cosmian VM allows you to deploy an application on a cloud provider instance, running in a confidential context with verifiability at
        any time.
      </p>
      <ul>
        <li>
          <b>No binary modification:</b> the application doesn’t need any third party library or any specific adaptation
        </li>
        <li>
          <b>Simplicity is gold:</b> reduce at its minimum the number of manual actions the user has to do to spawn a Cosmian VM
        </li>
        <li>
          <b>Confidentiality:</b> the application runs in a Trusted Execution Environment (encrypted memory)
        </li>
        <li>
          <b>Verifiability:</b> a user is able to verify the integrity of the system (OS & application) at any time
        </li>
      </ul>

      <h2 style={{ marginTop: "1.5em" }}>Setup flow</h2>
      <p>
        A confidential VM is instanciated from a cloud provider platform, including Cosmian VM solution. After installing all dependencies,
        the VM is snapshotted and integrity checks can be performed on the running application, in order to verify the running code and
        infrastructure.
      </p>
      <ImageWrapper>
        <img src={SetupFlow} alt="Confidential VM setup flow" />
      </ImageWrapper>

      <h2 style={{ marginTop: "1.5em" }}>Verification steps</h2>
      <p>Cosmian verification process is performed by the Admin sys, requesting on the running confidential VM, and checks:</p>
      <ul>
        <li>IMA measurement list (containing the list of executed file's hash digest)</li>
        <li>
          TEE (Trusted Execution Environment) elements to provide assurance that the code is running on secure and confidential hardware
        </li>
        <li>TPM (Trusted Platform Module) elements to attest a TEE and the integrity of the system (IMA) </li>
      </ul>
      <ImageWrapper>
        <img src={VerificationFlow} alt="Confidential VM verification flow" />
      </ImageWrapper>
    </SingleContent>
  );
};

export default UseConfidentialVm;
