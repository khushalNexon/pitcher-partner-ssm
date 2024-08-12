import axiosInstance from 'src/utils/axios';

const addShareOptions = async ({ clientId, employeeId, payload }) => {
  try {
    const response = await axiosInstance.post(
      `/clients/${clientId}/employees/${employeeId}/shareoptions${import.meta.env.VITE_URL_POSTFIX}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};

export default addShareOptions;
