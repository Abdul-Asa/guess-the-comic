import axios from "axios";

export const apiGetList = async () => {
  let requests: Promise<any>[] = [];

  for (let i = 1; i < 10; i++) {
    const manhwaFind = {
      method: "GET",
      url: "https://api.comick.app/v1.0/search",
      params: { country: "kr", limit: 300, page: i },
    };

    requests.push(axios.request(manhwaFind));
  }

  let responses: any[] = await Promise.all(requests);
  responses = responses.map((response) => response.data);

  return responses.flat();
};
