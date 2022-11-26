import axios from "axios";

const fetcher = async (url: string, accessToken: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status != 200) {
    console.log(response);
    throw new Error(response.statusText);
  }
  return response.data;
};

export default fetcher;
