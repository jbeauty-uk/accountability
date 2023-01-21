import { useMutation } from "@apollo/client";
import { AddTransactionMutation } from "../graphql/generated/graphql";
import { ADD_TRANSACTION } from "../graphql/queries";

interface UseAddTransactionProps {
  isIncome: boolean;
  date: AddTransactionMutation["addTransaction"]["date"];
  amount: AddTransactionMutation["addTransaction"]["amount"];
  details?: AddTransactionMutation["addTransaction"]["details"];
}

export function useAddTransaction({
  isIncome,
  date,
  details,
  amount,
}: UseAddTransactionProps) {
  const parsedAmount = isIncome ? amount * 100 : amount * -100;

  const [addTransaction, { data, loading, error }] = useMutation(
    ADD_TRANSACTION,
    {
      variables: {
        date,
        details,
        amount: parsedAmount,
      },
    }
  );

  if (error) throw error;

  return { loading, data, addTransaction };
}
