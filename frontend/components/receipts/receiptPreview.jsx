import { useRouter } from "next/router";
import { formatCurrency } from "../../lib/money";
import Pill from "../pill";

export default function ReceiptPreview({ id, type, date, details, amount }) {
  const router = useRouter();

  amount = formatCurrency("en-GB", "GBP", amount / 100);

  const pill =
    type === "INCOME" ? (
      <Pill text="Income" colour="bg-green-300" />
    ) : (
      <Pill text="Expense" colour="bg-red-300" />
    );

  return (
    <div
      className="flex justify-between border-2 rounded-md p-4"
      onClick={() => router.push(`/receipts/${id}`)}
    >
      <p>{amount}</p>
      {pill}
    </div>
  );
}
