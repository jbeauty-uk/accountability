import { groupBy } from "lodash";
import { DateTime } from "luxon";
import { useStatements } from "../../lib/statements/hooks";
import { formatAmount } from "../../lib/utils";

interface StatementProps {
  to: string;
  from: string;
}

const Statement = ({ to, from }: StatementProps) => {
  const { data } = useStatements(to, from);

  const groupedReceipts = Object.entries(
    groupBy(data?.getStatementInRange.receipts, "date")
  );

  return (
    <div className="flex flex-col space-y-2">
      {groupedReceipts.length ? (
        groupedReceipts.map(([date, receipts]) => (
          <div key={date} className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">
              {DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}
            </p>
            {receipts.map(({ id, amount, details }) => (
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
          </div>
        ))
      ) : (
        <p>Nothing to show for this period</p>
      )}
    </div>
  );
};

export default Statement;
