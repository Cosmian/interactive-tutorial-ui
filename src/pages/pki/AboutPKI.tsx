import { useEffect } from "react";
import PkiDrawIo from "../../assets/pki.drawio.svg";

import { ImageWrapper, SingleContent } from "../../component/Layout";
import { ClientOne, ClientTwo } from "../../component/Tags";

const AboutPKI = (): JSX.Element => {
  useEffect(() => {}, []);

  return (
    <SingleContent>
      <h1>
        Distributing keys between clients with <em>Cosmian PKI</em>
      </h1>
      <p>
        Say <ClientOne /> wants to provide <ClientTwo /> with a decryption key <code>sk_a</code> to decrypt data previously encrypted with
        Covercrypt with <ClientOne />
        ’s public key <code>pk_1</code>.
      </p>
      <p>
        This decryption key is sensitive - and should be wrapped under <ClientTwo />
        ’s public key to be transferred from <ClientOne />
        's KMS to <ClientTwo />
        ’s KMS. Since their KMS cannot communicate, the clients are using the Public Key Infrastructure (PKI) built in Cosmian KMS to
        exchange keys.
      </p>
      <p>The typical flow for the distribution of a decryption key is illustrated in the following diagram.</p>
      <p>
        Say <ClientOne /> wants to provide <ClientTwo /> with a decryption key <code>sk_a</code> to decrypt data previously encrypted under{" "}
        <ClientOne />
        ’s key.
      </p>
      <ol>
        <li>
          <ClientTwo /> (the recipient) generates a key pair <code>sk_2/pk_2</code> and publishes its public key <code>pk_2</code> wrapped
          in a certificate to the SaaS PKI.
        </li>
        <li>
          <ClientOne /> recovers <ClientTwo />
          ’s certificate containing <code>pk_2</code>.
        </li>
        <li>
          <ClientOne /> wraps (i.e. encrypts) the decryption key <code>sk_a</code> under the public key <code>pk_2</code> and publishes the
          wrapped key in the SaaS PKI.{" "}
        </li>
        <li>
          <ClientTwo /> recovers the wrapped key <code>sk_a</code> from the SaaS PKI and unwraps it (i.e. decrypts it) using its private key{" "}
          <code>sk_2</code>.
        </li>
      </ol>
      <ImageWrapper style={{ margin: "30px auto" }}>
        <img src={PkiDrawIo} alt="Employee database schema" width={800} />
      </ImageWrapper>
    </SingleContent>
  );
};

export default AboutPKI;
