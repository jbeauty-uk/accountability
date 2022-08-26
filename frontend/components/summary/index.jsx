import {useState} from "react";
import {useReceipts} from "../../lib/receipts";
import {calculateTotalExpensesForYear, calculateTotalIncomeForYear, getAvailableYears,} from "../../lib/summary";
import {Card} from "../cards";
import Dropdown from "../formInputs";
import NoDataAvailable from "./noDataAvailable";

export default function Summary() {
  const { receipts, isLoading, isError } = useReceipts();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  const [year, setYear] = useState(getAvailableYears(receipts)[0]);

  const availableYears = getAvailableYears(receipts);
  const onChange = (e) => setYear(e.target.value);

  const totalIncome = calculateTotalIncomeForYear(receipts, year);
  const totalExpenses = calculateTotalExpensesForYear(receipts, year);

  if (!availableYears.length) {
    return <NoDataAvailable />;
  }

  return (
    <div className="flex flex-col space-y-4">
      <Dropdown
        label="Show summary for year"
        options={availableYears}
        onChange={onChange}
      />
      <div className="grid grid-col-2 gap-2">
        <Card
          heading="Total"
          body={totalIncome - totalExpenses}
          className="col-span-2"
        />
        <Card
          heading="Income"
          body={totalIncome}
          className="border-green-500 bg-green-200"
        />
        <Card
          heading="Expenses"
          body={totalExpenses}
          className="border-red-500 bg-red-200"
        />
      </div>
    </div>
  );
}
