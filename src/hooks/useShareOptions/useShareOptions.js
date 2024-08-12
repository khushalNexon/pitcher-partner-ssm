import { useState, useEffect } from 'react';

import getEmployees from 'src/services/getEmployees';
import { useSnackbar } from 'src/context/SnackbarContext';
import addShareOptions from 'src/services/addShareOptions';

import useClients from '../useClients/useClients';

const useShareOptions = ({ id, empid = '' }) => {
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [shareOptionsList, setShareOptionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { openSnackbar } = useSnackbar();
  const { fetchClientById } = useClients();

  const updateEmployees = ({ employeesList }) => {
    setEmployees(employeesList);
    const shareOptions = employeesList
      ?.filter((employee) => employee.EmployeeID === empid)
      ?.flatMap((employee) =>
        employee?.shareOptions?.map((option, index) => ({
          // ...option,
          issueDate: option.IssueDate,
          marketValue: option.MarketValue,
          noOfOptions: option.NumberOfOptions,
          employeeId: option.EmployeeID,
          exercisePrice: option.ExercisePrice,
          id: `${option.EmployeeID}_${index}`,
          clientId: employee.ClientID,
        }))
      );
    setShareOptionsList(shareOptions);
  };

  const fetchEmployees = async ({ clientId }) => {
    try {
      setLoading(true);
      const data = await getEmployees({ clientId });
      updateEmployees({ employeesList: data.result });
      return data.result;
    } catch (err) {
      setEmployees([]);
      setShareOptionsList([]);
      setError(err.message || 'An error occurred');
      return err.message || 'An error occurred';
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updatedId = id?.split('_')[1] ?? id;

    fetchEmployees({ clientId: updatedId });

    // need to create seperate hook for this, as its used in shareoptions only
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

    return () => {
      setSelectedEmployeeDetails(null);
      setEmployees([]);
      setShareOptionsList([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, empid]);

  const createShareOption = async ({ clientId, employeeId, payload }) => {
    // eslint-disable-next-line no-debugger
    try {
      setLoading(true);
      const data = await addShareOptions({ clientId, employeeId, payload });
      // eslint-disable-next-line no-debugger
      debugger;
      const updatedEmployee = employees.map((v) =>
        v.EmployeeID === `employee_${employeeId}`
          ? {
              ...v,
              shareOptions: [
                ...v.shareOptions,
                { ...payload, EmployeeID: `employee_${employeeId}` },
              ],
            }
          : v
      );
      updateEmployees({ employeesList: updatedEmployee });
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

  return {
    employees,
    shareOptionloading: loading,
    shareOptionerror: error,
    createShareOption,
    selectedEmployeeDetails,
    shareOptionsList,
  };
};

export default useShareOptions;
