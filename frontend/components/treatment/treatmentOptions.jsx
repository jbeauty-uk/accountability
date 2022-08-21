import React from "react";
import { useTreatmentCategories } from "../../lib/treatments";

export default function TreatmentOptions({ selected, setSelected }) {
  const { treatmentCategories } = useTreatmentCategories();

  const toggleSelection = (id) => {
    selected.includes(id)
      ? setSelected(selected.filter((i) => i !== id))
      : setSelected([...selected, id]);
  };

  return (
    <>
      {treatmentCategories &&
        treatmentCategories.map(({ id, category }) => (
          <React.Fragment key={id}>
            <input
              type="checkbox"
              id={id}
              name={category}
              value={id}
              onClick={() => toggleSelection(id)}
              onChange={(e) => {}}
              checked={selected.includes(id)}
            ></input>
            <label htmlFor={id}>{category}</label>
          </React.Fragment>
        ))}
    </>
  );
}
