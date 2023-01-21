import styles from "./Button.module.css";
import { motion } from "framer-motion";

export enum ButtonType {
  PRIMARY = "button-primary",
  SECONDARY = "button-secondary",
}

type Props = {
  buttonType?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  label: string;
  onClick: () => void;
};

const Button = ({
  buttonType = ButtonType.PRIMARY,
  disabled = false,
  loading = false,
  label,
  onClick,
}: Props) => {
  return (
    <motion.button
      onClick={onClick}
      className={styles[buttonType]}
      disabled={disabled || loading}
      whileTap={{
        scale: 0.9,
      }}
      whileHover={{
        scale: 1.1,
      }}
    >
      {label}
    </motion.button>
  );
};

export default Button;
