import { groupBy, reduce } from "lodash";
import { DateTime } from "luxon";
import { GetTransactionsBetweenQuery } from "../../lib/graphql/generated/graphql";
import { formatCurrency } from "../../lib/utils";
import TransactionSnippet from "../transactions/transactionSnippet";

interface Props {
  transactions: GetTransactionsBetweenQuery["getTransactionsBetween"];
}

const GroupedTransactions = ({ transactions }: Props) => {
  const groupedTransactions = Object.entries(groupBy(transactions, "date"));

  return (
    <div className="flex flex-col space-y-2">
      {groupedTransactions.map(([date, transactions]) => (
        <div key={date} className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2 items-baseline">
            <p className="text-lg font-semibold">
              {DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}
            </p>
            <p className="text-sm">
              (
              {formatCurrency(
                reduce(
                  transactions,
                  (total, { amount }) => (total += amount),
                  0
                )
              )}
              )
            </p>
          </div>
          {transactions.map((transaction) => (
            <TransactionSnippet key={transaction.id} {...transaction} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroupedTransactions;
