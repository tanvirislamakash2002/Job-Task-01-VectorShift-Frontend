// frontend/src/nodes/BaseNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

const BaseNode = ({ 
  title, 
  subtitle = "",
  icon = "",
  inputs = [], 
  outputs = [], 
  children,
  nodeColor = "blue",
  isSelected = false
}) => {
  const colorClasses = {
    blue: "border-blue-300 bg-blue-50",
    green: "border-green-300 bg-green-50", 
    purple: "border-purple-300 bg-purple-50",
    orange: "border-orange-300 bg-orange-50",
    gray: "border-gray-300 bg-gray-50"
  };

  const headerColors = {
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    purple: "bg-purple-600 text-white", 
    orange: "bg-orange-600 text-white",
    gray: "bg-gray-600 text-white"
  };

  return (
    <div className={`
      rounded-lg border-2 ${colorClasses[nodeColor]} 
      shadow-lg transition-all duration-200 w-64
      ${isSelected ? 'ring-2 ring-blue-400 ring-offset-1' : ''}
      hover:shadow-xl
    `}>
      {/* Node Header */}
      <div className={`
        ${headerColors[nodeColor]} px-4 py-3 rounded-t-lg
        flex items-center justify-between
      `}>
        <div className="flex items-center space-x-2">
          {icon && <span className="text-lg">{icon}</span>}
          <div>
            <h3 className="font-bold text-sm">{title}</h3>
            {subtitle && <p className="text-xs opacity-90">{subtitle}</p>}
          </div>
        </div>
        <div className="text-xs bg-white/20 px-2 py-1 rounded">
          Node
        </div>
      </div>

      {/* Input Handles */}
{inputs.map((inputId, index) => (
  <Handle
    key={`input-${inputId}-${index}`}  // Added index to key
    type="target"
    position={Position.Left}
    id={inputId}
    style={{
      top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
      background: '#555',
      width: '12px',
      height: '12px'
    }}
  />
))}

      {/* Node Content */}
      <div className="p-4">
        {children}
      </div>

      {/* Output Handles */}
{outputs.map((outputId, index) => (
  <Handle
    key={`output-${outputId}-${index}`}  // Added index to key
    type="source"
    position={Position.Right}
    id={outputId}
    style={{
      top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
      background: '#555',
      width: '12px',
      height: '12px'
    }}
  />
))}
    </div>
  );
};

export default BaseNode;