// Global Material UI theme configuration
// Centralized styling for colors, typography and layout consistency
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#424242',      // Dark Gray
      light: '#6d6d6d',     // Medium Gray
      dark: '#1b1b1b',      // Almost Black
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#757575',      // Medium Gray
      light: '#a4a4a4',     // Light Gray
      dark: '#494949',      // Darker Gray
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',   // Very Light Gray
      paper: '#ffffff',     // White for cards
    },
    text: {
      primary: '#212121',   // Almost Black
      secondary: '#757575', // Gray
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8, 
  },
});