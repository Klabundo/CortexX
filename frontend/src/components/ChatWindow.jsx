import React, { useState, useEffect } from 'react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('default_session');

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);

      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input, session_id: sessionId }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: 'bot', text: data.response }]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col w-2/3 p-4">
      <div className="flex-grow overflow-y-auto bg-gray-800 rounded-lg p-4 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow bg-gray-700 rounded-l-lg p-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="bg-blue-600 rounded-r-lg px-4">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;