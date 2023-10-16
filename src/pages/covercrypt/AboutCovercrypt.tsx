import CovercryptPrincipe from "../../assets/covercrypt_principle.drawio.svg";
import BasicDatabase from "../../assets/employees-database-basic.png";
import EmployeeDatabase from "../../assets/employees-database.png";
import { ImageWrapper, SingleContent } from "../../component/Layout";

const AboutCovercrypt = () => {
  return (
    <SingleContent>
      <h1>About Covercrypt</h1>
      <p className="introduction">
        Covercrypt is a post-quantum resistant algorithm that provides access policies in user decryption keys, allowing fine-grained
        control by the client of the data that can be decrypted.
      </p>
      <ImageWrapper>
        <img src={CovercryptPrincipe} alt="Covercrypt principe" />
      </ImageWrapper>
      <h2>Example of use: employees database</h2>
      <ImageWrapper>
        <img src={EmployeeDatabase} alt="Employee database" width={800} />
      </ImageWrapper>
      <p>
        Consider 2 policy axes: <b>Department</b> and <b>Country</b>. Each axis is partitioned by attributes: <b>Marketing and HR</b> for
        the department axis and <b>France, Spain, and Germany</b> for the Country axis.
      </p>
      <ol>
        <li>
          <b>Department:</b> Marketing and HR
        </li>
        <li>
          <b>Country:</b> France, Spain and Germany
        </li>
      </ol>
      <p>
        With Cosmian attribute-based encryption scheme, the encryption key is public. Encrypting systems (Spark, data engineering
        applications, ETLs, etc.) do not have to be secured and can directly hold the key, relaxing constraints on the infrastructure. The
        public key can encrypt for any partition defined by the policy. Decryption keys can decrypt a subset of the partitions defined by
        the policy.
      </p>
      <ImageWrapper>
        <img src={BasicDatabase} alt="Employee database schema" width={800} />
      </ImageWrapper>
    </SingleContent>
  );
};

export default AboutCovercrypt;
