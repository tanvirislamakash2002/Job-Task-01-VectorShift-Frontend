import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-gray-800">VectorShift</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Pipeline Builder
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Frontend Technical Assessment
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Drag nodes from the toolbar onto the canvas. Connect them to build your pipeline.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Toolbar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <h2 className="font-semibold text-gray-700 mb-4 text-lg">Node Library</h2>
            <PipelineToolbar />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-4 text-lg">Pipeline Actions</h2>
            <SubmitButton />
            <div className="mt-4 text-xs text-gray-500">
              <p>Click submit to analyze your pipeline structure.</p>
              <p className="mt-2">Nodes: Inputs, LLMs, Text, Outputs</p>
              <p>Connections define data flow.</p>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Pipeline Canvas</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    Ready
                  </span>
                </div>
              </div>
            </div>
            <PipelineUI />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>Drag nodes onto the canvas. Connect outputs to inputs. Click submit to validate.</p>
      </footer>
    </div>
  );
}

export default App;