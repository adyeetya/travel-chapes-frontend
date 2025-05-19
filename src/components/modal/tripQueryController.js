import axios from 'axios';
import { ServerUrl } from "../../app/config";
export const submitTripQuery = async (formData) => {
  try {
    const response = await axios.post(
      ServerUrl + '/user/postQuery',
      {
        name: formData.name,
        email: formData.email,
        destination: formData.destination,
        phone: formData.phone,
        travelers: formData.travelers,
        query: '', // Optionally add a message field if needed
        createdFrom: 'website', // Specify where the query is coming from
      }
    );
    console.log('Response from server:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error submitting trip query:', error);
    let message = 'Something went wrong.';
    if (error.response && error.response.data && error.response.data.responseMessage) {
      message = error.response.data.responseMessage;
    } else if (error.message) {
      message = error.message;
    }
    return { success: false, error: message };
  }
};
