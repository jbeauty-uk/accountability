import { useRouter } from "next/router";
import { PrimaryButton } from "../buttons";
import { PageHeading } from "../headings";
import LatestReceipts from "./latestReceipts";
import ReceiptForm from "./receiptForm";

export default function ReceiptsPage({ showForm = false, receipt = {} }) {
  const router = useRouter();

  const closeForm = () => router.push("/receipts");

  return (
    <div className="flex flex-col space-y-4">
      <PageHeading
        heading="Receipts"
        subheading="The place to track your income and expenses"
      />
      <PrimaryButton
        text="Add new receipt"
        onClick={() => router.push("/receipts/new")}
      />
      {showForm && <ReceiptForm close={closeForm} receipt={receipt} />}
      <LatestReceipts />
    </div>
  );
}
