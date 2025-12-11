import BaseNode from "./BaseNode";

const CSVInputNode = () => (
  <BaseNode title="CSV Input" outputs={["csv"]}>
    <input type="file" accept=".csv" className="file-input file-input-bordered w-full" />
  </BaseNode>
);

export default CSVInputNode;
