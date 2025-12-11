import BaseNode from "./BaseNode";

export const JSONOutputNode = ({ data }) => (
  <BaseNode title="JSON Output" inputs={["data"]}>
    <pre className="text-xs bg-gray-100 p-2 rounded">
      {JSON.stringify(data.value || {}, null, 2)}
    </pre>
  </BaseNode>
);

