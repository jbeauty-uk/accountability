import { useState } from "react";
import { PrimaryButton } from "../../components/buttons";
import PageHeading from "../../components/layout/pageHeading";
import LatestReceipts from "../../components/receipts/latestReceipts";
import ReceiptForm from "../../components/receipts/receiptForm";

export default function ReceiptsPage() {
  const [formVisible, setFormVisible] = useState(false);

  const closeForm = () => setFormVisible(false);

  return (
    <>
      <PageHeading
        heading="Receipts"
        subheading="The place to track your income and expenses"
      />
      <PrimaryButton
        text="Add new receipt"
        onClick={() => setFormVisible(true)}
      />

      {formVisible && <ReceiptForm close={closeForm} />}
      <LatestReceipts />
    </>
  );
}
