// toolbar.js
import { DraggableNode } from './draggableNode';
import { NODE_TYPES } from './nodes/nodeRegistry';

export const PipelineToolbar = () => {
  const coreNodes = [
    { type: NODE_TYPES.INPUT, label: 'Input' },
    { type: NODE_TYPES.OUTPUT, label: 'Output' },
    { type: NODE_TYPES.LLM, label: 'LLM' },
    { type: NODE_TYPES.TEXT, label: 'Text' },
  ];

  const customNodes = [
    { type: NODE_TYPES.CSV_INPUT, label: 'CSV Input' },
    { type: NODE_TYPES.JSON_OUTPUT, label: 'JSON Output' },
    { type: NODE_TYPES.PROMPT_LLM, label: 'Prompt LLM' },
    { type: NODE_TYPES.FILTER_TEXT, label: 'Filter Text' },
    { type: NODE_TYPES.STATS, label: 'Stats' },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 text-sm mb-3 uppercase tracking-wide text-gray-500">
          Core Nodes
        </h3>
        <div className="flex flex-wrap gap-3">
          {coreNodes.map((node) => (
            <DraggableNode 
              key={node.type} 
              type={node.type} 
              label={node.label} 
            />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 text-sm mb-3 uppercase tracking-wide text-gray-500">
          Custom Nodes
        </h3>
        <div className="flex flex-wrap gap-3">
          {customNodes.map((node) => (
            <DraggableNode 
              key={node.type} 
              type={node.type} 
              label={node.label} 
            />
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-start space-x-2 text-xs text-gray-500 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
          <span>Drag nodes onto canvas</span>
        </div>
        <div className="flex items-start space-x-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
          <span>Connect outputs (right) to inputs (left)</span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 text-xs mb-2">Node Stats</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-gray-600">Total Types:</div>
          <div className="text-gray-800 font-medium">{coreNodes.length + customNodes.length}</div>
          
          <div className="text-gray-600">Core Nodes:</div>
          <div className="text-gray-800 font-medium">{coreNodes.length}</div>
          
          <div className="text-gray-600">Custom Nodes:</div>
          <div className="text-gray-800 font-medium">{customNodes.length}</div>
        </div>
      </div>
    </div>
  );
};