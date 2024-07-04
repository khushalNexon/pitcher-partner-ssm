// import { Button } from '@mui/material';

export const clientColumns = [
  {
    field: 'clientId',
    headerName: 'Client ID',
    valueGetter: (value, row) => value?.split('_')[1] ?? value,
  },
  {
    field: 'abnNo',
    headerName: 'ABN No',
    editable: false,
  },
  {
    field: 'name',
    headerName: 'Full Name',
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    editable: false,
  },
  {
    field: 'employeeNumbers',
    headerName: 'No. Of Employees',
    type: 'number',
    editable: false,
    valueGetter: (value, row) => row.employees.length,
  },
];

export const employeeColumns = [
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
    field: 'abnNo',
    headerName: 'Employee ABN No',
    editable: false,
  },
  {
    field: 'name',
    headerName: 'Employee Full Name',
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Employee Email',
    type: 'email',
    editable: false,
  },
  {
    field: 'shareOptions',
    headerName: 'Share Options',
    valueGetter: (value) => value?.length ?? 0,
  },
];
