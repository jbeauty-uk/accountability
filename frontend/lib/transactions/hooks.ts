import { gql, useMutation, useQuery } from "@apollo/client";
import { Transaction } from "../graphql/generated/graphql";
import {
  ADD_TRANSACTION,
  GET_STATEMENT_IN_RANGE,
  GET_TRANSACTION_RANGE,
  UPDATE_TRANSACTION,
} from "../graphql/queries";
import { ViewOptions } from "../statements/viewOptions";

interface UseAddTransactionProps {
  isIncome: boolean;
  date: Transaction["date"];
  amount: Transaction["amount"];
  details?: Transaction["details"];
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

interface UseUpdateTransactionProps {
  id: Transaction["id"];
  isIncome: boolean;
  date: Transaction["date"];
  amount: Transaction["amount"];
  details?: Transaction["details"];
}

export function useUpdateTransaction({
  id,
  isIncome,
  date,
  details,
  amount,
}: UseUpdateTransactionProps) {
  const variables = {
    id,
    date,
    details,
    amount: isIncome ? amount : amount * -1,
  };

  const [updateTransaction, { data, loading, error }] = useMutation(
    UPDATE_TRANSACTION,
    {
      variables,
      update(cache, { data: updateTransaction }) {
        cache.modify({
          fields: {
            updateTransaction(existing = []) {
              const newTransactionRef = cache.writeFragment({
                data: updateTransaction,
                fragment: gql`
                  fragment UpdatedTransaction on Transaction {
                    id
                    date
                    details
                    amount
                  }
                `,
              });
              return [...existing, newTransactionRef];
            },
          },
        });
      },
    }
  );

  if (error) throw error;

  return { loading, data, updateTransaction };
}

export function useTransactionRange() {
  const { loading, error, data, refetch } = useQuery(GET_TRANSACTION_RANGE);

  if (error) throw error;

  return { loading, data, refetch };
}
