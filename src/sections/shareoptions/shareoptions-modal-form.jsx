import React from 'react';
import PropTypes from 'prop-types';
import { Controller, FormProvider } from 'react-hook-form';

import { Box, Button, TextField } from '@mui/material';

const ShareOptionsModalForm = ({ methods, onSubmit }) => (
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
        name="IssueDate"
        control={methods.control}
        rules={{ required: 'Issue Date is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Issue Date"
            variant="outlined"
            type="date"
            defaultValue={fieldState.value}
            focused
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />
      <Controller
        name="NumberOfOptions"
        control={methods.control}
        rules={{
          required: 'Options Allocated is required',
          validate: (value) => value > 0 || 'Options Allocated must be greater than 0',
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Options Allocated"
            variant="outlined"
            type="number"
            inputProps={{ min: 0, step: 'any' }}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />

      <Controller
        name="MarketValue"
        control={methods.control}
        rules={{
          required: 'Market Value is required',
          validate: (value) => value > 0 || 'Market Value must be greater than 0',
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Market Value"
            variant="outlined"
            type="number"
            inputProps={{ min: 0, step: 'any' }}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />
      <Controller
        name="ExercisePrice"
        control={methods.control}
        rules={{
          required: 'Exercise Price is required',
          validate: (value) => value > 0 || 'Exercise Price must be greater than 0',
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Exercise Price"
            variant="outlined"
            type="number"
            inputProps={{ min: 0, step: 'any' }}
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

ShareOptionsModalForm.propTypes = {
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ShareOptionsModalForm;
