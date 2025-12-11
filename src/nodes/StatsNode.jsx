import BaseNode from "./BaseNode";

export const StatsNode = () => (
  <BaseNode title="Stats" inputs={["text"]} outputs={["stats"]}>
    <div>Outputs word count, char count, etc.</div>
  </BaseNode>
);

