import { FiBarChart2 } from "react-icons/fi";
import BaseNode from "./BaseNode";

export const StatsNode = () => (
  <BaseNode title="Stats"
    inputs={["text"]}
    outputs={["stats"]}
    nodeColor="gray"
    icon={<FiBarChart2 className="text-white" />}
  >
    <div>Outputs word count, char count, etc.</div>
  </BaseNode>
);

