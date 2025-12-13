import { FiFilter } from "react-icons/fi";
import BaseNode from "./BaseNode";

export const FilterTextNode = ({ data }) => (
  <BaseNode
    title="Filter Text"
    inputs={["text"]}
    outputs={["filtered"]}
    nodeColor="lightOrange"
    icon={<FiFilter className="text-white" />}
  >
    <input className="input input-bordered w-full" placeholder="Filter keyword" />
  </BaseNode>
);

