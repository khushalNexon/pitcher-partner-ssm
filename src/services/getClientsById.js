import axiosInstance from 'src/utils/axios';

const getClientsById = async ({ clientId }) => {
  try {
    const response = await axiosInstance.get(
      `/client/getclient/${clientId}${import.meta.env.VITE_URL_POSTFIX}`
    );
    return response.data;
  } catch (error) {
    throw Error(error.message || 'Something went wrong');
  }
};

export default getClientsById;
