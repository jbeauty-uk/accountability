import { GetTransactionAnalyticsInRangeQuery } from "../../lib/graphql/generated/graphql";
import { formatCurrency } from "../../lib/utils";

interface Props {
  transactionAnalytics: GetTransactionAnalyticsInRangeQuery["getTransactionAnalyticsInRange"][0];
}

const AnalyticsCard = ({ transactionAnalytics }: Props) => {
  const { detail, count, min, average, max } = transactionAnalytics;

  return (
    <div className="flex flex-col space-y-2 border rounded-md p-4 shadow-md">
      <div className="flex flex-row items-center space-x-2 justify-between font-bold">
        <p className="capitalize">{detail}</p>
        <p className="text-sm">x{count}</p>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex flex-row space-x-2">
          <p>Min</p>
          <p>{formatCurrency(min)}</p>
        </div>
        <div className="flex flex-row space-x-2">
          <p>Avg</p>
          <p>{formatCurrency(average)}</p>
        </div>
        <div className="flex flex-row space-x-2">
          <p>Max</p>
          <p>{formatCurrency(max)}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
