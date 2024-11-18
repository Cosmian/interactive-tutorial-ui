import { CheckCircleOutlined } from "@ant-design/icons/lib/icons"
import { Button } from "cosmian_ui"
import { useNavigate } from "react-router-dom"
import { CodeBackground, VmCode } from "../../component/Code"
import Split from "../../component/Split"
import { useBoundStore, useConfidentialVmStore } from "../../store/store"
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions"

const SnapshotVm = (): JSX.Element => {
  const { snapshot, setSnapshot } = useConfidentialVmStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);
  const navigate = useNavigate();

  const snapshotApplication = (): void => {
    setSnapshot(true);

    updateNavigationSteps(steps, setSteps);
    navigate("#");
  };

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p className="introduction">
          This agent can be queried from a CLI running on another standard machine. Once the <b>Cosmian VM</b> is set and completely
          configured, a snapshot is computed.
        </p>
        <p>From now on, any modificiation on that VM is seen as malicious.</p>
        <Button
          style={{ width: "100%" }}
          onClick={snapshotApplication}
          disabled={snapshot}
          icon={snapshot ? <CheckCircleOutlined /> : <></>}
        >
          Snapshot VM
        </Button>
      </Split.Content>

      <Split.Code>
        <CodeBackground>{snapshot && <VmCode code={SNAPSHOT} machine="admin" />}</CodeBackground>
      </Split.Code>
    </Split>
  );
};

export default SnapshotVm;

const SNAPSHOT = `$ ./cosmian_vm snapshot --url https://cosmianvm2.cosmian.dev
Proceeding the snapshot...

The snapshot has been saved at ./cosmian_vm.snapshot
`;
