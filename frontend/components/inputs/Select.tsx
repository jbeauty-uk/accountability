import styles from "./Input.module.css";

interface Props {
  label: string;
  labelClass?: string;
  name: string;
  id: string;
  options: Option[];
  selected: Option["value"];
  onChange: (i: Option["value"]) => void;
}

interface Option {
  label: string;
  value: string;
}

const Select = ({
  label,
  labelClass,
  name,
  id,
  options,
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
        onChange={(e) => onChange(e.target.value)}
        defaultValue={selected}
      >
        {options.map(({ label, value }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
