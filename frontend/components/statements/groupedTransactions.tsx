import { AnimatePresence, motion } from "framer-motion";
import { groupBy } from "lodash";
import { DateTime } from "luxon";
import { GetStatementInRangeQuery } from "../../lib/graphql/generated/graphql";
import { formatAmount } from "../../lib/utils";

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
            <p className="text-lg font-semibold">
              {DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}
            </p>
            {transactions.map(({ id, amount, details }) => (
              <div key={id} className="flex flex-row space-x-4 justify-between">
                <p
                  className={`w-1/4 text-right ${
                    amount > 0 && "text-purple-600"
                  }`}
                >
                  {formatAmount(amount)}
                </p>
                <p
                  className={`w-3/4 text-left ${
                    !details && "text-neutral-300"
                  }`}
                >
                  {details || "No details provided"}
                </p>
              </div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GroupedTransactions;
