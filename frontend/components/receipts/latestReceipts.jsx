import { format } from "date-fns";
import { groupByDate, useReceipts } from "../../lib/receipts";
import ReceiptGroup from "./receiptGroup";

export default function LatestReceipts() {
  const { receipts } = useReceipts();

  const groups = groupByDate(receipts);

  return (
    <>
      <div className="flex flex-col space-y-3">
        <p className="text-sm">Click each date to show/hide receipts</p>
        {groups &&
          groups.map(({ group, receipts }) => {
            const title = format(Date.parse(group), "PPP");
            return (
              <ReceiptGroup key={group} title={title} receipts={receipts} />
            );
          })}
      </div>
    </>
  );
}
