import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

type Props = {
  onClick?: () => void;
};

const AddReceiptButton = ({ onClick }: Props) => (
  <motion.button onClick={onClick}>Add a new receipt</motion.button>
);

export default AddReceiptButton;
