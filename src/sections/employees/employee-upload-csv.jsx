import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button } from '@mui/material';

const EmployeeUploadCSV = ({ onDownloadClick, handleFileChange }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
    <Box sx={{ my: 2 }}>
      <Button variant="contained" onClick={onDownloadClick}>
        Download CSV Template
      </Button>
    </Box>
    <Box>
      <Button variant="contained" component="label">
        Upload CSV
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
    </Box>
  </Box>
);

EmployeeUploadCSV.propTypes = {
  onDownloadClick: PropTypes.func,
  handleFileChange: PropTypes.func,
};

export default EmployeeUploadCSV;
