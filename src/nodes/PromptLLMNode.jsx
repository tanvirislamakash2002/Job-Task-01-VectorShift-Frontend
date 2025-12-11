import BaseNode from "./BaseNode";

const PromptLLMNode = ({ data }) => (
  <BaseNode title="Prompt LLM" inputs={["prompt"]} outputs={["response"]}>
    <textarea className="textarea textarea-bordered w-full" placeholder="Write prompt..." />
  </BaseNode>
);

export default PromptLLMNode;
