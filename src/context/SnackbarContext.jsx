import PropTypes from 'prop-types';
import React, { useMemo, useState, useContext, useCallback, createContext } from 'react';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });

  const openSnackbar = useCallback((message, severity = 'info') => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((sb) => ({ ...sb, open: false }));
  }, []);

  const value = useMemo(
    () => ({ snackbar, openSnackbar, closeSnackbar }),
    [snackbar, openSnackbar, closeSnackbar]
  );

  return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>;
};

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSnackbar = () => useContext(SnackbarContext);
