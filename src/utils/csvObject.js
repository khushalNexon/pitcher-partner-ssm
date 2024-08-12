export const keyMapper = {
  'Employee ABN No': 'EmployeeABNNo',
  'Street Address Line 1': 'EmployeeAddressLine1',
  'Street Address Line 2': 'EmployeeAddressLine2',
  'Employee Email': 'EmployeeEmail',
  'Employee Full Name': 'EmployeeFullName',
  'Employee TFN No': 'EmployeeTFNNo',
  Suburb: 'Suburb',
  State: 'State',
  'Postal Code': 'PostalCode',
};

export const csvKeys = Object.keys(keyMapper);

export const csvObjectMapper = (data) => {
  if (!data) return [];

  const filterData = data.filter((v) => !!v['Employee ABN No']);
  const updatedFilterData = filterData.map((v) => {
    const result = {};
    Object.keys(v).forEach((key) => {
      if (keyMapper[key]) {
        result[keyMapper[key]] = v[key];
      }
    });
    return result;
  });
  return updatedFilterData;
};
