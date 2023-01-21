import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import Select from "../../components/inputs/Select";
import Statement from "../../components/statements/statement";
import { useStatements } from "../../lib/statements/hooks";

const now = DateTime.now();

const ViewOptions = [
  {
    value: "today",
    label: "Today",
    from: now.toISODate(),
    to: now.plus({ days: 1 }).toISODate(),
  },
  {
    value: "this-week",
    label: "This week",
    from: now.startOf("week").toISODate(),
    to: now.startOf("week").plus({ week: 1 }).toISODate(),
  },
  {
    value: "this-month",
    label: "This month",
    from: now.startOf("month").toISODate(),
    to: now.startOf("week").plus({ month: 1 }).toISODate(),
  },
];

const StatementPage = () => {
  const [selectedView, setSelectedView] = useState(0);

  const updateSelectedView = (value: string) => {
    setSelectedView(ViewOptions.map((e) => e.value).indexOf(value));
  };

  return (
    <>
      <h1 className="text-2xl my-1">Statements</h1>
      <div className="my-1">
        <Select
          label="Showing statement for the following period:"
          labelClass="text-md"
          id="statemen-view-options"
          name="statement-view-options"
          options={ViewOptions}
          selected={ViewOptions[selectedView].value}
          onChange={updateSelectedView}
        />
      </div>
      <Statement
        to={ViewOptions[selectedView].to}
        from={ViewOptions[selectedView].from}
      />
    </>
  );
};

export default StatementPage;
