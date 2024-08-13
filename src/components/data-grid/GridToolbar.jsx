import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/system';
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const GridToolbar = ({ onChange }) => (
  <GridToolbarContainer>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton />
      </Box>
      <GridToolbarQuickFilter />
    </Box>
  </GridToolbarContainer>
);

GridToolbar.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default GridToolbar;
