import axiosInstance from 'src/utils/axios';

const addShareOptions = async ({ clientId, employeeId }) => {
  try {
    const response = await axiosInstance.post(
      `/clients/${clientId}/employees/${employeeId}/shareoptions`
    );
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};

export default addShareOptions;
