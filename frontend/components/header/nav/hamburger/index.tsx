import { motion } from "framer-motion";

type Props = {
  open: boolean;
  cycleOpen: () => void;
};

const Hamburger = ({ open = false, cycleOpen }: Props) => (
  <motion.div
    initial={{
      rotate: 0,
    }}
    animate={{
      rotate: open ? 90 : 0,
    }}
    transition={{
      ease: "backInOut",
    }}
    className="aspect-square h-12 bg-neutral-50"
    onClick={cycleOpen}
  />
);

export default Hamburger;
