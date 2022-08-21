import axios from "axios";
import { useState } from "react";
import { isoDate } from "../../lib/date";
import { PrimaryButton } from "../buttons";
import { DateInput, RadioInput, TextareaInput, TextInput } from "../formInputs";
import { useSWRConfig } from "swr";

export default function ReceiptForm({ close }) {
  const { mutate } = useSWRConfig();

  const [type, setType] = useState("INCOME");
  const [date, setDate] = useState(isoDate());
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");

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
    // setDetails("");
    // setAmount("");
  };

  return (
    <div className="container absolute top-0 left-0 h-full backdrop-blur-sm flex items-center">
      <div className="bg-neutral-50 border-2 border-neutral-400 rounded-lg p-4 w-full">
        <div className="flex flex-col pb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl">Save New Receipt</h2>
            <button onClick={close}>Close</button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <RadioInput label="Receipt type" options={radioOptions} />
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
          <PrimaryButton text="Save Receipt" />
        </form>
      </div>
    </div>
  );
}
