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
    blue: "border-blue-600 bg-blue-100",
    lightBlue: "border-blue-400 bg-blue-50",
    green: "border-green-600 bg-green-100",
    lightGreen: "border-green-400 bg-green-50",
    purple: "border-purple-600 bg-purple-100",
    lightPurple: "border-purple-400 bg-purple-50",
    orange: "border-orange-600 bg-orange-100",
    lightOrange: "border-orange-400 bg-orange-50",
    gray: "border-gray-600 bg-gray-100"
  };

  const headerColors = {
    blue: "bg-blue-600 text-white",
    lightBlue: "bg-blue-400 text-white",      
    green: "bg-green-600 text-white",
    lightGreen: "bg-green-400 text-white",    
    purple: "bg-purple-600 text-white",
    lightPurple: "bg-purple-400 text-white",  
    orange: "bg-orange-600 text-white",
    lightOrange: "bg-orange-400 text-white",  
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
          key={`input-${inputId}-${index}`}
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
          key={`output-${outputId}-${index}`}
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