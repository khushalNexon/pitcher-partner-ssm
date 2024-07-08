import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Card, Stack, Button, Container, Typography } from '@mui/material';

import useEmployees from 'src/hooks/useEmployees/useEmployees';

import { employeeColumns } from 'src/utils/getDataGridColumns';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import DataGridTable from 'src/components/data-grid/DataGrid';

import EmployeeModal from './employee-modal';

// ----------------------------------------------------------------------

export default function EmployeesView() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const {
    employees,
    loading,
    createEmployee,
    downloadCSVFormate,
    uploadCSVFile,
    error,
    empUpdateDetails,
    reInitialiseEmployeeDetails,
  } = useEmployees({ id });

  const methods = useForm();

  const [open, setOpen] = useState(false);

  const handleCreateNewEmployee = () => {
    setOpen(!open);
  };

  const onSubmit = (data) => {
    createEmployee({ clientId: id?.split('_')[1] ?? id, payload: { ...data, ClientID: id } })
      .then(() => setOpen(!open))
      .catch((err) => err);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOnCellClick = (cell, row) => {
    if (cell.field === 'clientId') {
      navigate(`/client/${id}/employee/${cell.row.employeeId}`);
    }
  };

  const handleDownload = () => {
    downloadCSVFormate();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadCSVFile({ clientId: id, file }).then((res) => {
      if (res.warnings.length === 0) {
        console.log(res, 'res if');
        setOpen(!open);
        reInitialiseEmployeeDetails();
      }
    });
  };

  const rows =
    employees && employees.length > 0
      ? employees?.map((v, index) => ({
          id: `${v.EmployeeID}_${index}`,
          clientId: v.ClientID,
          employeeId: v.EmployeeID,
          abnNo: v.EmployeeABNNo,
          name: v.EmployeeFullName,
          email: v.EmployeeEmail ?? '',
          shareOptions: v.shareOptions,
          ...v,
        }))
      : [];

  useEffect(() => {
    if (!open) {
      methods.reset();
      reInitialiseEmployeeDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="ion:chevron-back-outline" />}
          onClick={handleGoBack}
        >
          Back
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Employees</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleCreateNewEmployee}
        >
          New Employees
        </Button>
      </Stack>

      <Card sx={{ p: 5 }}>
        <Scrollbar>
          <DataGridTable
            checkboxSelection={false}
            data={employees}
            columns={employeeColumns}
            rows={rows}
            loading={loading}
            handleOnCellClick={handleOnCellClick}
          />
        </Scrollbar>
      </Card>

      <EmployeeModal
        methods={methods}
        isOpen={open}
        handleToggle={handleToggle}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        handleDownload={handleDownload}
        handleFileChange={handleFileChange}
        warningList={empUpdateDetails?.warnings ?? []}
      />
    </Container>
  );
}
