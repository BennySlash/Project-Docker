import axios from "axios";

const BASE_URL = "https://192.168.5.61:4000/api";

export async function sendDataToServer(body) {
  try {
    const response = await axios.post(`${BASE_URL}/score`, body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
