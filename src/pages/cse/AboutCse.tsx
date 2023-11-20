import { SingleContent } from "../../component/Layout";
import { useBoundStore } from "../../store/store";
import { findCurrentNavigationItem } from "../../utils/navigationActions";

const AboutCse = (): JSX.Element => {
  const steps = useBoundStore((state) => state.steps);
  const currentItem = findCurrentNavigationItem(steps);

  return (
    <SingleContent>
      <h1>{currentItem?.label}</h1>
      <p className="introduction">About introduction.</p>
      <p>About paragraph.</p>
    </SingleContent>
  );
};

export default AboutCse;
