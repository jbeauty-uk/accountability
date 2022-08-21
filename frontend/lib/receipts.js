import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useReceipts() {
  const { data, error } = useSWR(process.env.NEXT_PUBLIC_RECEIPTS_URL, fetcher);

  return {
    receipts: data,
    isLoading: !error && !data,
    isError: error,
  };
}
