interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_HISTORY_KEY = 'chat_history';

export const storageService = {
  saveMessages: (messages: Message[]) => {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  },

  loadMessages: (): Message[] => {
    try {
      const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  },

  clearMessages: () => {
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  }
};