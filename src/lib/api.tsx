import axios from "axios";

export const apiGetList = async (
  callback: (data: any) => void
): Promise<void> => {
  const manwhaFind = {
    method: "GET",
    url: "https://api.comick.app/v1.0/search",
    params: { country: "kr", limit: 300 },
  };

  try {
    const response = await axios.request(manwhaFind);
    // console.log(response.data);
    callback(response.data);
  } catch (error) {
    console.error(error);
  }
};
