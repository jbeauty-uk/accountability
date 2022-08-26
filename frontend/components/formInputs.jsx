import {useState} from "react";

const labelClassName = "text-gray-700";
const inputClassName =
  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50";

export function TextInput({ label, type, value, onChange }) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
    </label>
  );
}

export function DateInput({ label, value, onChange }) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <input
        value={value}
        onChange={onChange}
        type="date"
        className={inputClassName}
      />
    </label>
  );
}

export function TextareaInput({ label, value, onChange }) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <textarea
        rows="3"
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
    </label>
  );
}

export function RadioInput({ label, options, defaultOption = 0 }) {
  const [selected, setSelected] = useState(options[defaultOption].value);

  const select = (value) => {
    setSelected(value);
  };

  return (
    <fieldset className="block">
      <legend className={labelClassName}>{label}</legend>
      <div className="mt-2">
        {options.map(({ label, value, onChange, onClick }) => (
          <div key={label}>
            <label className="inline-flex items-center">
              <input
                className="form-radio checked:bg-sky-400"
                type="radio"
                name="radio-direct"
                value={value}
                checked={value === selected}
                onChange={onChange}
                onClick={() => {
                  select(value);
                  onClick(value);
                }}
              />
              <span className="ml-2">{label}</span>
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default function Dropdown({
  label,
  options,
  defaultOption = 0,
  onChange,
}) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <select
        className={inputClassName}
        defaultValue={options[defaultOption].value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
