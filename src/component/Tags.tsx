import { Tag } from "antd";

export const ClientOne = (): JSX.Element => {
  return <ClientTag client={1}>Client 1</ClientTag>;
};
export const ClientTwo = (): JSX.Element => {
  return <ClientTag client={2}>Client 2</ClientTag>;
};

export const ClientTag: React.FC<{ client: 1 | 2 | undefined; children: JSX.Element | string }> = ({ client, children }) => {
  const getColor = (): "blue" | "green" | undefined => {
    switch (client) {
      case 1:
        return "blue";
      case 2:
        return "green";
      default:
        return undefined;
    }
  };
  return (
    <Tag color={getColor()} style={{ margin: "0 4px 0 0" }}>
      {children}
    </Tag>
  );
};
