import { useState } from "react";
import PageHeading from "../../components/layout/pageHeading";
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
      <button onClick={() => setFormVisible(true)}>Add new receipt</button>
      {formVisible && <ReceiptForm close={closeForm} />}
    </>
  );
}
