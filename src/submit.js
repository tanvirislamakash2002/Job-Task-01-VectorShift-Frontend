// submit.js
import React, { useState } from 'react';
import { useStore } from './store';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { 
  FiUpload, 
  FiCheckCircle, 
  FiAlertTriangle,
  FiRefreshCw,
  FiBarChart2,
  FiLink
} from 'react-icons/fi';

const MySwal = withReactContent(Swal);

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    setIsLoading(true);
    setResponse(null);
    
    try {
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
      
      // SweetAlert2 for success
      MySwal.fire({
        title: 'Pipeline Analysis Results',
        html: `
          <div style="text-align: left; margin: 1rem 0;">
            <p style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #10b981;">✓</span>
              <span><strong>Number of Nodes:</strong> ${result.num_nodes}</span>
            </p>
            <p style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #10b981;">✓</span>
              <span><strong>Number of Edges:</strong> ${result.num_edges}</span>
            </p>
            <p style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: ${result.is_dag ? '#10b981' : '#ef4444'};">${result.is_dag ? '✓' : '✗'}</span>
              <span><strong>Is DAG:</strong> ${result.is_dag ? 'Yes' : 'No'}</span>
            </p>
          </div>
          <hr style="margin: 1rem 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 0.9rem; color: #6b7280; text-align: left;">
            A Directed Acyclic Graph (DAG) means your pipeline has no cycles and data flows in one direction.
          </p>
        `,
        icon: result.is_dag ? 'success' : 'warning',
        iconColor: result.is_dag ? '#10b981' : '#f59e0b',
        confirmButtonText: 'OK',
        confirmButtonColor: result.is_dag ? '#10b981' : '#f59e0b',
        width: '500px',
        background: '#ffffff',
        color: '#1f2937',
        borderRadius: '12px',
        padding: '1.5rem'
      });

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      
      // SweetAlert2 for error
      MySwal.fire({
        title: 'Error Submitting Pipeline',
        html: `
          <p style="color: #7f1d1d; margin-bottom: 1rem;">${error.message}</p>
          <p style="font-size: 0.9rem; color: #6b7280; margin-bottom: 1rem;">
            Make sure the backend is running on http://localhost:8000
          </p>
          <div style="background: #1f2937; color: #f3f4f6; padding: 0.75rem; 
                   border-radius: 0.5rem; margin-top: 1rem; font-family: monospace; 
                   font-size: 0.85rem; text-align: center;">
            cd backend && uvicorn main:app --reload
          </div>
        `,
        icon: 'error',
        iconColor: '#dc2626',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626',
        width: '500px'
      });
      
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
            <FiRefreshCw className="w-5 h-5 animate-spin" />
            <span>Analyzing Pipeline...</span>
          </>
        ) : response ? (
          <>
            <FiCheckCircle className="w-5 h-5" />
            <span>Submit Again</span>
          </>
        ) : (
          <>
            <FiUpload className="w-5 h-5" />
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
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <FiBarChart2 className="w-4 h-4 text-gray-500" />
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nodes
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {response.num_nodes}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <FiLink className="w-4 h-4 text-gray-500" />
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Edges
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {response.num_edges}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                {response.is_dag ? (
                  <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <FiAlertTriangle className="w-4 h-4 text-rose-500" />
                )}
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Is DAG
                </div>
              </div>
              <div className={`text-2xl font-bold ${response.is_dag ? 'text-emerald-600' : 'text-rose-600'}`}>
                {response.is_dag ? '✓ Yes' : '✗ No'}
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border-l-4 flex items-start gap-3 ${response.is_dag ? 'bg-emerald-50 border-emerald-400' : 'bg-amber-50 border-amber-400'}`}>
            {response.is_dag ? (
              <FiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <FiAlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <p className="text-sm text-gray-700">
              {response.is_dag ? (
                <>Your pipeline is a valid Directed Acyclic Graph (DAG). Data flows properly without cycles.</>
              ) : (
                <>Your pipeline contains cycles. Data may flow in loops, which could cause issues.</>
              )}
            </p>
          </div>
        </div>
      )}
      
      {response?.error && (
        <div className="mt-6 w-full bg-rose-50 rounded-xl p-5 border border-rose-200">
          <h3 className="text-lg font-semibold text-rose-700 mb-3 flex items-center gap-2">
            <FiAlertTriangle className="w-5 h-5" />
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
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <FiUpload className="w-3 h-3 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium mb-1">
              What happens when you click Submit?
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Pipeline data is sent to the backend
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Backend calculates nodes, edges, and checks for cycles
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Results are displayed in an alert and below
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Pipeline Stats Summary */}
      <div className="mt-4 w-full">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <FiBarChart2 className="w-4 h-4" />
              <span>Current Nodes:</span>
            </div>
            <span className="font-bold text-blue-800">{nodes.length}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 text-purple-700">
              <FiLink className="w-4 h-4" />
              <span>Current Edges:</span>
            </div>
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