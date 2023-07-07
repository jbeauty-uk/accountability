import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./Toggle.module.css";

type Props = {
  defaultState?: boolean;
  labelWhenOn: string;
  labelWhenOff: string;
  onChange: (value: boolean) => void;
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Toggle = ({
  labelWhenOn,
  labelWhenOff,
  onChange,
  defaultState = false,
}: Props) => {
  const [isOn, setIsOn] = useState(defaultState);

  useEffect(() => onChange(isOn), [onChange, isOn]);

  return (
    <div
      className="flex flex-row space-x-2 items-center w-fit"
      onClick={() => setIsOn(!isOn)}
    >
      <div className={styles.switch} data-ison={isOn}>
        <motion.div
          className={styles.toggle}
          layout
          transition={spring}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
      <p className="text-lg">{isOn ? labelWhenOn : labelWhenOff}</p>
    </div>
  );
};

export default Toggle;
