import Pill from "../pill";
import { format } from "date-fns";

export default function ReceiptPreview({ type, date, details, amount }) {
  return (
    <div className="border-2 rounded-md p-4">
      <div className="flex space-x-2">
        <p>{format(Date.parse(date), "PPP")}</p>
        {type === "INCOME" && <Pill text="Income" colour="bg-green-300" />}
        {type === "EXPENSE" && <Pill text="Expense" colour="bg-red-300" />}
      </div>
      <p>£{amount / 100}</p>
    </div>
  );
}
