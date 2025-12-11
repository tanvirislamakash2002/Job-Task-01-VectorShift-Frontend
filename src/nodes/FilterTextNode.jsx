import BaseNode from "./BaseNode";

export const FilterTextNode = ({ data }) => (
  <BaseNode title="Filter Text" inputs={["text"]} outputs={["filtered"]}>
    <input className="input input-bordered w-full" placeholder="Filter keyword" />
  </BaseNode>
);

