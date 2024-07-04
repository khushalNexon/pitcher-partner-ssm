import axiosInstance from 'src/utils/axios';

const getEmployeesById = async ({ clientId, employeeId }) => {
  try {
    const response = await axiosInstance.get(`/clients/${clientId}/getemployee/${employeeId}`);
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw Error(error.message || 'Something went wrong');
  }
};

export default getEmployeesById;
