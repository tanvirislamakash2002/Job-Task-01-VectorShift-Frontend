import BaseNode from "./BaseNode";

const StatsNode = () => (
  <BaseNode title="Stats" inputs={["text"]} outputs={["stats"]}>
    <div>Outputs word count, char count, etc.</div>
  </BaseNode>
);

export default StatsNode;
