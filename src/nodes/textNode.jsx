import React, { useState } from "react";
import BaseNode from "./BaseNode";

const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);

    // keep value in ReactFlow node data
    if (data?.setText) {
      data.setText(e.target.value);
    }
  };

  return (
    <BaseNode
      title="Text"
      inputs={data.inputs || []}
      outputs={data.outputs || [`${id}-output`]}
    >
      <input
        type="text"
        value={currText}
        onChange={handleTextChange}
        className="input input-bordered w-full"
        placeholder="Enter text..."
      />
    </BaseNode>
  );
};

export default TextNode;
