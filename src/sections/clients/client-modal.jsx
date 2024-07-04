import React from 'react';
import PropTypes from 'prop-types';
import { Controller, FormProvider } from 'react-hook-form';

import { Box, Button, TextField } from '@mui/material';

import TransitionsModal from 'src/components/modal/modal';

const ClientModal = ({ methods, isOpen, handleToggle, onSubmit, loading }) => {
  
  if (loading) return <h2>Loading...</h2>;

  return (
    <TransitionsModal isOpen={isOpen} handleToggle={handleToggle}>
      <h3 id="transition-modal-title" className="modal-title">
        Create New Client
      </h3>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            margin: 'auto',
          }}
        >
          <Controller
            name="ClientABNNo"
            control={methods.control}
            rules={{ required: 'ClientABNNo is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="ClientABNNo"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />

          <Controller
            name="ClientName"
            control={methods.control}
            rules={{ required: 'ClientName is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="ClientName"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />

          <Controller
            name="ClientEmail"
            control={methods.control}
            rules={{ required: 'ClientEmail is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="email"
                label="ClientEmail"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </FormProvider>
    </TransitionsModal>
  );
};

ClientModal.propTypes = {
  methods: PropTypes.object,
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

export default ClientModal;
