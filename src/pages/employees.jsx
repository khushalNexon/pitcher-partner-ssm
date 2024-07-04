import { Helmet } from 'react-helmet-async';

import EmployeesView from 'src/sections/employees/employee-view';


// ----------------------------------------------------------------------

export default function EmployeePage() {
  return (
    <>
      <Helmet>
        <title> Employees </title>
      </Helmet>
      <EmployeesView />
    </>
  );
}
