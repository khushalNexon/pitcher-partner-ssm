import { useState, useEffect } from 'react';

import addEmployee from 'src/services/addEmployee';
import getEmployees from 'src/services/getEmployees';
import { useSnackbar } from 'src/context/SnackbarContext';
import uploadCSVForEmployee from 'src/services/uploadCSVForEmployee';

import useClients from '../useClients/useClients';

const useEmployees = ({ id, empid = '' }) => {
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [empUpdateDetails, setEmpUpdateDetails] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { openSnackbar } = useSnackbar();
  const { fetchClientById } = useClients();

  const fetchEmployees = async ({ clientId }) => {
    try {
      setLoading(true);
      const data = await getEmployees({ clientId });
      setEmployees(data.result);
      return data.result;
    } catch (err) {
      setEmployees([]);
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
    };

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

  const uploadCSVFile = async ({ clientId, file }) => {
    const updatedClientID = clientId?.split('_')[1] ?? clientId;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const data = await uploadCSVForEmployee({ clientId: updatedClientID, formData });
      setEmpUpdateDetails(data.result);
      openSnackbar(data.message, 'success');
      fetchEmployees({ clientId: updatedClientID });
      return data.result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      openSnackbar(err.message, 'error');
      return err.message || 'An error occurred';
    } finally {
      setLoading(false);
    }
  };

  const downloadCSVFormate = () => {
    // Add your download logic here
    const data = [
      [
        'EmployeeABNNo',
        'EmployeeAddressLine1',
        'EmployeeAddressLine2',
        'EmployeeEmail',
        'EmployeeFullName',
        'EmployeeTFNNo',
      ],
    ];

    // Convert array of data into CSV string
    const csvContent = data.map((e) => e.join(',')).join('\n');

    // Create a blob with the CSV content and the type of file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link to download the blob as a file
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'employees.csv');
    link.style.visibility = 'hidden';

    // Append the link to the document and trigger the download, then remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reInitialiseEmployeeDetails = () => {
    setEmpUpdateDetails(null);
  };

  return {
    employees,
    loading,
    error,
    createEmployee,
    selectedEmployeeDetails,
    empUpdateDetails,
    uploadCSVFile,
    downloadCSVFormate,
    reInitialiseEmployeeDetails,
  };
};

export default useEmployees;
