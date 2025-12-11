// LLMNode.jsx
import React, { useState } from "react";
import BaseNode from "./BaseNode";

export const LLMNode = ({ data, selected }) => {
  const [model, setModel] = useState(data?.model || "gpt-4");
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);

  return (
    <BaseNode
      title="LLM"
      icon="🤖"
      inputs={["system", "prompt"]}
      outputs={["response"]}
      nodeColor="purple"
      isSelected={selected}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model:
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-3">Claude 3</option>
            <option value="llama-3">Llama 3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature: {temperature}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Precise</span>
            <span>Balanced</span>
            <span>Creative</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          Takes system prompt and user prompt, returns LLM response
        </div>
      </div>
    </BaseNode>
  );
};