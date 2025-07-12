import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatWindow from './components/ChatWindow'
import LogView from './components/LogView'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="flex h-screen bg-gray-900 text-white">
      <ChatWindow />
      <LogView />
    </div>
  </React.StrictMode>,
)