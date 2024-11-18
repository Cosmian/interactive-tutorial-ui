import { LockFilled } from "@ant-design/icons";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IndexedEntry } from "cloudproof_js";
import { Employee, findexDatabaseEmployee } from "../utils/covercryptConfig";
import { EncryptedResult } from "../utils/types";

const { Column, ColumnGroup } = Table;

type EmployeeTablePros = {
  data: Employee[] | findexDatabaseEmployee[];
  covercrypt?: boolean;
  className?: string;
  style?: React.CSSProperties;
};
type EncryptedTablePros = {
  data: EncryptedResult[];
  className?: string;
  style?: React.CSSProperties;
};
type IndexedTableProps = {
  data: IndexedEntry[];
  className?: string;
  style?: React.CSSProperties;
};

export const EmployeeTable: React.FC<EmployeeTablePros> = ({ data, covercrypt, ...rest }) => {
  const getColor = (country: string): string => {
    switch (country) {
      case "France":
        return "red";
      case "Spain":
        return "gold";
      case "Germany":
        return "green";
      default:
        return "blue";
    }
  };

  const columnsOne = (
    <>
      <Column title="First Name" dataIndex="first" key="first" />
      <Column title="Last Name" dataIndex="last" key="last" />
      <Column
        title="Country"
        dataIndex="country"
        key="country"
        render={(item: string | undefined) =>
          item ? (
            covercrypt ? (
              <Tag icon={<LockFilled />} color={getColor(item)}>
                {item}
              </Tag>
            ) : (
              item
            )
          ) : undefined
        }
      />
    </>
  );

  const columnsTwo = (
    <>
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Salary" dataIndex="salary" key="salary" />
    </>
  );

  return (
    <Table
      dataSource={data}
      pagination={false}
      {...rest}
      rowKey={"uuid"}
      scroll={{ x: 550 }}
      style={{
        wordBreak: "break-word",
      }}
    >
      {covercrypt ? (
        <>
          <ColumnGroup
            key={"marketing"}
            title={
              <Tag icon={<LockFilled />} color="cyan" style={{ width: "100%", textAlign: "center", wordBreak: "break-word" }}>
                Marketing
              </Tag>
            }
          >
            {columnsOne}
          </ColumnGroup>
          <ColumnGroup
            key={"hr"}
            title={
              <Tag icon={<LockFilled />} color="blue" style={{ width: "100%", textAlign: "center" }}>
                HR
              </Tag>
            }
          >
            {columnsTwo}
          </ColumnGroup>
        </>
      ) : (
        <>
          {columnsOne} {columnsTwo}
        </>
      )}
    </Table>
  );
};

export const EncryptedTable: React.FC<EncryptedTablePros> = ({ data, ...rest }) => {
  return (
    <Table dataSource={data} pagination={false} {...rest} scroll={{ x: 550 }}>
      <Column
        title={
          <Tag icon={<LockFilled />} color="cyan" style={{ width: "100%", textAlign: "center" }}>
            Marketing
          </Tag>
        }
        dataIndex="marketing"
        key="marketing"
        render={(unitArray: Uint8Array) => <>{unitArray}</>}
        ellipsis={true}
      />
      <Column
        title={
          <Tag icon={<LockFilled />} color="blue" style={{ width: "100%", textAlign: "center" }}>
            HR
          </Tag>
        }
        dataIndex="hr"
        key="hr"
        render={(unitArray: Uint8Array) => <>{unitArray}</>}
        ellipsis={true}
      />
    </Table>
  );
};

export const IndexedTable: React.FC<IndexedTableProps> = ({ data, ...rest }) => {
  const textDecoder = new TextDecoder("utf-8");
  const columns: ColumnsType<IndexedEntry> = [
    {
      title: "Indexed value",
      dataIndex: "indexedValue",
      key: "indexedValue",
      render: (_, { indexedValue }) => <>{indexedValue.bytes}</>,
    },
    {
      title: "Keywords",
      key: "keywords",
      render: (indexedEntry: IndexedEntry) => (
        <>
          {(indexedEntry.keywords as string[]).map((kw, index) => {
            return <Tag key={index}>{kw}</Tag>;
          })}
        </>
      ),
    },
  ];
  return (
    <Table
      dataSource={data}
      pagination={false}
      {...rest}
      scroll={{ x: 550 }}
      columns={columns}
      rowKey={(row) => textDecoder.decode(row.indexedValue.bytes)}
    />
  );
};
