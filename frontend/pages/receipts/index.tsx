import AddReceiptButton from "../../components/receipts/addReceiptButton";
import SummaryContainer from "../../components/receipts/summary/summaryContainer";

const ReceiptPage = () => (
  <>
    <h1 className="text-2xl">Receipts</h1>
    <SummaryContainer />
    <AddReceiptButton />
  </>
);

export default ReceiptPage;
