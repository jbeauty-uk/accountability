import { ChangeEvent } from "react";
import styles from "./Input.module.css";

export enum InputType {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
}

interface InputProps<T> extends Props<T> {
  type: InputType;
}

export interface Props<T> {
  label: string;
  placeholder?: string;
  value: T;
  required?: boolean;
  onChange: (value: string) => void;
}

const FormInput = <T extends number | string>({
  type = InputType.TEXT,
  label,
  placeholder,
  value,
  required = true,
  onChange,
}: InputProps<T>) => {
  const attributes = {
    placeholder,
    className: styles["input-field"],
    type,
    value,
    required,
    onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
  };

  return (
    <label className={styles["input"]}>
      <span className={styles["input-label"]}>
        <p className="text-lg">{label}</p>
        {required && <p className="text-xs text-purple-600">(Required)</p>}
      </span>
      <input {...attributes} />
    </label>
  );
};

export default FormInput;
