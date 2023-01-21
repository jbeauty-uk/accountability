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
      {groupedTransactions.map(([date, transactions]) => (
        <Group
          key={date}
          name={DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}
        >
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
                className={`w-3/4 text-left ${!details && "text-neutral-300"}`}
              >
                {details || "No details provided"}
              </p>
            </div>
          ))}
        </Group>
      ))}
    </div>
  );
};

interface GroupProps {
  name: string;
  children: React.ReactNode;
}

const Group = ({ name, children }: GroupProps) => (
  <div className="flex flex-col space-y-2">
    <p className="text-lg font-semibold">{name}</p>
    {children}
  </div>
);

export default GroupedTransactions;
