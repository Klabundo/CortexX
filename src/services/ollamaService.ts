import axios from 'axios';

interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
}

export const fetchAvailableModels = async (): Promise<string[]> => {
  try {
    const response = await axios.get('http://localhost:11434/api/tags');
    return response.data.models.map((model: OllamaModel) => model.name);
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
};

export const SUGGESTED_MODELS = [
  { name: 'llama2', description: 'General purpose chat model' },
  { name: 'codellama', description: 'Specialized for code generation and analysis' },
  { name: 'mistral', description: 'Advanced language model with strong performance' },
  { name: 'neural-chat', description: 'Optimized for natural conversations' },
  { name: 'starling-lm', description: 'High-quality response generation' },
  { name: 'dolphin-mistral', description: 'Enhanced conversational abilities' },
];