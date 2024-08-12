import React from 'react';
import PropTypes from 'prop-types';

import TransitionsModal from 'src/components/modal/modal';

import ShareOptionsModalForm from './shareoptions-modal-form';

const ShareOptionsModal = ({ isOpen, handleToggle, loading, methods, onSubmit }) => {
  if (loading) return <h2>Loading...</h2>;
  return (
    <TransitionsModal isOpen={isOpen} handleToggle={handleToggle}>
      <h3 id="transition-modal-title" className="modal-title">
        Create Share Option
      </h3>
      <ShareOptionsModalForm methods={methods} onSubmit={onSubmit} />
    </TransitionsModal>
  );
};

ShareOptionsModal.propTypes = {
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
  loading: PropTypes.bool,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ShareOptionsModal;
