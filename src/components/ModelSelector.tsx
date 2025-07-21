import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { fetchAvailableModels, SUGGESTED_MODELS } from '../services/ollamaService';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
}) => {
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadAvailableModels();
  }, []);

  const loadAvailableModels = async () => {
    const models = await fetchAvailableModels();
    setAvailableModels(models);
  };

  const handleModelChange = (model: string) => {
    onModelChange(model);
  };

  const getSuggestedModels = () => {
    return SUGGESTED_MODELS.filter(model => !availableModels.includes(model.name));
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120, backgroundColor: 'background.paper' }}>
          <InputLabel>Model</InputLabel>
          <Select
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            label="Model"
          >
            {availableModels.map((model) => (
              <MenuItem key={model} value={model}>
                {model}
                <Chip
                  size="small"
                  label="Installed"
                  color="success"
                  sx={{ ml: 1, height: 20 }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsDialogOpen(true)}
          sx={{ height: 40 }}
        >
          More Models
        </Button>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Available and Suggested Models</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Installed Models
          </Typography>
          <List>
            {availableModels.map((model) => (
              <ListItem key={model}>
                <ListItemText
                  primary={model}
                  secondary={
                    SUGGESTED_MODELS.find(m => m.name === model)?.description ||
                    'Custom installed model'
                  }
                />
                <Chip label="Installed" color="success" size="small" />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Suggested Models
          </Typography>
          <List>
            {getSuggestedModels().map((model) => (
              <ListItem key={model.name}>
                <ListItemText
                  primary={model.name}
                  secondary={model.description}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(`ollama pull ${model.name}`);
                  }}
                >
                  Copy Install Command
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          <Button
            onClick={() => {
              loadAvailableModels();
              setIsDialogOpen(false);
            }}
          >
            Refresh Models
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};