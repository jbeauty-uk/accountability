import { useState } from "react";
import Select from "../../components/inputs/Select";
import Statement from "../../components/statements/statement";
import { ViewOptions } from "../../lib/statements/viewOptions";

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
