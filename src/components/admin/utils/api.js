import axios from "axios";

const BASE_URL = "https://192.168.5.61:4000";

export async function sendDataToServer(body) {
  try {
    const response = await axios.post(`${BASE_URL}/employee-score-name`, body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function sendDataToBackend(body) {
  try {
    const response = await axios.post(`${BASE_URL}/employee-score-check`, body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
