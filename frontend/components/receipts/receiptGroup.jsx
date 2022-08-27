import { useState } from "react";
import { formatCurrency } from "../../lib/money";
import ReceiptPreview from "../receipts/receiptPreview";

const receiptSort = (a, b) => {
  const aCreatedAt = new Date(a.createdAt);
  const bCreatedAt = new Date(b.createdAt);
  return bCreatedAt.getTime() - aCreatedAt.getTime();
};

export default function ReceiptGroup({ title, receipts = [] }) {
  const [open, setOpen] = useState(false);

  const total = receipts.reduce((t, receipt) => {
    const type = receipt.type;
    const amount = receipt.amount / 100;
    return (t = type === "INCOME" ? (t += amount) : (t -= amount));
  }, 0);

  if (!receipts.length) return;

  return (
    <div className="flex flex-col space-y-3">
      <div
        className="flex items-center space-x-2"
        onClick={() => setOpen(!open)}
      >
        <h2>{title}</h2>
        <h2>({formatCurrency("en-GB", "GBP", total)})</h2>
      </div>

      {open && (
        <div className="flex flex-col space-y-3">
          {receipts.sort(receiptSort).map((receipt, index) => (
            <ReceiptPreview key={index} {...receipt} />
          ))}
        </div>
      )}
    </div>
  );
}
