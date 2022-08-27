import { useReceipts } from "../../lib/receipts";
import ReceiptPreview from "./receiptPreview";

const receiptSort = (a, b) => {
  const aCreatedAt = new Date(a.createdAt);
  const bCreatedAt = new Date(b.createdAt);
  return bCreatedAt.getTime() - aCreatedAt.getTime();
};

export default function LatestReceipts() {
  const { receipts } = useReceipts();

  return (
    <>
      <h2 className="text-xl">Latest Receipts</h2>
      <div className="flex flex-col space-y-3">
        {receipts &&
          receipts
            .sort(receiptSort)
            .map((receipt, index) => (
              <ReceiptPreview key={index} {...receipt} />
            ))}
      </div>
    </>
  );
}
