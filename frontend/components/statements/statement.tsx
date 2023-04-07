import { groupBy, reduce } from "lodash";
import { useTransactions } from "../../lib/statements/hooks";
import { formatCurrency } from "../../lib/utils";
import GroupedTransactions from "./groupedTransactions";

interface Props {
  to: string;
  from: string;
}

const Statement = ({ to, from }: Props) => {
  const { loading, transactions } = useTransactions(to, from);

  if (loading) return <p>Loading</p>;

  if (!transactions) {
    return <p>No transactions found</p>;
  }

  const total = reduce(transactions, (sum, { amount }) => (sum += amount), 0);
  const groupedTransactions = Object.entries(groupBy(transactions, "date"));

  return groupedTransactions.length ? (
    <>
      <p className="text-lg">Total: {formatCurrency(total)}</p>
      <GroupedTransactions transactions={transactions} />
    </>
  ) : (
    <p>Nothing to show for this period</p>
  );
};

export default Statement;
