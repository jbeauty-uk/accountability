import { useQuery } from "@apollo/client";
import { GET_TRANSACTION_ANALYTICS_IN_RANGE } from "../graphql/queries";

export function useAnalytics(to: string, from: string) {
  const { loading, error, data, refetch } = useQuery(
    GET_TRANSACTION_ANALYTICS_IN_RANGE,
    { variables: { to, from } }
  );

  if (error) throw error;

  return { loading, data, refetch };
}
