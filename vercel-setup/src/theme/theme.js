import { createTheme } from '@mui/material/styles';

const headingFamily =
  'var(--font-montserrat), Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const bodyFamily =
  'var(--font-open-sans), "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1B365D' },
    secondary: { main: '#D4AF37', contrastText: '#1B365D' },
    background: { default: '#ffffff' }
  },
  typography: {
    fontFamily: bodyFamily,
    h1: { fontFamily: headingFamily, fontWeight: 700 },
    h2: { fontFamily: headingFamily, fontWeight: 700 },
    h3: { fontFamily: headingFamily, fontWeight: 700 }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
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
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg'
      }
    }
  }
});

export default theme;
