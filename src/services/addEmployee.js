import axiosInstance from 'src/utils/axios';

const addEmployee = async ({ clientId, payload }) => {
  try {
    const response = await axiosInstance.post(`/clients/${clientId}/employees${import.meta.env.VITE_URL_POSTFIX}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw Error(error.message || 'Something went wrong');
  }
};

export default addEmployee;
