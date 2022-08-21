import axios from "axios";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { isoDate } from "../../lib/date";
import { PrimaryButton } from "../buttons";
import { DateInput, RadioInput, TextareaInput, TextInput } from "../formInputs";

export default function ReceiptForm({ close, receipt }) {
  const { mutate } = useSWRConfig();

  const [type, setType] = useState(receipt.type || "INCOME");
  const [date, setDate] = useState(receipt.date || isoDate());
  const [details, setDetails] = useState(receipt.details || "");
  const [amount, setAmount] = useState(receipt.amount / 100 || "");

  const radioOptions = [
    {
      label: "Income",
      value: "INCOME",
      onChange: () => {},
      onClick: () => setType("INCOME"),
    },
    {
      label: "Expense",
      value: "EXPENSE",
      onChange: () => {},
      onClick: () => setType("EXPENSE"),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(process.env.NEXT_PUBLIC_RECEIPTS_URL, {
      type,
      date,
      details,
      amount: amount * 100,
    });
    mutate(process.env.NEXT_PUBLIC_RECEIPTS_URL);
    close();
  };

  return (
    <div className="container absolute top-0 left-0 h-full backdrop-blur-sm flex items-center">
      <div className="bg-neutral-50 border-2 border-neutral-400 rounded-lg p-4 w-full">
        <div className="flex flex-col pb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl">
              {receipt.id ? "Update receipt" : "Create receipt"}
            </h2>
            <button onClick={close}>Close</button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <RadioInput
            label="Receipt type"
            options={radioOptions}
            defaultOption={type == "INCOME" ? 0 : 1}
          />
          <DateInput
            label="Receipt Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextareaInput
            label="Additional details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <TextInput
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <PrimaryButton
            text={receipt.id ? "Update receipt" : "Create receipt"}
          />
        </form>
      </div>
    </div>
  );
}
