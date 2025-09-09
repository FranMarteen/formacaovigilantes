import { createTheme } from '@mui/material/styles';

const headingFamily =
  'var(--font-inter), Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const bodyFamily =
  'var(--font-inter), Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#DBA807', light: '#F0C53A', dark: '#B88C06', contrastText: '#0F172A' },
    secondary: { main: '#1B365D', light: '#2C5282', dark: '#153054', contrastText: '#FFFFFF' },
    success: { main: '#22C55E' },
    warning: { main: '#F59E0B' },
    error: { main: '#EF4444' },
    info: { main: '#60A5FA' },
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
    text: { primary: '#0A0A0A', secondary: '#6B7280' }
  },
  typography: {
    fontFamily: bodyFamily,
    h1: { fontFamily: headingFamily, fontWeight: 800, letterSpacing: '0.2px' },
    h2: { fontFamily: headingFamily, fontWeight: 800, letterSpacing: '0.2px' },
    h3: { fontFamily: headingFamily, fontWeight: 700 }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': {
          backgroundColor: 'rgba(219, 168, 7, 0.20)'
        }
      }
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 'var(--radius)'
        },
        containedPrimary: {
          backgroundColor: 'hsl(var(--primary))',
          '&:hover': { backgroundColor: 'hsl(var(--primary-hover))' },
          '&:active': { backgroundColor: 'hsl(var(--primary-active))' }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #1B365D 0%, #2C5282 100%)'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 600
        }
      }
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg'
      }
    }
  }
});

export default theme;
