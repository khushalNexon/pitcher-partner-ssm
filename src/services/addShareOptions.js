import axiosInstance from 'src/utils/axios';

const addShareOptions = async ({ clientId, employeeId }) => {
  try {
    const response = await axiosInstance.post(
      `/clients/${clientId}/employees/${employeeId}/shareoptions`
    );
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error('Error fetching data:', error);
    throw Error(error.message)
  }
};

export default addShareOptions;
