import React from 'react';
import PropTypes from 'prop-types';
import { Controller, FormProvider } from 'react-hook-form';

import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

import { ausStates } from 'src/utils/australia-states';

const EmployeeIndividualForm = ({ methods, onSubmit }) => (
  <FormProvider {...methods}>
    <Box
      component="form"
      onSubmit={methods.handleSubmit(onSubmit)}
      sx={{
        paddingTop: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        margin: 'auto',
        maxHeight: '60vh',
        overflowY: 'auto',
      }}
    >
      <Controller
        name="EmployeeABNNo"
        control={methods.control}
        rules={{ required: 'Employee ABN No is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Employee ABN No"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />
      <Controller
        name="EmployeeTFNNo"
        control={methods.control}
        rules={{ required: 'Employee TFN No is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Employee TFN No"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />

      <Controller
        name="EmployeeFullName"
        control={methods.control}
        rules={{ required: 'Employee Full Name is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Employee Full Name"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />
      <Controller
        name="EmployeeAddressLine1"
        control={methods.control}
        rules={{ required: 'Street Address Line 1 is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Street Address Line 1"
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
            label="Street Address Line 2"
            variant="outlined"
            error={!!fieldState.error}
            // helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />
      <Controller
        name="Suburb"
        control={methods.control}
        // rules={{ required: 'Suburb is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Suburb"
            variant="outlined"
            error={!!fieldState.error}
            // helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />
      <Controller
        name="State"
        control={methods.control}
        rules={{ required: 'State is required' }}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error}>
            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
            <Select
              {...field}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Age"
              // onChange={handleChange}
            >
              {ausStates.map((state) => (
                <MenuItem key={state.code} value={state.code}>
                  {state.code} - {state.name}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error ? fieldState.error.message : ''}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="PostalCode"
        control={methods.control}
        rules={{ required: 'Postal Code is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Postal Code"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />

      <Controller
        name="EmployeeEmail"
        control={methods.control}
        rules={{ required: 'Employee Email is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="email"
            label="Employee Email"
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
);

EmployeeIndividualForm.propTypes = {
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default EmployeeIndividualForm;
