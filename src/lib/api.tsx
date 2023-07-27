import axios from "axios";

export const apiGetList = async () => {
  const manhwaFind = {
    method: "GET",
    url: "https://api.comick.app/v1.0/search",
    params: { country: "kr", limit: 300 },
  };

  try {
    const response = await axios.request(manhwaFind);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
