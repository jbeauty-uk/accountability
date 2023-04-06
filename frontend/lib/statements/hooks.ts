import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS_BETWEEN } from "../graphql/queries";

export function useTransactions(to: string, from: string) {
  const { loading, data, refetch } = useQuery(GET_TRANSACTIONS_BETWEEN, {
    variables: { to, from },
  });

  if (!data || !data.getTransactionsBetween) {
    return { loading, transactions: [] };
  }

  const transactions = data.getTransactionsBetween;

  return { loading, transactions, refetch };
}
