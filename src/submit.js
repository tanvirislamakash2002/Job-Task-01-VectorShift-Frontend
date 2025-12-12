// submit.js
import React, { useState, useEffect } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { nodes, edges } = useStore();

  // Add CSS animation for spinner
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const hasAnimation = Array.from(styleSheet.cssRules).some(
      rule => rule.name === 'spin'
    );
    
    if (!hasAnimation) {
      styleSheet.insertRule(`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `, styleSheet.cssRules.length);
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      // Prepare data for backend
      const pipelineData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        }))
      };

      // Send to backend (Part 4 requirement)
      const backendResponse = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData),
      });

      if (!backendResponse.ok) {
        throw new Error(`HTTP error! status: ${backendResponse.status}`);
      }

      const result = await backendResponse.json();
      setResponse(result);
      
      // Show alert with results (Part 4 requirement)
      alert(
        `Pipeline Analysis Results:\n\n` +
        `✅ Number of Nodes: ${result.num_nodes}\n` +
        `✅ Number of Edges: ${result.num_edges}\n` +
        `✅ Is DAG: ${result.is_dag ? 'Yes' : 'No'}\n\n` +
        `A Directed Acyclic Graph (DAG) means your pipeline has no cycles and data flows in one direction.`
      );

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error submitting pipeline: ${error.message}\n\nMake sure the backend is running on http://localhost:8000`);
      setResponse({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <button 
        onClick={handleSubmit}
        disabled={isLoading}
        className={`
          flex items-center justify-center gap-2.5
          px-8 py-3.5
          text-white font-semibold text-base
          rounded-xl shadow-lg
          transition-all duration-300 ease-in-out
          min-w-[200px]
          disabled:cursor-not-allowed disabled:opacity-80
          ${isLoading 
            ? 'bg-gray-500 hover:bg-gray-600' 
            : response 
              ? 'bg-gradient-to-br from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500' 
              : 'bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          }
          hover:shadow-xl active:scale-[0.98]
        `}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Analyzing Pipeline...</span>
          </>
        ) : response ? (
          <>
            <span className="text-lg">✓</span>
            <span>Submit Again</span>
          </>
        ) : (
          <>
            <span className="text-lg">📤</span>
            <span>Submit Pipeline</span>
          </>
        )}
      </button>
      
      {response && !response.error && (
        <div className="mt-6 w-full bg-white rounded-xl shadow-lg p-5 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 text-center">
            Pipeline Analysis Results
          </h3>
          
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Nodes
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {response.num_nodes}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Edges
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {response.num_edges}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Is DAG
              </div>
              <div className={`text-2xl font-bold ${response.is_dag ? 'text-emerald-600' : 'text-rose-600'}`}>
                {response.is_dag ? '✓ Yes' : '✗ No'}
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border-l-4 ${response.is_dag ? 'bg-emerald-50 border-emerald-400' : 'bg-amber-50 border-amber-400'}`}>
            <p className="text-sm text-gray-700">
              {response.is_dag ? (
                <>✅ Your pipeline is a valid Directed Acyclic Graph (DAG). Data flows properly without cycles.</>
              ) : (
                <>⚠️ Your pipeline contains cycles. Data may flow in loops, which could cause issues.</>
              )}
            </p>
          </div>
        </div>
      )}
      
      {response?.error && (
        <div className="mt-6 w-full bg-rose-50 rounded-xl p-5 border border-rose-200">
          <h3 className="text-lg font-semibold text-rose-700 mb-3">
            Error
          </h3>
          <p className="text-rose-800 mb-4 text-sm">
            {response.error}
          </p>
          <div className="text-gray-600 text-sm">
            <p className="mb-2">Make sure the backend server is running:</p>
            <code className="block bg-gray-800 text-gray-100 px-3 py-2 rounded text-xs font-mono">
              cd backend && uvicorn main:app --reload
            </code>
          </div>
        </div>
      )}
      
      <div className="mt-6 w-full p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-sm text-gray-600">
          <strong className="text-gray-700">What happens when you click Submit?</strong><br/>
          <span className="block mt-1">1. Pipeline data is sent to the backend</span>
          <span className="block">2. Backend calculates nodes, edges, and checks for cycles</span>
          <span className="block">3. Results are displayed in an alert and below</span>
        </p>
      </div>
      
      {/* Pipeline Stats Summary */}
      <div className="mt-4 w-full">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-blue-700">Current Nodes:</span>
            <span className="font-bold text-blue-800">{nodes.length}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <span className="text-purple-700">Current Edges:</span>
            <span className="font-bold text-purple-800">{edges.length}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Build your pipeline, then click Submit to analyze
        </p>
      </div>
    </div>
  );
};