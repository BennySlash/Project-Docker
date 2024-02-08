import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export async function sendDataToServer(body) {
  try {
    const response = await axios.post(`${BASE_URL}/score`, body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
