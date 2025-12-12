// draggableNode.js
import { NODE_CONFIGS } from './nodes/nodeRegistry';

export const DraggableNode = ({ type, label }) => {
  const nodeConfig = NODE_CONFIGS[type] || {};
  const colorClass = nodeConfig.color || 'blue';
  
  const colorMap = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    gray: 'bg-gray-600 hover:bg-gray-700'
  };

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`
        ${colorMap[colorClass]}
        cursor-grab active:cursor-grabbing
        min-w-[80px] h-15
        flex items-center justify-center flex-col
        rounded-lg shadow-md hover:shadow-lg
        transition-all duration-200 ease-in-out
        p-3
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {nodeConfig.icon && (
        <span className="text-white text-lg mb-1">
          {nodeConfig.icon}
        </span>
      )}
      <span className="text-white text-sm font-medium text-center">
        {label}
      </span>
      <span className="text-white/80 text-xs mt-1">
        {nodeConfig.defaultInputs?.length || 0} in / {nodeConfig.defaultOutputs?.length || 0} out
      </span>
    </div>
  );
};