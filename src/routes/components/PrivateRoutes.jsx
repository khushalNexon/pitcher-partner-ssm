import React from 'react';
import PropTypes from 'prop-types';

import useAuth from 'src/hooks/useAuth';

import Loader from 'src/components/loader/Loader';

const PrivateRoute = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
