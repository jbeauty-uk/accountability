import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

type Props = {
  onClose: () => void;
};

const AddReceiptForm = ({ onClose }: Props) => (
  <motion.div
    className="absolute top-0 right-0 bottom-0 left-0 backdrop-blur"
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "100%" }}
    transition={{ duration: 0.5, ease: "anticipate" }}
  >
    <div className="p-6">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">New Receipt</h1>
        <XMarkIcon className="h-10 w-10 text-neutral-900" onClick={onClose} />
      </div>
    </div>
  </motion.div>
);

export default AddReceiptForm;
