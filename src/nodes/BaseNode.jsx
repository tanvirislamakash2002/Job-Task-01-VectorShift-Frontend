import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  content,
  nodeType = 'default',
  className = '',
  titleColor = '#6366f1',
  showTitle = true,
  onTitleClick,
  customControls,
}) => {
  const nodeTypes = {
    input: { bg: 'bg-blue-50', border: 'border-blue-200' },
    output: { bg: 'bg-green-50', border: 'border-green-200' },
    llm: { bg: 'bg-purple-50', border: 'border-purple-200' },
    text: { bg: 'bg-yellow-50', border: 'border-yellow-200' },
    default: { bg: 'bg-gray-50', border: 'border-gray-200' },
  };

  const typeStyles = nodeTypes[nodeType] || nodeTypes.default;

  return (
    <div className={`rounded-lg shadow-sm border ${typeStyles.bg} ${typeStyles.border} ${className} min-w-[200px] max-w-[400px]`}>
      {/* Node Header */}
      {showTitle && (
        <div 
          className="px-4 py-3 rounded-t-lg border-b flex justify-between items-center cursor-pointer"
          style={{ backgroundColor: titleColor + '10', borderColor: titleColor + '30' }}
          onClick={onTitleClick}
        >
          <div className="font-medium text-sm truncate" style={{ color: titleColor }}>
            {title}
          </div>
          <div className="text-xs px-2 py-1 rounded" style={{ backgroundColor: titleColor, color: 'white' }}>
            {nodeType.toUpperCase()}
          </div>
        </div>
      )}

      {/* Input Handles (Left side) */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 -ml-2">
        {inputs.map((input, index) => (
          <Handle
            key={`input-${input.id || index}`}
            type="target"
            position={Position.Left}
            id={input.id || `input-${index}`}
            style={{
              background: input.color || '#3b82f6',
              border: '2px solid white',
              ...input.style
            }}
            className={input.className || ''}
          >
            {input.label && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xs font-medium whitespace-nowrap">
                {input.label}
              </div>
            )}
          </Handle>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-4">
        {content}
        {customControls && (
          <div className="mt-4 pt-4 border-t">
            {customControls}
          </div>
        )}
      </div>

      {/* Output Handles (Right side) */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 -mr-2">
        {outputs.map((output, index) => (
          <Handle
            key={`output-${output.id || index}`}
            type="source"
            position={Position.Right}
            id={output.id || `output-${index}`}
            style={{
              background: output.color || '#10b981',
              border: '2px solid white',
              ...output.style
            }}
            className={output.className || ''}
          >
            {output.label && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-medium whitespace-nowrap">
                {output.label}
              </div>
            )}
          </Handle>
        ))}
      </div>
    </div>
  );
};

export default BaseNode;