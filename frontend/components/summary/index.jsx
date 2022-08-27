import { useState } from "react";
import { formatCurrency } from "../../lib/money";
import { useReceipts } from "../../lib/receipts";
import {
  calculateTotalExpensesForYear,
  calculateTotalIncomeForYear,
  getAvailableYears,
} from "../../lib/summary";
import { Card } from "../cards";
import Dropdown from "../formInputs";
import NoDataAvailable from "./noDataAvailable";

export default function Summary() {
  const { receipts, isLoading, isError } = useReceipts();
  const [year, setYear] = useState(getAvailableYears(receipts)[0]);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

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
          body={formatCurrency("en-GB", "GBP", totalIncome - totalExpenses)}
          className="col-span-2"
        />
        <Card
          heading="In"
          body={formatCurrency("en-GB", "GBP", totalIncome)}
          className="border-green-500 bg-green-200"
        />
        <Card
          heading="Out"
          body={formatCurrency("en-GB", "GBP", totalExpenses)}
          className="border-red-500 bg-red-200"
        />
      </div>
    </div>
  );
}
