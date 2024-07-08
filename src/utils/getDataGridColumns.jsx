// import { Button } from '@mui/material';

export const clientColumns = [
  {
    field: 'clientId',
    headerName: 'Client ID',
    flex: 1,
    valueGetter: (value, row) => value?.split('_')[1] ?? value,
  },
  {
    field: 'abnNo',
    headerName: 'ABN No',
    editable: false,
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Full Name',
    editable: false,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    editable: false,
    flex: 1,
  },
  {
    field: 'employeeNumbers',
    headerName: 'No. Of Employees',
    type: 'number',
    editable: false,
    flex: 1,
    valueGetter: (value, row) => row.employees.length,
  },
];

export const employeeColumns = [
  {
    field: 'clientId',
    headerName: 'Client ID',
    valueGetter: (value) => value?.split('_')[1] ?? value,
    flex: 1,
  },
  {
    field: 'employeeId',
    headerName: 'Employee ID',
    valueGetter: (value) => value?.split('_')[1] ?? value,
    flex: 1,
  },
  {
    field: 'abnNo',
    headerName: 'Employee ABN No',
    editable: false,
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Employee Full Name',
    editable: false,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Employee Email',
    type: 'email',
    editable: false,
    flex: 1,
  },
  {
    field: 'shareOptions',
    headerName: 'Share Options',
    valueGetter: (value) => value?.length ?? 0,
    flex: 1,
  },
];
