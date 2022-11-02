import { AnimatePresence, useCycle } from "framer-motion";
import AddReceiptButton from "../../components/receipts/addReceiptButton";
import AddReceiptForm from "../../components/receipts/addReceiptForm";
import SummaryContainer from "../../components/receipts/summary/summaryContainer";

const ReceiptPage = () => {
  const [showReceiptForm, cycleReceiptForm] = useCycle(false, true);

  return (
    <>
      <h1 className="text-2xl">Receipts</h1>
      <div>
        <SummaryContainer />
        <AddReceiptButton onClick={cycleReceiptForm} />
        <AnimatePresence>
          {showReceiptForm && <AddReceiptForm onClose={cycleReceiptForm} />}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ReceiptPage;
