import { Link } from "react-router-dom";
import GoogleCse from "../../assets/new_cse_google_architecture.drawio.svg";
import { ImageWrapper, SingleContent } from "../../component/Layout";
import { useBoundStore } from "../../store/store";
import { findCurrentNavigationItem } from "../../utils/navigationActions";

const AboutCse = (): JSX.Element => {
  const steps = useBoundStore((state) => state.steps);
  const currentItem = findCurrentNavigationItem(steps);

  return (
    <SingleContent>
      <h1>{currentItem?.label}</h1>
      <p className="introduction">
        Using Google{" "}
        <Link to="https://support.google.com/a/answer/10741897" target="_blank" rel="noopener noreferrer">
          client-side encryption
        </Link>
        , we show how to summarize or translate an encrypted document, using Cosmian AI.
      </p>
      <p>
        Text content is parsed in the browser (using Cosmian AI dedicated Chrome extension) and sent to the runner AI, which is in a Cosmian
        VM (verifiabled TEE), using TLS connexion.
      </p>
      <ImageWrapper maxWidth={800}>
        <img src={GoogleCse} alt="Google CSE architecture" width="100%" />
      </ImageWrapper>
    </SingleContent>
  );
};

export default AboutCse;
