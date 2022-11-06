import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";
import Form from "../forms/form";
import Input, { InputType } from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import Toggle, { TogglePosition } from "../inputs/toggle";
import { DateTime } from "luxon";

type Props = {
  onClose: () => void;
};

enum ReceiptType {
  EXPENSE,
  INCOME,
}

const AddReceiptForm = ({ onClose }: Props) => {
  const [type, setType] = useState(ReceiptType.EXPENSE);
  const [date, setDate] = useState(DateTime.now().toUnixInteger());
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [amount, setAmount] = useState("0");

  const handleReceiptTypeToggle = (value: TogglePosition) =>
    setType(value ? ReceiptType.INCOME : ReceiptType.EXPENSE);

  const updateDate = (value: string) => {
    setDate(DateTime.fromISO(value).toUnixInteger());
    console.log(date);
  };

  return (
    <motion.div
      className="absolute top-0 right-0 bottom-0 left-0 backdrop-blur-xl"
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
        <Form>
          <>
            <Toggle
              labelWhenOn="Income"
              labelWhenOff="Expense"
              onChange={handleReceiptTypeToggle}
            />
            <Input
              label="Date"
              type={InputType.DATE}
              value={date}
              onChange={updateDate}
            />
            <Textarea
              label="Additional details"
              value={additionalDetails}
              onChange={setAdditionalDetails}
            />
            <Input
              label="Amount"
              type={InputType.NUMBER}
              value={amount}
              onChange={setAmount}
            />
          </>
        </Form>
      </div>
    </motion.div>
  );
};

export default AddReceiptForm;
