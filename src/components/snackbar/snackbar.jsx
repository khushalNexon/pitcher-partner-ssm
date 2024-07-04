import React, { memo } from 'react';

import { Alert, Snackbar } from '@mui/material';

import { useSnackbar } from 'src/context/SnackbarContext';

const CustomSnackbar = () => {
  const { snackbar, closeSnackbar } = useSnackbar();

  console.log(snackbar, closeSnackbar, 'snackbar, closeSnackbar');

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackbar.message ?? ''}
      </Alert>
    </Snackbar>
  );
};

export default memo(CustomSnackbar);
