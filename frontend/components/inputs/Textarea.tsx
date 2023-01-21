import styles from "./Input.module.css";
import type { Props } from "./Input";
import { ChangeEvent } from "react";

type TextareaProps = {
  rows?: number;
} & Props<string>;

const Textarea = ({
  rows = 3,
  required = true,
  label,
  value,
  onChange,
}: TextareaProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    onChange(e.target.value);

  const attributes = {
    rows,
    required,
    value,
    onChange: handleChange,
    className: styles["input-textarea"],
  };

  return (
    <label className={styles.input}>
      <span className={styles["input-label"]}>
        <p className="text-lg">{label}</p>
        {required && <p className="text-xs text-purple-600">(Required)</p>}
      </span>
      <textarea {...attributes} />
    </label>
  );
};

export default Textarea;
