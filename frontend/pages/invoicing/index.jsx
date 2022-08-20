import {signIn, useSession} from "next-auth/react";
import InvoicesSummary from "../../components/invoice/invoicesSummary";

export default function InvoicingPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated: signIn,
  });

  if (status != "authenticated") {
    return <p>You must sign in to see this page</p>;
  }

  if (status == "loading") {
    return <p>Loading</p>;
  }

  return <InvoicesSummary />;
}
