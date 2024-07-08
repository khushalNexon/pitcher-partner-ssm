import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@mui/material';

const EmployeeNotification = ({ messageList=[] }) => {

  if (messageList?.length === 0) return null;
  return (
    <Alert severity="warning">
      This is a warning Alert.
      <ul type="disc">
        {messageList.map((message, index) => (
          <li>{message}</li>
        ))}
      </ul>
    </Alert>
  );
};

EmployeeNotification.propTypes = {
  messageList: PropTypes.array,
};

export default EmployeeNotification;
