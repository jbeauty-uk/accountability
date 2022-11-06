import { motion, useCycle } from "framer-motion";
import styles from "./Toggle.module.css";

type Props = {
  labelWhenOn: string;
  labelWhenOff: string;
  onChange: (value: TogglePosition) => void;
};

export enum TogglePosition {
  ON = 1,
  OFF = 0,
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Toggle = ({ labelWhenOn, labelWhenOff, onChange }: Props) => {
  const [position, cyclePosition] = useCycle(
    TogglePosition.ON,
    TogglePosition.OFF
  );

  const toggle = () => {
    cyclePosition();
    onChange(position);
  };

  return (
    <div className="flex flex-row space-x-2 items-center">
      <div className={styles.switch} onClick={toggle} data-ison={position}>
        <motion.div
          className={styles.toggle}
          layout
          transition={spring}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
      <p className="text-lg">
        {position === TogglePosition.ON ? `${labelWhenOn} ` : `${labelWhenOff}`}
      </p>
    </div>
  );
};

export default Toggle;
