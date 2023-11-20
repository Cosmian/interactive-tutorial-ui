import Split from "../../component/Split";
import { useBoundStore } from "../../store/store";
import { findCurrentNavigationItem } from "../../utils/navigationActions";

const DecryptDocument = (): JSX.Element => {
  const { steps, setSteps } = useBoundStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>content: decrypt document</p>
      </Split.Content>

      <Split.Code>code</Split.Code>
    </Split>
  );
};

export default DecryptDocument;
