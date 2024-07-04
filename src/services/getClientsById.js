import axiosInstance from 'src/utils/axios';

const getClientsById = async ({clientId}) => {
  try {
    const response = await axiosInstance.get(`/client/getclient/${clientId}`);
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw Error(error.message || 'Something went wrong');
  }
};

export default getClientsById;
