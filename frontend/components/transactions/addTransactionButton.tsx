import { motion } from "framer-motion";

type Props = {
  onClick?: () => void;
};

const AddTransactionButton = ({ onClick }: Props) => (
  <motion.button onClick={onClick}>Add a new transaction</motion.button>
);

export default AddTransactionButton;
