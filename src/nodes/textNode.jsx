import React, { useState, useEffect } from "react";
import BaseNode from "./BaseNode";
import { FiFileText } from "react-icons/fi";

export const TextNode = ({ data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [detectedVariables, setDetectedVariables] = useState([]);

  // Detect variables like {{variable}}
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const matches = currText.match(regex) || [];
    const vars = matches.map(match => 
      match.replace(/\{\{\s*|\s*\}\}/g, '')
    );
    setDetectedVariables(vars);
    
    // Update node data with variables for handles
    if (data?.onVariablesChange) {
      data.onVariablesChange(vars);
    }
  }, [currText, data]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    
    if (data?.setText) {
      data.setText(newText);
    }
  };

  // Calculate dynamic height
  const textAreaHeight = Math.max(80, (currText.split('\n').length * 24));

  return (
    <BaseNode
      title="Text"
      icon={<FiFileText className="text-white" />}
      inputs={detectedVariables}
      outputs={["output"]}
      nodeColor="orange"
      isSelected={selected}
    >
      <div>
        <textarea
          value={currText}
          onChange={handleTextChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   resize-none"
          placeholder="Enter text... Use {{variable}} for inputs"
          style={{
            minHeight: '80px',
            height: `${textAreaHeight}px`
          }}
        />
        
        {detectedVariables.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <FiFileText className="w-3 h-3" />
              Detected variables:
            </p>
            <div className="flex flex-wrap gap-1">
              {detectedVariables.map((variable, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-orange-100 text-orange-800 
                           text-xs rounded-md"
                >
                  {variable}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  );
};