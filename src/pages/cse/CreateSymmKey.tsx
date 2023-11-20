import Split from "../../component/Split";
import { useBoundStore } from "../../store/store";
import { findCurrentNavigationItem } from "../../utils/navigationActions";

const CreateSymmKey = (): JSX.Element => {
  const { steps, setSteps } = useBoundStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>content: create symmetric key</p>
      </Split.Content>

      <Split.Code>code</Split.Code>
    </Split>
  );
};

export default CreateSymmKey;
