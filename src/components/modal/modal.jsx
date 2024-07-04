import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { styled } from '@mui/system';
import Fade from '@mui/material/Fade';
import { Modal as BaseModal } from '@mui/base/Modal';

export default function TransitionsModal({ isOpen, handleToggle, children }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    handleToggle(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={open}>
        <ModalContent sx={style}>{children}</ModalContent>
      </Fade>
    </Modal>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
};

const ModalContent = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0 4px 12px
    ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
  padding: 24px;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-bottom: 8px;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
    margin-bottom: 4px;
  }
`
);

TransitionsModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
};
