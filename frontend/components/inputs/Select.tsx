import styles from "./Input.module.css";

interface Props {
  label: string;
  labelClass?: string;
  name: string;
  id: string;
  options: DateOption[];
  additionalOptions?: DateOption[];
  selected: DateOption["value"];
  onChange: (option: { label: string; from: string; to: string }) => void;
}

export interface DateOption {
  label: string;
  value: string;
  from: string;
  to: string;
}

const Select = ({
  label,
  labelClass,
  name,
  id,
  options,
  additionalOptions,
  onChange,
  selected,
}: Props) => {
  return (
    <label className={styles["input"]}>
      <span className={styles["input-label"]}>
        <p className={labelClass || "text-lg"}>{label}</p>
      </span>
      <select
        name={name}
        id={id}
        className={styles["input-field"]}
        onChange={({ target }) => {
          const selectedOption = target.selectedOptions[0];
          const { from, to } = selectedOption.dataset;
          const option = {
            label: selectedOption.innerText,
            from: from || "",
            to: to || "",
          };
          onChange(option);
        }}
        defaultValue={selected}
      >
        <optgroup label="Current">
          {options.map(({ label, value, from, to }, index) => (
            <option key={index} value={value} data-from={from} data-to={to}>
              {label}
            </option>
          ))}
        </optgroup>
        {additionalOptions?.length && (
          <optgroup label="Previous">
            {additionalOptions.map(({ label, value, from, to }, index) => (
              <option key={index} value={value} data-from={from} data-to={to}>
                {label}
              </option>
            ))}
          </optgroup>
        )}
      </select>
    </label>
  );
};

export default Select;
