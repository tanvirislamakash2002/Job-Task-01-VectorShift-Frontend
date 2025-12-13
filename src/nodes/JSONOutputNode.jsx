import React from "react";
import BaseNode from "./BaseNode";
import { FiCode } from "react-icons/fi";

export const JSONOutputNode = ({ data, selected }) => {
  // Get the JSON data from node's data or connected input
  const jsonData = data?.value || data?.jsonData || { status: "Waiting for data..." };
  
  return (
    <BaseNode
      title="JSON Output"
      icon={<FiCode className="text-white" />}
      inputs={["data"]}
      outputs={[]}
      nodeColor="lightGreen"
      isSelected={selected}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            JSON Preview:
          </label>
          <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-auto max-h-40">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
        
        <div className="text-xs text-gray-500">
          {typeof jsonData === 'object' && !jsonData.status ? (
            <div className="flex items-center text-green-600">
              <FiCode className="w-3 h-3 mr-1" />
              Valid JSON received ({Object.keys(jsonData).length} keys)
            </div>
          ) : (
            <div className="flex items-center text-amber-600">
              <FiCode className="w-3 h-3 mr-1 animate-pulse" />
              {jsonData.status || "Connect data to see JSON output"}
            </div>
          )}
        </div>
      </div>
    </BaseNode>
  );
};