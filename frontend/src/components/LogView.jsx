import React, { useState, useEffect } from 'react';

const LogView = () => {
  const [logs, setLogs] = useState([]);
  const [sessionId, setSessionId] = useState('default_session');

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`/api/history/${sessionId}`);
      const data = await response.json();
      setLogs(data);
    };

    const interval = setInterval(fetchHistory, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [sessionId]);

  return (
    <div className="w-1/3 bg-gray-900 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Task History</h2>
      <div>
        {logs.map((log, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-2 mb-2">
            <p><strong>User:</strong> {log.user_input}</p>
            <p><strong>Bot:</strong> {log.model_output}</p>
            <p className="text-xs text-gray-400">{log.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogView;