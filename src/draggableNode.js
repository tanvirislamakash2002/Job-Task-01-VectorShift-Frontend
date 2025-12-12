// draggableNode.js
export const DraggableNode = ({ type, label }) => {
  // Define color mapping directly (safer than relying on registry)
  const getColorClass = (nodeType) => {
    const colorMap = {
      // Core nodes (from ui.js)
      'customInput': 'bg-blue-600 hover:bg-blue-700 border-blue-500',
      'customOutput': 'bg-green-600 hover:bg-green-700 border-green-500',
      'llm': 'bg-purple-600 hover:bg-purple-700 border-purple-500',
      'text': 'bg-orange-600 hover:bg-orange-700 border-orange-500',
      // Custom nodes (from ui.js)
      'csvInput': 'bg-blue-500 hover:bg-blue-600 border-blue-400',
      'jsonOutput': 'bg-green-500 hover:bg-green-600 border-green-400',
      'promptLLM': 'bg-purple-500 hover:bg-purple-600 border-purple-400',
      'filterText': 'bg-orange-500 hover:bg-orange-600 border-orange-400',
      'statsNode': 'bg-gray-600 hover:bg-gray-700 border-gray-500',
    };
    return colorMap[nodeType] || 'bg-gray-600 hover:bg-gray-700 border-gray-500';
  };

  const getIcon = (nodeType) => {
    const iconMap = {
      'customInput': '📥',
      'customOutput': '📤',
      'llm': '🤖',
      'text': '📝',
      'csvInput': '📊',
      'jsonOutput': '{}',
      'promptLLM': '💬',
      'filterText': '🔍',
      'statsNode': '📈',
    };
    return iconMap[nodeType] || '📦';
  };

  const getPortCount = (nodeType) => {
    const portMap = {
      'customInput': { in: 0, out: 1 },
      'customOutput': { in: 1, out: 0 },
      'llm': { in: 2, out: 1 },
      'text': { in: 0, out: 1 },
      'csvInput': { in: 0, out: 1 },
      'jsonOutput': { in: 1, out: 0 },
      'promptLLM': { in: 1, out: 1 },
      'filterText': { in: 1, out: 1 },
      'statsNode': { in: 1, out: 1 },
    };
    return portMap[nodeType] || { in: 0, out: 0 };
  };

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const ports = getPortCount(type);

  return (
    <div
      className={`
        ${getColorClass(type)}
        cursor-grab active:cursor-grabbing
        min-w-[85px] h-[75px]
        flex flex-col items-center justify-center
        rounded-lg shadow-md hover:shadow-lg
        transition-all duration-200 ease-in-out
        p-2 border-2
        transform hover:-translate-y-0.5
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.target.classList.remove('cursor-grabbing');
        event.target.classList.add('cursor-grab');
      }}
      draggable
    >
      <span className="text-white text-lg mb-1">
        {getIcon(type)}
      </span>
      <span className="text-white text-sm font-medium text-center">
        {label}
      </span>
      <div className="flex gap-2 mt-1">
        <span className="text-white/80 text-xs bg-black/20 px-1 rounded">
          {ports.in} in
        </span>
        <span className="text-white/80 text-xs bg-black/20 px-1 rounded">
          {ports.out} out
        </span>
      </div>
    </div>
  );
};