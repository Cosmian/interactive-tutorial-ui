import { Link } from "react-router-dom";
import Decryption from "../assets/client_side_decryption.drawio.svg";
import Encryption from "../assets/client_side_encryption.drawio.svg";
import { ImageWrapper, SingleContent } from "../component/Layout";

const OverView = (): JSX.Element => {
  const origin = window.location.origin;

  return (
    <SingleContent>
      <h1>Cosmian Client-side Encryption</h1>
      <p className="introduction">
        Regain control of every byte of your data in the cloud, even during runtime. Cosmian brings a robust encryption for SaaS
        applications, ensuring all data remains in the right hands, fortified with the latest advancements in post-quantum encryption.
      </p>
      <h2>Why use Cosmian Client-side Encryption?</h2>
      <p>
        With minimal cipher expansion and latency, Cosmian’s encryption solution sets a new benchmark in enterprise-grade performance,
        supporting even the most demanding production workloads.
      </p>
      <p>
        With Cosmian’s Client-side Encryption, data remains encrypted in transit, at rest, and even during runtime. This breakthrough in
        data protection provides the highest assurance of data privacy and security.
      </p>
      <h2>Cosmian solution</h2>
      <p className="strong">
        Cosmian provides code blocks, libraries and tools that make using its technologies to implement client-side encryption easy.
      </p>
      <p>
        With client-side encryption, content is encrypted from the customer's browser - or any API connector - before it is transmitted to
        the cloud application servers. The customer manages the encryption keys in its Key Management Service (KMS). This approach
        significantly reduces the attack surface, as the application and data layers within the zero-trust environment process only
        encrypted data and have no clear text access to the decryption keys.
      </p>
      <ImageWrapper maxWidth={1000}>
        <img src={Encryption} alt="Cosmian Client-side Encryption" width="100%" />
        <img src={Decryption} alt="Cosmian Client-side Decryption" width="100%" />
      </ImageWrapper>
      <h2>State-of-the-art post-quantum encryption with embedded access policies</h2>
      <p>
        To further enhance the security provided by application-level encryption, employing a robust encryption scheme like Covercrypt is
        crucial. Covercrypt mitigates the risks associated with key leakage from the presentation layer and addresses potential security
        risks such as rights escalation attacks and authorization misconfigurations. <br />
        <Link to={origin + "/encrypt-with-access-policies/about-covercrypt"}>→ Cosmian Covercrypt overview</Link>
      </p>
      <h2>Search encrypted data</h2>
      <p>
        One of the drawbacks of using application-level encryption is that the storage layer cannot search for data, and most applications
        rely on search features for data extraction. This is because the search engine cannot decrypt the data and, therefore, cannot index
        it. To solve this issue, Cosmian provides Findex, a searchable encryption scheme that allows the building of encrypted indexes.
        <br />
        <Link to={origin + "/build-encrypted-indexes/about-findex"}>→ Cosmian Findex overview</Link>
      </p>
      <h2>Key distribution</h2>
      <p>
        Using Cosmian's Key Management Service (Cosmian KMS) and Public Key Infrastructure (PKI), users can safely share their keys via the
        zero trust layer.
        <br />
        <Link to={origin + "/distibute-keys/about-pki"}>→ Cosmian PKI overview</Link>
      </p>
    </SingleContent>
  );
};

export default OverView;
