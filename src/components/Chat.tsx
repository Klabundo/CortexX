import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Container,
  CircularProgress,
  AppBar,
  Toolbar,
  FormControlLabel,
  Switch,
  Button,
  Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import axios from 'axios';
import { ModelSelector } from './ModelSelector';
import { storageService } from '../services/storageService';
import DeleteIcon from '@mui/icons-material/Delete';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export const Chat: React.FC<ChatProps> = ({ onToggleDarkMode, isDarkMode }) => {
  const [messages, setMessages] = useState<Message[]>(storageService.loadMessages());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama2');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    storageService.saveMessages(messages);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: selectedModel,
        prompt: input,
        stream: false
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Ollama:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Agentic Chat
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="Chat-Historie löschen">
                <IconButton
                  onClick={() => {
                    setMessages([]);
                    storageService.clearMessages();
                  }}
                  color="inherit"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDarkMode}
                    onChange={onToggleDarkMode}
                    icon={<LightModeIcon />}
                    checkedIcon={<DarkModeIcon />}
                  />
                }
                label={isDarkMode ? 'Dark' : 'Light'}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ flex: 1, py: 2, display: 'flex', flexDirection: 'column' }}>
        <Paper 
          elevation={3} 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            p: 2, 
            mb: 2, 
            overflow: 'hidden',
            bgcolor: 'background.paper' 
          }}
        >
          <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    backgroundColor: message.role === 'user' ? 'primary.main' : 'background.default',
                    color: message.role === 'user' ? 'white' : 'text.primary'
                  }}
                >
                  <Typography>{message.content}</Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              multiline
              maxRows={4}
              disabled={isLoading}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={isLoading}
              sx={{ width: 56, height: 56 }}
            >
              {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};