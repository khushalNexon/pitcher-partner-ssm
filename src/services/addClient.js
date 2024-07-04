import axiosInstance from 'src/utils/axios';


const addClient = async ({ payload }) => {
  try {
    const response = await axiosInstance.post(`/client/createclient${import.meta.env.VITE_URL_POSTFIX}`, payload);
    return response.data;
  } catch (error) {
    throw Error(error.message || 'Something went wrong');
  }
};

export default addClient;
