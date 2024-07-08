import { useState, useEffect } from 'react';

import addEmployee from 'src/services/addEmployee';
import getEmployees from 'src/services/getEmployees';
import { useSnackbar } from 'src/context/SnackbarContext';

import useClients from '../useClients/useClients';

const useEmployees = ({ id, empid = '' }) => {
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { openSnackbar } = useSnackbar();
  const { fetchClientById } = useClients();

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
    const updatedEmpid = empid?.split('_')[1] ?? empid;

    fetchEmployees({ clientId: updatedId })
      .then((res) => setEmployees(res))
      .catch((err) => {
        setEmployees([]);
        setError(err);
      });

    // need to create seperate hook for this, as its used in shareoptions only
    if (updatedEmpid && updatedEmpid.length > 0) {
      fetchClientById({ clientId: updatedId })
        .then((res) => {
          const { ClientABNNo, ClientEmail, ClientName } = res;
          const employeeDetail = res.employees.find((v) => v.EmployeeID === empid);
          const details = { ClientABNNo, ClientEmail, ClientName, employeeDetail };
          setSelectedEmployeeDetails(details);
        })
        .catch((err) => {
          setSelectedEmployeeDetails(null);
          setError(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, empid]);

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

  return { employees, loading, error, createEmployee, selectedEmployeeDetails };
};

export default useEmployees;
