import { useRouter } from "next/router";
import ReceiptsPage from "../../components/receipts/receiptsPage";
import { useReceipts } from "../../lib/receipts";

export default function ReceiptInfoPage() {
  const router = useRouter();
  const { receipts, isLoading, isError } = useReceipts();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  return (
    <ReceiptsPage
      showForm={true}
      receipt={receipts.filter(({ id }) => id == router.query.id)[0]}
    />
  );
}
