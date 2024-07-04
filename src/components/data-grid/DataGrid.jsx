import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function DataGridTable({
  checkboxSelection,
  data,
  columns = [],
  rows = [],
  loading = false,
  handleOnCellClick = () => {},
}) {
  return (
    <Box sx={{ height: '70vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        onCellClick={handleOnCellClick}
        loading={loading}
      />
    </Box>
  );
}

DataGridTable.propTypes = {
  checkboxSelection: PropTypes.bool,
  loading: PropTypes.bool,
  data: PropTypes.array,
  columns: PropTypes.array,
  rows: PropTypes.array,
  handleOnCellClick: PropTypes.func,
};
