import { format } from "date-fns";
import { useRouter } from "next/router";
import { formatCurrency } from "../../lib/money";
import Pill from "../pill";

export default function ReceiptPreview({ id, type, date, details, amount }) {
  const router = useRouter();

  amount = formatCurrency("en-GB", "GBP", amount / 100);

  return (
    <div
      className="border-2 rounded-md p-4"
      onClick={() => router.push(`/receipts/${id}`)}
    >
      <div className="flex space-x-2">
        <p>{format(Date.parse(date), "PPP")}</p>
        {type === "INCOME" && <Pill text="Income" colour="bg-green-300" />}
        {type === "EXPENSE" && <Pill text="Expense" colour="bg-red-300" />}
      </div>
      <p>{amount}</p>
    </div>
  );
}
