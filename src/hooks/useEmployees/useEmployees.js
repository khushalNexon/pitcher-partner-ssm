import { useState, useEffect } from 'react';

import addEmployee from 'src/services/addEmployee';
import getEmployees from 'src/services/getEmployees';
import { useSnackbar } from 'src/context/SnackbarContext';

const useEmployees = ({ id }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { openSnackbar } = useSnackbar();

  const fetchEmployees = async ({ clientId }) => {
    try {
      setLoading(true);
      const data = await getEmployees({ clientId });
      return data.result;
    } catch (err) {
      return err.message || 'An error occurred';
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updatedId = id?.split('_')[1] ?? id;

    fetchEmployees({ clientId: updatedId })
      .then((res) => setEmployees(res))
      .catch((err) => {
        setEmployees([]);
        setError(err);
      });
  }, [id]);

  const createEmployee = async ({ clientId, payload }) => {
    try {
      setLoading(true);
      const data = await addEmployee({ clientId, payload });
      const updatedEmployees = [
        ...employees,
        {
          EmployeeID: `employee_${payload.EmployeeABNNo}`,
          shareOptions: [],
          ClientID: payload.ClientID,
          EmployeeFullName: payload.EmployeeFullName,
          EmployeeEmail: payload.EmployeeEmail,
          EmployeeABNNo: payload.EmployeeABNNo,
          EmployeeAddressLine1: payload.EmployeeAddressLine1,
          EmployeeAddressLine2: payload?.EmployeeAddressLine2 ?? '',
          EmployeeTFNNo: payload.EmployeeTFNNo,
        },
      ];
      setEmployees(updatedEmployees);
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

  return { employees, loading, error, createEmployee };
};

export default useEmployees;
