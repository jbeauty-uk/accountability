import { DateTime } from "luxon";
import { useState } from "react";
import Select from "../../components/inputs/Select";
import Statement from "../../components/statements/statement";
import { ViewOptions } from "../../lib/statements/viewOptions";
import { useAvailableMonths } from "../../lib/transactions/utils";

const now = DateTime.now();

const StatementPage = () => {
  const [currentRange, setCurrentRange] = useState({
    label: "Today",
    from: now.startOf("day").toISODate(),
    to: now.plus({ days: 1 }).toISODate(),
  });

  const { loading, availableMonths } = useAvailableMonths();

  if (!loading && !availableMonths.length) {
    return <p>No data found</p>;
  }

  const updateSelectedView = ({
    label,
    from,
    to,
  }: {
    label: string;
    from: string;
    to: string;
  }) => {
    setCurrentRange({ label, from, to });
  };

  if (loading) return <p>Loading</p>;

  return (
    <>
      <h1 className="text-2xl my-1">Statements</h1>
      <div className="my-1">
        <Select
          label="Showing statement for the following period:"
          labelClass="text-md"
          id="statement-view-options"
          name="statement-view-options"
          options={ViewOptions}
          additionalOptions={availableMonths}
          selected={ViewOptions[0].value}
          onChange={updateSelectedView}
        />
      </div>
      <Statement to={currentRange.to} from={currentRange.from} />
    </>
  );
};

export default StatementPage;
