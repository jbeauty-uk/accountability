import { AnimatePresence, useCycle } from "framer-motion";
import AddReceiptButton from "../../components/receipts/addReceiptButton";
import AddReceiptForm from "../../components/receipts/addReceiptForm";
import ReceiptsOverview from "../../components/receipts/overview";
import MonthPickerCarousel from "../../components/receipts/overview/monthPickerCarousel";

const ReceiptPage = () => {
  const [showNewReceiptForm, toggleNewReceiptForm] = useCycle(false, true);

  return (
    <>
      <h1 className="text-2xl">Receipts</h1>
      <div>
        <div>
          <MonthPickerCarousel />
          <ReceiptsOverview />
        </div>
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
