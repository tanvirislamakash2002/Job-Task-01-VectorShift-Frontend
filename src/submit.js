// submit.js
import React, { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { nodes, edges } = useStore();

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
    <div style={styles.container}>
      <button 
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          ...styles.button,
          ...(isLoading ? styles.buttonLoading : {}),
          ...(response ? styles.buttonSuccess : {})
        }}
      >
        {isLoading ? (
          <>
            <span style={styles.spinner}></span>
            Analyzing Pipeline...
          </>
        ) : response ? (
          <>
            <span style={styles.icon}>✓</span>
            Submit Again
          </>
        ) : (
          <>
            <span style={styles.icon}>📤</span>
            Submit Pipeline
          </>
        )}
      </button>
      
      {response && !response.error && (
        <div style={styles.resultCard}>
          <h3 style={styles.resultTitle}>Pipeline Analysis Results</h3>
          <div style={styles.resultsGrid}>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Nodes</div>
              <div style={styles.resultValue}>{response.num_nodes}</div>
            </div>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Edges</div>
              <div style={styles.resultValue}>{response.num_edges}</div>
            </div>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Is DAG</div>
              <div style={{
                ...styles.resultValue,
                color: response.is_dag ? '#10b981' : '#ef4444'
              }}>
                {response.is_dag ? '✓ Yes' : '✗ No'}
              </div>
            </div>
          </div>
          <div style={styles.explanation}>
            {response.is_dag ? (
              <p>✅ Your pipeline is a valid Directed Acyclic Graph (DAG). Data flows properly without cycles.</p>
            ) : (
              <p>⚠️ Your pipeline contains cycles. Data may flow in loops, which could cause issues.</p>
            )}
          </div>
        </div>
      )}
      
      {response?.error && (
        <div style={styles.errorCard}>
          <h3 style={styles.errorTitle}>Error</h3>
          <p style={styles.errorMessage}>{response.error}</p>
          <p style={styles.helpText}>
            Make sure the backend server is running:<br/>
            <code style={styles.code}>cd backend && uvicorn main:app --reload</code>
          </p>
        </div>
      )}
      
      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          <strong>What happens when you click Submit?</strong><br/>
          1. Pipeline data is sent to the backend<br/>
          2. Backend calculates nodes, edges, and checks for cycles<br/>
          3. Results are displayed in an alert and below
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2)',
    minWidth: '200px'
  },
  buttonLoading: {
    background: '#6b7280',
    cursor: 'not-allowed',
    opacity: 0.8
  },
  buttonSuccess: {
    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  icon: {
    fontSize: '18px'
  },
  resultCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '24px',
    width: '100%',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e5e7eb'
  },
  resultTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '20px',
    textAlign: 'center'
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '20px'
  },
  resultItem: {
    textAlign: 'center',
    padding: '12px',
    background: '#f9fafb',
    borderRadius: '8px'
  },
  resultLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  resultValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827'
  },
  explanation: {
    padding: '12px',
    background: '#f0f9ff',
    borderRadius: '8px',
    borderLeft: '4px solid #3b82f6'
  },
  errorCard: {
    background: '#fef2f2',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '24px',
    width: '100%',
    border: '1px solid #fecaca'
  },
  errorTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: '12px'
  },
  errorMessage: {
    color: '#7f1d1d',
    marginBottom: '16px',
    fontSize: '14px'
  },
  helpText: {
    color: '#6b7280',
    fontSize: '13px',
    lineHeight: '1.5'
  },
  code: {
    background: '#1f2937',
    color: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    marginTop: '8px',
    display: 'inline-block'
  },
  infoBox: {
    marginTop: '24px',
    padding: '16px',
    background: '#f8fafc',
    borderRadius: '8px',
    border: '1px dashed #cbd5e1',
    width: '100%'
  },
  infoText: {
    color: '#475569',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0
  }
};

// Add CSS animation for spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);