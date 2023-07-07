import { gql, useMutation, useQuery } from "@apollo/client";
import { DateTime, Interval } from "luxon";
import { DateOption } from "../../components/inputs/Select";
import { Transaction } from "../graphql/generated/graphql";
import {
  ADD_TRANSACTION,
  GET_TRANSACTIONS_BETWEEN,
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
          query: GET_TRANSACTIONS_BETWEEN,
          variables: { to: ViewOptions[0].to, from: ViewOptions[0].from },
        },
        {
          query: GET_TRANSACTIONS_BETWEEN,
          variables: { to: ViewOptions[1].to, from: ViewOptions[1].from },
        },
        {
          query: GET_TRANSACTIONS_BETWEEN,
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

export function useAvailableMonths() {
  const { loading, data } = useTransactionRange();
  const format = "LLLL yyyy";

  if (!data || !data.getTransactionRange) {
    return { loading, availableMonths: [] };
  }

  const {
    getTransactionRange: { from, to },
  } = data;

  const availableMonths: Array<DateOption> = Interval.fromDateTimes(
    DateTime.fromISO(from).startOf("month"),
    DateTime.fromISO(to).startOf("month")
  )
    .splitBy({ month: 1 })
    .map((i) => {
      if (i.start === null) {
        throw new Error(`interval start is null`);
      }

      const label = i.start.toFormat(format);
      const value = label.replace(" ", "-").toLocaleLowerCase();
      const from = i.start.toISODate()!;
      const to = i.start.plus({ month: 1 }).minus({ days: 1 }).toISODate()!;

      return { label, value, from, to };
    })
    .reverse();

  return { loading, availableMonths };
}

export function useTransactionRange() {
  const { loading, error, data, refetch } = useQuery(GET_TRANSACTION_RANGE);

  if (error) throw error;

  return { loading, data, refetch };
}
