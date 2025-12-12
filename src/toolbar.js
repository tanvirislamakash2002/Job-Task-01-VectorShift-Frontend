// toolbar.js
import { DraggableNode } from './draggableNode';
import { NODE_TYPES, NODE_CONFIGS } from './nodes/nodeRegistry';

export const PipelineToolbar = () => {
  const nodeTypes = [
    { type: NODE_TYPES.INPUT, label: 'Input' },
    { type: NODE_TYPES.OUTPUT, label: 'Output' },
    { type: NODE_TYPES.LLM, label: 'LLM' },
    { type: NODE_TYPES.TEXT, label: 'Text' },
    // Your 5 new nodes
    { type: NODE_TYPES.CSV_INPUT, label: 'CSV Input' },
    { type: NODE_TYPES.JSON_OUTPUT, label: 'JSON Output' },
    { type: NODE_TYPES.PROMPT_LLM, label: 'Prompt LLM' },
    { type: NODE_TYPES.FILTER_TEXT, label: 'Filter Text' },
    { type: NODE_TYPES.STATS, label: 'Stats' },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 className="font-semibold text-gray-700 text-sm mb-2">Core Nodes</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <DraggableNode type={NODE_TYPES.INPUT} label='Input' />
          <DraggableNode type={NODE_TYPES.OUTPUT} label='Output' />
          <DraggableNode type={NODE_TYPES.LLM} label='LLM' />
          <DraggableNode type={NODE_TYPES.TEXT} label='Text' />
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-700 text-sm mb-2">Additional Nodes</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <DraggableNode type={NODE_TYPES.CSV_INPUT} label='CSV Input' />
          <DraggableNode type={NODE_TYPES.JSON_OUTPUT} label='JSON Output' />
          <DraggableNode type={NODE_TYPES.PROMPT_LLM} label='Prompt LLM' />
          <DraggableNode type={NODE_TYPES.FILTER_TEXT} label='Filter Text' />
          <DraggableNode type={NODE_TYPES.STATS} label='Stats' />
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Drag nodes onto the canvas</p>
        <p>Connect outputs to inputs</p>
      </div>
    </div>
  );
};