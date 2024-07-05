import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, IconButton, Typography } from '@mui/material';

import Close from '../../assets/x.svg';


export const PreviewReport = ({ open, handleClose, pdfUrl }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '90vh',
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 10,
            color: 'black',
          }}
        >
           <img src={Close} alt="Download" width={30} height={30} />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          PDF Viewer
        </Typography>
        <Box sx={{ mt: 2, height: '100vh', width: '100%' }}>
          <iframe src={pdfUrl} width="100%" height="80%" title="PDF Viewer" />
        </Box>
      </Box>
    </Modal>
  );
};

PreviewReport.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  pdfUrl: PropTypes.string,
};
