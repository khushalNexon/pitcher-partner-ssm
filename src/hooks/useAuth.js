// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isAuthenticated } from 'src/utils/auth';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  return { loading };
};

export default useAuth;
