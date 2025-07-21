import { ThemeProvider, createTheme, CssBaseline, Box, useMediaQuery } from '@mui/material';
import { Chat } from './components/Chat';
import { useState, useMemo } from 'react';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: '#2196f3',
          },
          background: {
            default: isDarkMode ? '#121212' : '#f5f5f5',
            paper: isDarkMode ? '#1e1e1e' : '#ffffff',
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', bgcolor: 'background.default' }}>
        <Chat onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
