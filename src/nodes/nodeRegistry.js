// frontend/src/nodes/nodeRegistry.js
export const NODE_TYPES = {
  INPUT: 'customInput',
  OUTPUT: 'customOutput',
  LLM: 'llm',
  TEXT: 'text',
  CSV_INPUT: 'csvInput',
  JSON_OUTPUT: 'jsonOutput',
  PROMPT_LLM: 'promptLLM',
  FILTER_TEXT: 'filterText',
  STATS: 'statsNode'
};

export const NODE_CONFIGS = {
  [NODE_TYPES.INPUT]: {
    title: "Input",
    icon: "📥",
    color: "blue",
    defaultInputs: [],
    defaultOutputs: ["value"]
  },
  [NODE_TYPES.OUTPUT]: {
    title: "Output",
    icon: "📤",
    color: "green",
    defaultInputs: ["value"],
    defaultOutputs: []
  },
  [NODE_TYPES.LLM]: {
    title: "LLM",
    icon: "🤖",
    color: "purple",
    defaultInputs: ["system", "prompt"],
    defaultOutputs: ["response"]
  },
  [NODE_TYPES.TEXT]: {
    title: "Text",
    icon: "📝",
    color: "orange",
    defaultInputs: [],
    defaultOutputs: ["output"]
  },
  // Add your 5 new nodes here
  [NODE_TYPES.CSV_INPUT]: {
    title: "CSV Input",
    icon: "📊",
    color: "blue",
    defaultInputs: [],
    defaultOutputs: ["csv"]
  },
  [NODE_TYPES.JSON_OUTPUT]: {
    title: "JSON Output",
    icon: "{}",
    color: "green",
    defaultInputs: ["data"],
    defaultOutputs: []
  },
  [NODE_TYPES.PROMPT_LLM]: {
    title: "Prompt LLM",
    icon: "💬",
    color: "purple",
    defaultInputs: ["prompt"],
    defaultOutputs: ["response"]
  },
  [NODE_TYPES.FILTER_TEXT]: {
    title: "Filter Text",
    icon: "🔍",
    color: "orange",
    defaultInputs: ["text"],
    defaultOutputs: ["filtered"]
  },
  [NODE_TYPES.STATS]: {
    title: "Stats",
    icon: "📈",
    color: "gray",
    defaultInputs: ["text"],
    defaultOutputs: ["stats"]
  }
};