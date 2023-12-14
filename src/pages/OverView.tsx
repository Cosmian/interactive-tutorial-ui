import { Link } from "react-router-dom";
import TableAll from "../assets/table-all-attackers.drawio.svg";
import TableReduced from "../assets/table-reduced-attackers.drawio.svg";

import { ImageWrapper, SingleContent } from "../component/Layout";

const OverView = (): JSX.Element => {
  // const origin = window.location.origin;

  return (
    <SingleContent>
      <h1>Architecture - Attackers, Threats and Solutions</h1>
      <p className="introduction">
        The first step in understanding how to secure data and applications in a zero-trust environment is to look at potential attackers
        and their threat model. We assume the application code is safe and that we do not need to protect against the software developer.
      </p>
      <ImageWrapper maxWidth={1000}>
        <img src={TableAll} alt="All attackers table" width="70%" />
      </ImageWrapper>
      <h2 style={{ marginTop: 50 }}>Protection against all attackers</h2>
      <p>
        Client-side encryption is the only ubiquitous solution that protects against all attackers because data is encrypted by the data
        owner under its own key before it reaches any of these attackers. Enabling client-side encryption without loss of functionality
        usually requires a modification to the application and the use of a few Cosmian products: Cosmian Covercrypt, Cosmian KMS and
        possibly Cosmian VM and Cosmian Findex.
      </p>
      <p>
        With Cosmian’s Client-side Encryption, data remains encrypted in transit, at rest, and even during runtime. This breakthrough in
        data protection provides the highest assurance of data privacy and security. We providecode blocks, libraries and tools that make
        using its technologies to implement client-side encryption easy.
        <div style={{ marginTop: 20 }}>
          <Link to={origin + "/client-side-encryption/about-cse"}>→ Client-side encryption example</Link>
        </div>
      </p>
      <h2 style={{ marginTop: 50 }}>Protection against a reduced list of attackers</h2>
      <p>
        When the threat model is limited to a reduced list of attackers, other solutions may be used. The following table summarizes the
        solutions that Cosmian provides to protect against each attacker.
      </p>
      <ImageWrapper maxWidth={1000}>
        <img src={TableReduced} alt="Reduced attackers table" width="70%" />
      </ImageWrapper>
    </SingleContent>
  );
};

export default OverView;
