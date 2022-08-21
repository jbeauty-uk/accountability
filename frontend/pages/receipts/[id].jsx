import { useRouter } from "next/router";
import ReceiptsPage from "../../components/receipts/receiptsPage";
import { useReceipts } from "../../lib/receipts";

export default function ReceiptInfoPage() {
  const router = useRouter();
  const { receipts } = useReceipts();

  return (
    <ReceiptsPage
      showForm={true}
      receipt={receipts.filter(({ id }) => id == router.query.id)[0]}
    />
  );
}
