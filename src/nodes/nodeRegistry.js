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
    icon: "FiUpload",
    color: "blue",
    defaultInputs: [],
    defaultOutputs: ["value"]
  },
  [NODE_TYPES.OUTPUT]: {
    title: "Output",
    icon: "FiDownload",
    color: "green",
    defaultInputs: ["value"],
    defaultOutputs: []
  },
  [NODE_TYPES.LLM]: {
    title: "LLM",
    icon: "FiCpu",
    color: "purple",
    defaultInputs: ["system", "prompt"],
    defaultOutputs: ["response"]
  },
  [NODE_TYPES.TEXT]: {
    title: "Text",
    icon: "FiFileText",
    color: "orange",
    defaultInputs: [],
    defaultOutputs: ["output"]
  },
  [NODE_TYPES.CSV_INPUT]: {
    title: "CSV Input",
    icon: "FiFile",
    color: "lightBlue",
    defaultInputs: [],
    defaultOutputs: ["csv"]
  },
  [NODE_TYPES.JSON_OUTPUT]: {
    title: "JSON Output",
    icon: "FiCode",
    color: "lightGreen",
    defaultInputs: ["data"],
    defaultOutputs: []
  },
  [NODE_TYPES.PROMPT_LLM]: {
    title: "Prompt LLM",
    icon: "FiMessageSquare",
    color: "lightPurple",
    defaultInputs: ["prompt"],
    defaultOutputs: ["response"]
  },
  [NODE_TYPES.FILTER_TEXT]: {
    title: "Filter Text",
    icon: "FiFilter",
    color: "lightOrange",
    defaultInputs: ["text"],
    defaultOutputs: ["filtered"]
  },
  [NODE_TYPES.STATS]: {
    title: "Stats",
    icon: "FiBarChart2",
    color: "gray",
    defaultInputs: ["text"],
    defaultOutputs: ["stats"]
  }
};