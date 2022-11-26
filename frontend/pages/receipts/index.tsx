import axios from "axios";
import { AnimatePresence, useCycle } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AddReceiptButton from "../../components/receipts/addReceiptButton";
import AddReceiptForm from "../../components/receipts/addReceiptForm";
import SummaryContainer from "../../components/receipts/summary/summaryContainer";
import useReceipts from "../../hooks/receipts/useReceipts";

const ReceiptPage = () => {
  const [showNewReceiptForm, toggleNewReceiptForm] = useCycle(false, true);
  const { status, data: session } = useSession();

  useEffect(() => {
    console.log(status);
  }, [status, session]);

  if (status != "authenticated") {
    return <p>Loading</p>;
  }

  const { receipts, isError, isLoading } = useReceipts(session!.accessToken);

  if (isLoading) return <p>Loading receipts</p>;
  if (isError) return <p>Error</p>;

  console.log(receipts);

  return (
    <>
      <h1 className="text-2xl">Receipts</h1>
      <div>
        <SummaryContainer />
        <AddReceiptButton onClick={toggleNewReceiptForm} />
        <AnimatePresence>
          {showNewReceiptForm && (
            <AddReceiptForm onClose={toggleNewReceiptForm} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ReceiptPage;
