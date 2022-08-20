import axios from "axios";
import {signIn, useSession} from "next-auth/react";
import {useState} from "react";
import TreatmentOptions from "../../components/treatment/treatmentOptions";
import {isoDate} from "../../lib/date";

export default function NewTransactionPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated: signIn,
  });

  const [date, setDate] = useState(isoDate);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [amount, setAmount] = useState("");

  if (status != "authenticated") {
    return <p>You must sign in to see this page</p>;
  }

  if (status == "loading") {
    return <p>Loading</p>;
  }

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const form = {
      date,
      treatments: selectedTreatments,
      amount,
    };
    await axios.post("http://localhost:8080/receipt/income", form);
    setSelectedTreatments([]);
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <TreatmentOptions
        selected={selectedTreatments}
        setSelected={setSelectedTreatments}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}
