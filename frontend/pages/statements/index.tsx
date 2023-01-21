import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import Select from "../../components/inputs/Select";
import { useStatements } from "../../lib/statements/hooks";
import { formatAmount } from "../../lib/utils";

const StatementPage = () => {
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

  const [selectedView, setSelectedView] = useState(0);

  const { data, refetch } = useStatements(
    ViewOptions[selectedView].to,
    ViewOptions[selectedView].from
  );

  const updateSelectedView = (value: string) => {
    setSelectedView(ViewOptions.map((e) => e.value).indexOf(value));
  };

  useEffect(() => {
    refetch({
      to: ViewOptions[selectedView].to,
      from: ViewOptions[selectedView].from,
    });
  }, [selectedView]);

  return (
    <>
      <h1 className="text-2xl">Statements</h1>
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
      {data?.getStatementInRange.receipts.length ? (
        data?.getStatementInRange.receipts.map(({ id, date, amount }) => (
          <div className="flex flex-row justify-between" key={id}>
            <p>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}</p>
            <p>{formatAmount(amount)}</p>
          </div>
        ))
      ) : (
        <p>There's nothing to show here</p>
      )}
    </>
  );
};

export default StatementPage;
