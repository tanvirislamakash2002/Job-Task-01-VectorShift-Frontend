import { useState } from "react";
import BaseNode from "./BaseNode";
import { FiDownload } from "react-icons/fi";

export const OutputNode = ({ data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || "output_1"
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <BaseNode
      title="Output"
      icon={<FiDownload className="text-white" />}
      inputs={["value"]}
      outputs={[]}
      nodeColor="green"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type:
          </label>
          <select
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="JSON">JSON</option>
            <option value="CSV">CSV</option>
          </select>
        </div>

        {outputType === "Image" && (
          <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <FiDownload className="w-3 h-3" />
            Output will be saved as image file
          </div>
        )}
      </div>
    </BaseNode>
  );
};