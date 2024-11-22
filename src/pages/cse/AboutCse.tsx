import { Link } from "react-router-dom";
import CseSchema from "../../assets/cse_schema.drawio.svg";
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
          CSE
        </Link>
         {" "}(client-side encryption) or Microsoft{" "}
         <Link to="https://learn.microsoft.com/en-us/purview/double-key-encryption" target="_blank" rel="noopener noreferrer">
          DKE
        </Link>
        {" "}(double key encryption), together with Cosmian KMS, you can work with client-side encrypted documents.
      </p>
      <p>
        When configured on workplace applications - client-side encryption uses <b>Cosmian KMS</b> to handle encryption operations.
      </p>
      <p>
        <b>Cosmian AI</b> restores some AI functionalities without compromising security: text content is parsed directly in the browser via Cosmian AI’s dedicated Chrome extension, then securely sent to the AI runner within a Cosmian VM (verifiable TEE) over a TLS connection.
      </p>
      <ImageWrapper maxWidth={600} style={{marginTop: "50px"}}>
        <img src={CseSchema} alt="Global CSE architecture" width="100%" />
      </ImageWrapper>
    </SingleContent>
  );
};

export default AboutCse;
