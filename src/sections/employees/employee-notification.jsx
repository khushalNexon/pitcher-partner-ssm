import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@mui/material';

const EmployeeNotification = ({ messageList = [], empUpdateDetails = null }) => {
  if (messageList?.length === 0 || !empUpdateDetails) return null;
  return (
    <Alert severity="warning">
      {`Employee ${empUpdateDetails?.addedEmployees}/${empUpdateDetails?.totalEmployees} has been updated with the following warnings:`}
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
  empUpdateDetails: PropTypes.object,
};

export default EmployeeNotification;
