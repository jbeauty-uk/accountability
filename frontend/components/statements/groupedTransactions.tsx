import { AnimatePresence, motion } from "framer-motion";
import { groupBy, reduce } from "lodash";
import { DateTime } from "luxon";
import { GetStatementInRangeQuery } from "../../lib/graphql/generated/graphql";
import { formatAmount } from "../../lib/utils";
import TransactionSnippet from "../transactions/transactionSnippet";

interface Props {
  transactions: GetStatementInRangeQuery["getStatementInRange"]["transactions"];
}

const GroupedTransactions = ({ transactions }: Props) => {
  const groupedTransactions = Object.entries(groupBy(transactions, "date"));

  return (
    <div className="flex flex-col space-y-2">
      <AnimatePresence mode="popLayout">
        {groupedTransactions.map(([date, transactions]) => (
          <motion.div
            key={date}
            layout
            className="flex flex-col space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-row space-x-2 items-baseline">
              <p className="text-lg font-semibold">
                {DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}
              </p>
              <p className="text-sm">
                (
                {formatAmount(
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
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GroupedTransactions;
