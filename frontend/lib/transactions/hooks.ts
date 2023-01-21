import { useMutation } from "@apollo/client";
import { AddTransactionMutation } from "../graphql/generated/graphql";
import { ADD_TRANSACTION, GET_STATEMENT_IN_RANGE } from "../graphql/queries";
import { ViewOptions } from "../statements/viewOptions";

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
      refetchQueries: [
        {
          query: GET_STATEMENT_IN_RANGE,
          variables: { to: ViewOptions[0].to, from: ViewOptions[0].from },
        },
        {
          query: GET_STATEMENT_IN_RANGE,
          variables: { to: ViewOptions[1].to, from: ViewOptions[1].from },
        },
        {
          query: GET_STATEMENT_IN_RANGE,
          variables: { to: ViewOptions[2].to, from: ViewOptions[2].from },
        },
      ],
    }
  );

  if (error) throw error;

  return { loading, data, addTransaction };
}
