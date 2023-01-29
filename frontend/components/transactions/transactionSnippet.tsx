import { useCycle } from "framer-motion";
import { useEffect, useState } from "react";
import { Transaction } from "../../lib/graphql/generated/graphql";
import { useUpdateTransaction } from "../../lib/transactions/hooks";
import { readAmount } from "../../lib/transactions/utils";
import { formatCurrency } from "../../lib/utils";
import Form from "../forms/form";
import Input, { InputType } from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import Toggle from "../inputs/toggle";

interface Props {
  id: Transaction["id"];
  date: Transaction["date"];
  details?: Transaction["details"];
  amount: Transaction["amount"];
}

const TransactionSnippet = (props: Props) => {
  const { id } = props;

  const [isIncome, setIsIncome] = useState(props.amount > 0);
  const [date, setDate] = useState(props.date);
  const [details, setDetails] = useState(props.details);
  const [amount, setAmount] = useState(readAmount(props.amount));

  const [edit, cycleEdit] = useCycle(false, true);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setIsUpdated(
      isIncome !== props.amount > 0 ||
        date !== props.date ||
        details !== props.details ||
        amount !== readAmount(props.amount)
    );
  }, [props, isIncome, date, details, amount]);

  const { updateTransaction } = useUpdateTransaction({
    id,
    isIncome,
    date,
    details,
    amount: Number((Number(amount) * 100).toFixed(0)),
  });

  const revertAndClose = () => {
    setIsIncome(props.amount > 0);
    setDate(props.date);
    setDetails(props.details);
    setAmount(readAmount(props.amount));
    cycleEdit();
  };

  const handleSubmit = async () => {
    if (isUpdated) {
      await updateTransaction();
    }
    cycleEdit();
  };

  return (
    <div
      onClick={() => !edit && cycleEdit()}
      className={`flex flex-row space-x-4 justify-between p-2 rounded-md border border-neutral-100 ${
        edit ? "border-purple-600" : ""
      }`}
    >
      {edit ? (
        <Form
          className="w-full p-2"
          buttonLabel="Update"
          onSubmit={handleSubmit}
          secondaryButtonLabel="Cancel"
          onSecondaryAction={revertAndClose}
        >
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
              onChange={setDate}
            />

            <Textarea
              label="Details"
              required={false}
              value={details || ""}
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
      ) : (
        <>
          <p className={`w-1/4 text-right ${isIncome && "text-purple-600"}`}>
            {formatCurrency(Number(amount) * 100)}
          </p>
          <p className={`w-3/4 text-left ${!details && "text-neutral-300"}`}>
            {details || "No details provided"}
          </p>
        </>
      )}
    </div>
  );
};

export default TransactionSnippet;
