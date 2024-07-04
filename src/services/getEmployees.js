import axiosInstance from 'src/utils/axios';

const getEmployees = async ({ clientId }) => {
  try {
    const response = await axiosInstance.get(`/clients/${clientId}/getemployees${import.meta.env.VITE_URL_POSTFIX}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw Error(error.message || 'Something went wrong');
  }
};

export default getEmployees;
