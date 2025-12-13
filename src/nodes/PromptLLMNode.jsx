import { FiMessageSquare } from "react-icons/fi";
import BaseNode from "./BaseNode";

export const PromptLLMNode = ({ data }) => (
  <BaseNode
    title="Prompt LLM"
    inputs={["prompt"]}
    outputs={["response"]}
    nodeColor="lightPurple"
    icon={<FiMessageSquare className="text-white" />}
  >
    <textarea className="textarea textarea-bordered w-full" placeholder="Write prompt..." />
  </BaseNode>
);

