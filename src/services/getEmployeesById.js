import axiosInstance from 'src/utils/axios';

const getEmployeesById = async ({ clientId, employeeId }) => {
  try {
    const response = await axiosInstance.get(`/clients/${clientId}/getemployee/${employeeId}`);
    return response.data;
  } catch (error) {
    throw Error(error.message || 'Something went wrong');
  }
};

export default getEmployeesById;
