import Link from "next/link";

export default function InvoicesSummaryPage() {
  return (
    <>
      <h1>Invoicing</h1>

      <Link href="/transactions/new">Add Transaction</Link>
    </>
  );
}
