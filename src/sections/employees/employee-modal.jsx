import React from 'react';
import PropTypes from 'prop-types';
import { Controller, FormProvider } from 'react-hook-form';

import { Box, Button, TextField } from '@mui/material';

import TransitionsModal from 'src/components/modal/modal';

const EmployeeModal = ({ methods, isOpen, handleToggle, onSubmit, loading }) => {
  console.log(methods, isOpen, handleToggle, onSubmit, 'methods, isOpen, handleToggle, onSubmit');
  if (loading) return <h2>Loading...</h2>;
  return (
    <TransitionsModal isOpen={isOpen} handleToggle={handleToggle}>
      <h3 id="transition-modal-title" className="modal-title">
        Create New Employee
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
            name="EmployeeABNNo"
            control={methods.control}
            rules={{ required: 'EmployeeABNNo is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="EmployeeABNNo"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />
          <Controller
            name="EmployeeTFNNo"
            control={methods.control}
            rules={{ required: 'EmployeeTFNNo is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="EmployeeTFNNo"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />

          <Controller
            name="EmployeeFullName"
            control={methods.control}
            rules={{ required: 'EmployeeFullName is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="EmployeeFullName"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />
          <Controller
            name="EmployeeAddressLine1"
            control={methods.control}
            rules={{ required: 'EmployeeAddressLine1 is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="EmployeeAddressLine1"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />
          <Controller
            name="EmployeeAddressLine2"
            control={methods.control}
            // rules={{ required: 'EmployeeAddressLine2 is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="EmployeeAddressLine2"
                variant="outlined"
                error={!!fieldState.error}
                // helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />

          <Controller
            name="EmployeeEmail"
            control={methods.control}
            rules={{ required: 'EmployeeEmail is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="email"
                label="EmployeeEmail"
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

EmployeeModal.propTypes = {
  methods: PropTypes.object,
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

export default EmployeeModal;
