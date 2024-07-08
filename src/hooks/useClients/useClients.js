import { useState, useEffect } from 'react';

import addClient from 'src/services/addClient';
import getClients from 'src/services/getClients';
import getClientsById from 'src/services/getClientsById';
import { useSnackbar } from 'src/context/SnackbarContext';

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { openSnackbar } = useSnackbar();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createClient = async ({ payload }) => {
    try {
      setLoading(true);
      const data = await addClient({ payload });
      const updatedClients = [
        ...clients,
        {
          id: `client_${payload.ClientABNNo}`,
          employees: [],
          ClientName: payload.ClientName,
          ClientEmail: payload.ClientEmail,
          ClientABNNo: payload.ClientABNNo,
        },
      ];
      setClients(updatedClients);
      openSnackbar(data.result, 'success');
      return data.result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      openSnackbar(err.message, 'error');
      return err.message || 'An error occurred';
    } finally {
      setLoading(false);
    }
  };

  const fetchClientById = async ({ clientId }) => {
    try {
      setLoading(true);
      const data = await getClientsById({ clientId });
      return data.result;
    } catch (err) {
      // throw err;
      return err;
    } finally {
      setLoading(false);
    }
  };

  return { clients, loading, error, createClient, fetchClientById };
};

export default useClients;
