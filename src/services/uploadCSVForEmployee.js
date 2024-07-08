import axiosInstance from 'src/utils/axios';

const uploadCSVForEmployee = async ({ clientId, formData }) => {
  try {
    const response = await axiosInstance.post(`/clients/${clientId}/addemployeesfromcsv${import.meta.env.VITE_URL_POSTFIX}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw Error(error.message || 'Something went wrong');
  }
};

export default uploadCSVForEmployee;
