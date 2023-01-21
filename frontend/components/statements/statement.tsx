import { groupBy } from "lodash";
import { useStatements } from "../../lib/statements/hooks";
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

  const groupedTransactions = Object.entries(groupBy(transactions, "date"));

  return groupedTransactions.length ? (
    <GroupedTransactions transactions={transactions} />
  ) : (
    <p>Nothing to show for this period</p>
  );
};

export default Statement;
