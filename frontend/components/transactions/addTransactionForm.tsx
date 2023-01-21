import { useMutation } from "@apollo/client";
import { DateTime } from "luxon";
import { useState } from "react";
import { ADD_TRANSACTION } from "../../lib/graphql/queries";
import Form from "../forms/form";
import Input, { InputType } from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import Toggle from "../inputs/toggle";

enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
}

const dateFormat = "yyyy-MM-dd";

const AddTransactionForm = () => {
  const [type, setType] = useState(TransactionType.EXPENSE);
  const [date, setDate] = useState(DateTime.now().toFormat(dateFormat));
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [amount, setAmount] = useState("");

  const [addReceipt, { data, loading, error }] = useMutation(ADD_TRANSACTION, {
    variables: {
      date,
      details: additionalDetails,
      amount:
        type == TransactionType.INCOME
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
  };

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <Form buttonLabel="Add transaction" onSubmit={handleSubmit}>
          <>
            <Toggle
              labelWhenOn="Income"
              labelWhenOff="Expense"
              onChange={(isOn) =>
                setType(isOn ? TransactionType.INCOME : TransactionType.EXPENSE)
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
    </div>
  );
};

export default AddTransactionForm;
