import { gql, useMutation } from "@apollo/client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { useState } from "react";
import Form from "../forms/form";
import Input, { InputType } from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import Toggle from "../inputs/toggle";

type Props = {
  onClose: () => void;
};

enum ReceiptType {
  EXPENSE = "expense",
  INCOME = "income",
}

const dateFormat = "yyyy-MM-dd";

const ADD_RECEIPT = gql`
  mutation addReceipt($date: Date!, $details: String, $amount: Int!) {
    addReceipt(date: $date, details: $details, amount: $amount) {
      id
    }
  }
`;

const AddReceiptForm = ({ onClose }: Props) => {
  const [type, setType] = useState(ReceiptType.EXPENSE);
  const [date, setDate] = useState(DateTime.now().toFormat(dateFormat));
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [amount, setAmount] = useState("");

  const [addReceipt, { data, loading, error }] = useMutation(ADD_RECEIPT, {
    variables: {
      date,
      details: additionalDetails,
      amount:
        type == ReceiptType.INCOME
          ? parseInt(amount) * 100
          : parseInt(amount) * -100,
    },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const updateDate = (value: string) =>
    setDate(DateTime.fromISO(value).toFormat(dateFormat));

  const handleSubmit = () => {
    addReceipt();
    onClose();
  };

  return (
    <motion.div
      className="absolute top-0 right-0 bottom-0 left-0 backdrop-blur-xl"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: "anticipate" }}
    >
      <div className="p-6 flex flex-col space-y-6">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl">New Receipt</h1>
          <XMarkIcon className="h-10 w-10 text-neutral-900" onClick={onClose} />
        </div>
        <Form buttonLabel="Add receipt" onSubmit={handleSubmit}>
          <>
            <Toggle
              labelWhenOn="Income"
              labelWhenOff="Expense"
              onChange={(isOn) =>
                setType(isOn ? ReceiptType.INCOME : ReceiptType.EXPENSE)
              }
            />
            <Input
              label="Date"
              type={InputType.DATE}
              value={date}
              onChange={updateDate}
            />
            <Textarea
              label="Additional details"
              required={false}
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
