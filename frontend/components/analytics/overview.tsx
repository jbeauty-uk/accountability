import { DateTime } from "luxon";
import { useAnalytics } from "../../lib/analytics/hooks";
import AnalyticsCard from "./card";

const now = DateTime.now();
const startOfYear = now.startOf("year");
const startOfNextYear = startOfYear.plus({ year: 1 });

const AnalyticsOverview = () => {
  const { loading, data } = useAnalytics(
    startOfNextYear.toISODate(),
    startOfYear.toISODate()
  );

  if (loading) return <p>Loading analytics</p>;

  const transactionAnalytics = data?.getTransactionAnalyticsInRange || [];

  const popularEarnings = transactionAnalytics
    .filter(({ min }) => min > 0)
    .slice(0, 6);
  const popularExpenses = transactionAnalytics
    .filter(({ max }) => max < 0)
    .slice(0, 6);

  return transactionAnalytics.length ? (
    <>
      <h2 className="text-xl">Most popular income</h2>
      <div className="grid grid-cols-2 gap-4">
        {popularEarnings.map((transactionAnalytics) => (
          <AnalyticsCard
            key={transactionAnalytics.detail}
            transactionAnalytics={transactionAnalytics}
          />
        ))}
      </div>
      <h2 className="text-xl">Most popular expenses</h2>
      <div className="grid grid-cols-2 gap-4">
        {popularExpenses.map((transactionAnalytics) => (
          <AnalyticsCard
            key={transactionAnalytics.detail}
            transactionAnalytics={transactionAnalytics}
          />
        ))}
      </div>
    </>
  ) : (
    <p>No data found</p>
  );
};

export default AnalyticsOverview;
