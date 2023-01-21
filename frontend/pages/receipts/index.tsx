import { AnimatePresence, useCycle } from "framer-motion";
import AddReceiptButton from "../../components/receipts/addReceiptButton";
import AddReceiptForm from "../../components/receipts/addReceiptForm";

const ReceiptPage = () => {
  const [showNewReceiptForm, toggleNewReceiptForm] = useCycle(false, true);

  return (
    <>
      <h1 className="text-2xl">Receipts</h1>
      <div>
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
