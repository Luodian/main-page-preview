import React, { useState, useEffect } from "react";

interface Props {
  title?: string;
  language?: string;
  editable?: boolean;
}

const LiveCodeEditor: React.FC<Props> = ({
  title,
  language = "javascript",
  editable = true,
}) => {
  const [code, setCode] = useState(
    '// Write your code here\nconsole.log("Hello, World!");'
  );
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      // Simple JavaScript execution (in a real app, use a sandbox)
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  return (
    <div className="my-6 border border-accent-base/20 rounded-lg overflow-hidden">
      {title && (
        <div className="bg-accent-base/5 px-4 py-2 border-b border-accent-base/20">
          <h4 className="font-semibold text-accent-base">{title}</h4>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Code Editor */}
        <div className="border-b lg:border-b-0 lg:border-r border-accent-base/20">
          <div className="p-2 bg-gray-50 border-b border-accent-base/20 text-xs font-medium text-gray-600">
            Code Editor
          </div>
          {editable ? (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 p-4 font-mono text-sm resize-none focus:outline-none bg-gray-900 text-green-400"
              spellCheck="false"
            />
          ) : (
            <pre className="h-48 p-4 overflow-auto bg-gray-900 text-green-400">
              <code>{code}</code>
            </pre>
          )}

          {editable && (
            <div className="p-2 border-t border-accent-base/20">
              <button
                onClick={runCode}
                className="px-3 py-1 bg-accent-base text-white rounded text-sm font-medium hover:brightness-110 transition-all"
              >
                Run Code
              </button>
            </div>
          )}
        </div>

        {/* Output */}
        <div>
          <div className="p-2 bg-gray-50 border-b border-accent-base/20 text-xs font-medium text-gray-600">
            Output
          </div>
          <div className="h-48 p-4 bg-white border font-mono text-sm overflow-auto">
            {output || 'Click "Run Code" to see output...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCodeEditor;
