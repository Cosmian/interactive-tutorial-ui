import { LockFilled } from "@ant-design/icons";
import { Table, Tag } from "antd";
import { Employee } from "../utils/covercryptConfig";
import { EncryptedResult } from "../utils/types";

const { Column, ColumnGroup } = Table;

type EmployeeTablePros = {
  data: Employee[];
  clasName?: string;
  style?: React.CSSProperties;
};
type EncryptedTablePros = {
  data: EncryptedResult[];
  clasName?: string;
  style?: React.CSSProperties;
};

export const EmployeeTable: React.FC<EmployeeTablePros> = ({ data, ...rest }) => {
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

  return (
    <Table dataSource={data} pagination={false} {...rest} rowKey={"uuid"} scroll={{ x: 550 }}>
      <ColumnGroup
        key={"marketing"}
        title={
          <Tag icon={<LockFilled />} color="cyan" style={{ width: "100%", textAlign: "center" }}>
            Marketing
          </Tag>
        }
      >
        <Column title="First Name" dataIndex="first" key="first" />
        <Column title="Last Name" dataIndex="last" key="last" />
        <Column
          title="Country"
          dataIndex="country"
          key="country"
          render={(item: string | undefined) =>
            item ? (
              <Tag icon={<LockFilled />} color={getColor(item)}>
                {item}
              </Tag>
            ) : undefined
          }
        />
      </ColumnGroup>
      <ColumnGroup
        key={"hr"}
        title={
          <Tag icon={<LockFilled />} color="blue" style={{ width: "100%", textAlign: "center" }}>
            HR
          </Tag>
        }
      >
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Salary" dataIndex="salary" key="salary" />
      </ColumnGroup>
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
