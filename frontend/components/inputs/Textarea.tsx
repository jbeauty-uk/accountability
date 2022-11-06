import styles from "./Input.module.css";
import type { Props } from "./Input";

type TextareaProps = {
  rows?: number;
} & Props<string>;

const Textarea = (props: TextareaProps) => {
  const { rows = 3, label } = props;

  const attributes = {
    className: styles["input-textarea"],
    rows,
  };

  return (
    <label className={styles.input}>
      <span className={styles["input-label"]}>{label}</span>
      <textarea {...attributes} />
    </label>
  );
};

export default Textarea;
