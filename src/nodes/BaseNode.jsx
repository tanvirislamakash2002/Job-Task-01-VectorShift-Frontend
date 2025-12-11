import React from "react";
import { Handle, Position } from "reactflow";

const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white p-3 w-60">
      <div className="font-semibold mb-2">{title}</div>

      {/* Input handles */}
      {inputs.map((id, i) => (
        <Handle
          key={id}
          type="target"
          id={id}
          position={Position.Left}
          style={{ top: 40 + i * 25 }}
        />
      ))}

      {/* Node body */}
      <div className="my-2">{children}</div>

      {/* Output handles */}
      {outputs.map((id, i) => (
        <Handle
          key={id}
          type="source"
          id={id}
          position={Position.Right}
          style={{ top: 40 + i * 25 }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
