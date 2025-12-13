
import { FiFile } from "react-icons/fi";
import BaseNode from "./BaseNode";

export const CSVInputNode = () => (
  <BaseNode
    title="CSV Input"
    outputs={["csv"]}
    nodeColor="lightBlue"
    icon={<FiFile className="text-white" />}
  >
    <input type="file" accept=".csv" className="file-input file-input-bordered w-full" />
  </BaseNode>
);

