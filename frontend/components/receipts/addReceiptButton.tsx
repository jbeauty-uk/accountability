import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

type Props = {
  onClick?: () => void;
};

const AddReceiptButton = ({ onClick }: Props) => (
  <motion.div
    whileTap={{
      scale: 0.9,
    }}
    whileHover={{
      scale: 1.1,
    }}
    className="absolute bottom-6 right-6"
    onClick={onClick}
  >
    <PlusCircleIcon className="h-16 w-16 text-purple-600" />
  </motion.div>
);

export default AddReceiptButton;
