import React, { useState } from "react";
import BaseNode from "./BaseNode";
import { FiUpload } from "react-icons/fi";

export const InputNode = ({ data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || "input_1"
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode
      title="Input"
      icon={<FiUpload className="text-white" />}
      inputs={[]}
      outputs={["value"]}
      nodeColor="blue"
      isSelected={selected}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type:
          </label>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};