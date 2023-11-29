import FindexWorkflow from "../../assets/findex.drawio.svg";
import { ImageWrapper, SingleContent } from "../../component/Layout";

const AboutFindex = (): JSX.Element => {
  return (
    <SingleContent>
      <h1>About Cosmian Findex’s Searchable Encryption</h1>
      <p className="introduction">
        In today’s vast digital realm of big data and cloud computing, securing sensitive information is paramount. Cosmian Findex’s
        Searchable Encryption offers an innovative solution that bridges the gap between user accessibility and stringent data security.{" "}
        <b>Our proposed scheme empowers users to query encrypted data without the need to decrypt the entire database.</b>
      </p>
      <h2>The typical user search workflow</h2>
      <p>
        Cosmian Findex is a Searchable Encryption scheme that allows the building of encrypted indexes. One can efficiently search these
        encrypted indexes using encrypted queries and receive encrypted responses. Since the environment cannot learn anything about the
        content of the index, the queries, or the responses, one can use Zero-Trust environments, such as the public cloud, to store the
        indexes.
      </p>
      <ImageWrapper style={{ marginTop: 30 }}>
        <img src={FindexWorkflow} alt="Findex workflow" />
      </ImageWrapper>
      <h2>Implementation</h2>
      <p>
        The Findex cryptographic library is open-source and written in Rust. The Cloudproof Rust Findex implementation allows instantiating
        Findex with chosen backends. The indication of which backend to use is specified when instantiating the object.
      </p>
      <p>
        The following snippet of code describes how to instantiate Findex using the REST backend (this backend relies on a server
        implementing the Findex REST API to store the index).
      </p>
    </SingleContent>
  );
};

export default AboutFindex;
