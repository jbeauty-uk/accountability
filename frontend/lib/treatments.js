import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useTreatmentCategories() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TREATMENTS_URL}/category`,
    fetcher
  );

  return {
    treatmentCategories: data,
    isLoading: !error && !data,
    isError: error,
  };
}
