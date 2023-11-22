import { Button } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { CodeBackground, VmCode } from "../../component/Code";
import Split from "../../component/Split";
import { useBoundStore, useConfidentialVmSore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";

const VerifyIntegrity = (): JSX.Element => {
  const { integrity, setIntegrity } = useConfidentialVmSore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);
  const navigate = useNavigate();

  const verifyIntegrity = (): void => {
    setIntegrity(true);

    updateNavigationSteps(steps, setSteps);
    navigate("#");
  };

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          On a regular basis, the administrator can proceed with a verification of the Cosmian VM using the CLI and the previous computed
          snapshot. The integrity of the VM content is verified.
        </p>
        <p>Also, the CLI checks that the VM is still a SEV AMD VM and checks the TPM used to attest </p>
        <Button style={{ width: "100%" }} onClick={verifyIntegrity} disabled={integrity}>
          {integrity ? "Integrity verified" : "Verify the VM integrity"}
        </Button>
      </Split.Content>

      <Split.Code>
        <CodeBackground>{integrity && <VmCode code={INTEGRITY} machine="admin" />}</CodeBackground>
      </Split.Code>
    </Split>
  );
};

export default VerifyIntegrity;

const INTEGRITY = `$ ./cosmian vm verify - -url https://cosmianvm2.cosmian.dev --snapshot cosmian_vm. snapshot
Fetching the collaterals...
[ OK ] Verifying VM integrity
[ OK ] Verifying TPM attestation [ OK ] Verifying TEE attestation
`;
