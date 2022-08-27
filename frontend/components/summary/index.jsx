import { useAvailableYears, useYearCalculations } from "../../lib/summary";
import { Card } from "../cards";
import Dropdown from "../formInputs";
import NoDataAvailable from "./noDataAvailable";

export default function Summary() {
  const { years, selectedYear, setSelectedYear } = useAvailableYears();

  const { totalIncome, totalExpenses, total } =
    useYearCalculations(selectedYear);

  if (!years.length) {
    return <NoDataAvailable />;
  }

  return (
    <div className="flex flex-col space-y-4">
      <Dropdown
        label="Show summary for year"
        options={years}
        onChange={(e) => setSelectedYear(e.target.value)}
      />
      <div className="grid grid-col-2 gap-2">
        <Card heading="Total" body={total} className="col-span-2" />
        <Card
          heading="In"
          body={totalIncome}
          className="border-green-500 bg-green-200"
        />
        <Card
          heading="Out"
          body={totalExpenses}
          className="border-red-500 bg-red-200"
        />
      </div>
    </div>
  );
}
