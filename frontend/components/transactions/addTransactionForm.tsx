import { AnimatePresence, motion, useCycle } from "framer-motion";
import { DateTime } from "luxon";
import { useState } from "react";
import { useAddTransaction } from "../../lib/transactions/hooks";
import Form from "../forms/form";
import Input, { InputType } from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import Toggle from "../inputs/toggle";

const dateFormat = "yyyy-MM-dd";

const icon = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
  },
};

const AddTransactionForm = () => {
  const [isIncome, setIsIncome] = useState(false);
  const [date, setDate] = useState(DateTime.now().toFormat(dateFormat));
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");

  const [showSuccessBanner, cycleShowSuccessBanner] = useCycle(false, true);

  const { addTransaction, loading } = useAddTransaction({
    isIncome,
    amount: Number(amount),
    details,
    date,
  });

  if (loading) return <p>Loading</p>;

  const updateDate = (value: string) =>
    setDate(DateTime.fromISO(value).toFormat(dateFormat));

  const handleSubmit = async () => {
    await addTransaction();
    setDetails("");
    setAmount("");
    cycleShowSuccessBanner();
    await new Promise((res) => setTimeout(res, 1250));
    cycleShowSuccessBanner();
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showSuccessBanner && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square 
            backdrop-blur-md border-2 border-neutral-500 rounded-lg flex flex-col space-y-4 items-center justify-center"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
                variants={icon}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 0.25,
                  default: { duration: 0.5, ease: "easeInOut" },
                }}
              />
            </svg>
            <p>Transaction has been added</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col space-y-6">
        <Form buttonLabel="Add transaction" onSubmit={handleSubmit}>
          <>
            <Toggle
              labelWhenOn="Income"
              labelWhenOff="Expense"
              onChange={setIsIncome}
              defaultState={isIncome}
            />
            <Input
              label="Date"
              type={InputType.DATE}
              value={date}
              onChange={updateDate}
            />
            <Textarea
              label="Details"
              required={false}
              value={details}
              onChange={setDetails}
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
    </div>
  );
};

export default AddTransactionForm;
