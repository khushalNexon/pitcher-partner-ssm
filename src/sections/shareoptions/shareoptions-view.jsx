import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Card, Stack, Button, Container, Typography } from '@mui/material';

import useEmployees from 'src/hooks/useEmployees/useEmployees';
import usePdfGenerator from 'src/hooks/usePdfGenerator/usePdfGenerator';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import DataGridTable from 'src/components/data-grid/DataGrid';

// import EmployeeModal from './employee-modal';

// ----------------------------------------------------------------------

export default function ShareOptionsView() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params, 'params');
  const { id, empid } = params;
  const { employees, loading } = useEmployees({ id });
  const { generatePdf } = usePdfGenerator();

  const methods = useForm();

  const [open, setOpen] = useState(false);

  const handleCreateNewEmployee = () => {
    setOpen(!open);
  };

  // const onSubmit = (data) => {
  //   createEmployee({ clientId: id?.split('_')[1] ?? id, payload: { ...data, ClientID: id } })
  //     .then(() => setOpen(!open))
  //     .catch((err) => err);
  // };

  // const handleToggle = () => {
  //   setOpen(!open);
  // };

  const handleGoBack = () => {
    navigate(-1);
  };

  // const handleOnCellClick = (cell, row) => {
  //   console.log({ cell, id }, 'cell');
  //   navigate(`/client/${id}/employee/${cell.row.employeeId}`);
  // };

  const rows = employees
    .filter((employee) => employee.EmployeeID === empid)
    .flatMap((employee) =>
      employee.shareOptions.map((option, index) => ({
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

  console.log(rows, 'this are rows');

  useEffect(() => {
    if (!open) {
      methods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handlePrintPdf = () => {
    console.log(params, 'params');
    generatePdf();
  };

  const shareOptionsColumns = [
    {
      field: 'clientId',
      headerName: 'Client ID',
      valueGetter: (value) => value?.split('_')[1] ?? value,
    },
    {
      field: 'employeeId',
      headerName: 'Employee ID',
      valueGetter: (value) => value?.split('_')[1] ?? value,
    },
    {
      field: 'exercisePrice',
      headerName: 'Exercise Price',
      type: 'number',
      editable: false,
    },
    {
      field: 'issueDate',
      headerName: 'Issue Date',
      // type: 'date',
      editable: false,
    },
    {
      field: 'marketValue',
      headerName: 'Market Vlaue',
      type: 'number',
      editable: false,
    },
    {
      field: 'noOfOptions',
      headerName: '# of Options',
    },
    {
      field: 'actions',
      headerName: 'get Print',
      width: 100,
      renderCell: (data) => {
        console.log(data, 'log');
        return <Button onClick={handlePrintPdf}>Print </Button>;
      },
    },
  ];

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
        <Typography variant="h4">SharedOptions</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleCreateNewEmployee}
        >
          New Share Option
        </Button>
      </Stack>

      <Card sx={{ p: 5 }}>
        <Scrollbar>
          <DataGridTable
            checkboxSelection={false}
            data={employees}
            columns={shareOptionsColumns}
            rows={rows}
            loading={loading}
          />
        </Scrollbar>
      </Card>
    </Container>
  );
}
