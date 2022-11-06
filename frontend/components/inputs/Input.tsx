import React, { ChangeEvent } from "react";
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
  onChange: (value: string) => void;
}

const FormInput = <T extends number | string>(props: InputProps<T>) => {
  const { type = "text", label, placeholder, onChange } = props;

  const attributes = {
    placeholder,
    className: styles["input-field"],
    type,
    onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
  };

  return (
    <label className={styles["input"]}>
      <span className={styles["input-label"]}>{label}</span>
      <input {...attributes} />
    </label>
  );
};

export default FormInput;
