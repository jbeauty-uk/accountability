import { groupBy, reduce } from "lodash";
import { useStatements } from "../../lib/statements/hooks";
import { formatAmount } from "../../lib/utils";
import GroupedTransactions from "./groupedTransactions";

interface Props {
  to: string;
  from: string;
}

const Statement = ({ to, from }: Props) => {
  const { data } = useStatements(to, from);

  if (!data) return <p>Loading</p>;

  const {
    getStatementInRange: { transactions },
  } = data;

  const total = reduce(transactions, (sum, { amount }) => (sum += amount), 0);
  const groupedTransactions = Object.entries(groupBy(transactions, "date"));

  return groupedTransactions.length ? (
    <>
      <p className="text-lg">Total: {formatAmount(total)}</p>
      <GroupedTransactions transactions={transactions} />
    </>
  ) : (
    <p>Nothing to show for this period</p>
  );
};

export default Statement;
