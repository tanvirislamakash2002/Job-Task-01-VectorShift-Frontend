// store.js
import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {}, // ✅ INITIALIZE nodeIDs here!
  
  getNodeID: (type) => {
    const currentIDs = get().nodeIDs; // ✅ Get current state
    const newIDs = { ...currentIDs };
    
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    
    set({ nodeIDs: newIDs }); // ✅ Update state
    return `${type}_${newIDs[type]}`;
  },
  
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
  
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  
  onConnect: (connection) => {
    set({
      edges: addEdge({
        ...connection, 
        type: 'smoothstep', 
        animated: true, 
        markerEnd: {
          type: MarkerType.Arrow, 
          height: '20px', 
          width: '20px'
        }
      }, get().edges),
    });
  },
  
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { 
              ...node.data, 
              [fieldName]: fieldValue 
            }
          };
        }
        return node;
      }),
    });
  },
  
  // ✅ Optional: Clear all nodes/edges
  clearPipeline: () => {
    set({
      nodes: [],
      edges: [],
      nodeIDs: {}
    });
  }
}));