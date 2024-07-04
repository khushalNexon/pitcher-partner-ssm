/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { SnackbarProvider } from './context/SnackbarContext';
import CustomSnackbar from './components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <SnackbarProvider>
        <Router />
        <CustomSnackbar />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
