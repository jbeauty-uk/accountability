import useSWR from "swr";
import fetcher from "../../lib/fetcher";

const endpoint = "/receipts";

const useReceipts = (accessToken: string) => {
  const { data: receipts, error } = useSWR([endpoint, accessToken], fetcher);

  if (error) {
    console.error(error);
  }

  return {
    receipts,
    isLoading: !error && !receipts,
    isError: error,
  };
};

export default useReceipts;
