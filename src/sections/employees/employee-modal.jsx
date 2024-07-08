import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';

import TransitionsModal from 'src/components/modal/modal';

import EmployeeUploadCSV from './employee-upload-csv';
import EmployeeNotification from './employee-notification';
import EmployeeIndividualForm from './employee-individual-form';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: '10px 0px 0px' }}>{children}</Box>}
    </div>
  );
}

const EmployeeModal = ({
  methods,
  error,
  isOpen,
  handleToggle,
  onSubmit,
  loading,
  handleDownload,
  handleFileChange,
  warningList,
}) => {

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) return <h2>Loading...</h2>;
  return (
    <TransitionsModal isOpen={isOpen} handleToggle={handleToggle}>
      <h3 id="transition-modal-title" className="modal-title">
        Create New Employee
      </h3>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="Create New Employee" centered>
          <Tab label="Create Individual" {...a11yProps(0)} />
          <Tab label="Upload CSV" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0} sx={{ p: 0 }}>
        <EmployeeIndividualForm methods={methods} onSubmit={onSubmit} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <EmployeeUploadCSV onDownloadClick={handleDownload} handleFileChange={handleFileChange} />
      </CustomTabPanel>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <EmployeeNotification messageList={warningList} />
      </Box>
    </TransitionsModal>
  );
};

EmployeeModal.propTypes = {
  methods: PropTypes.object,
  error: PropTypes.string,
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
  handleDownload: PropTypes.func,
  handleFileChange: PropTypes.func,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  warningList: PropTypes.array,
};

export default EmployeeModal;
