import { useState } from "react";

export default function IncomeReceiptForm({
  defaultDate,
  setDefaultDate,
  defaultAmount,
  setDefaulAmount,
}) {
  const [date, setDate] = useState(defaultDate);
  const [amount, setAmount] = useState(defaultAmount);

  const changeDate = (newDate) => {
    setDate(newDate);
    setDefaultDate(newDate);
  };

  const changeAmount = (newAmount) => {
    setAmount(newAmount);
    setDefaulAmount(newAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <label className="block">
        <span className="text-gray-700">Receipt Date</span>
        <input
          value={date}
          onChange={(e) => changeDate(e.target.value)}
          type="date"
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Additional details</span>
        <textarea className="mt-1 block w-full" rows="3" />
      </label>
      <label className="block">
        <span className="text-gray-700">Amount</span>
        <input
          value={amount}
          onChange={(e) => changeAmount(e.target.value)}
          type="number"
          className="form-input mt-1 block w-full"
        />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
}
