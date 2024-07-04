import axiosInstance from 'src/utils/axios';

const getClients = async () => {
  try {
    const response = await axiosInstance.get(`/client/getclients${import.meta.env.VITE_URL_POSTFIX}`);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw Error(error.message ?? 'Error fetching data');
  }
};

export default getClients;
