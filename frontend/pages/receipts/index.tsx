import { AnimatePresence, useCycle } from "framer-motion";
import AddReceiptButton from "../../components/receipts/addReceiptButton";
import AddReceiptForm from "../../components/receipts/addReceiptForm";
import SummaryContainer from "../../components/receipts/summary/summaryContainer";

const ReceiptPage = () => {
  const [showNewReceiptForm, toggleNewReceiptForm] = useCycle(false, true);

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
