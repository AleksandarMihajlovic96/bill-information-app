import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import BillsPage from './pages/BillsPage/BillsPage';
import Header from './shared/Header/Header';
import { theme } from './theme/theme';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <BillsPage />
    </ThemeProvider>
  );
}

export default App;
