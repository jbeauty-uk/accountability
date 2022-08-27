import { useEffect, useState } from "react";
import { isoDate } from "./date";
import { formatCurrency } from "./money";
import { useReceipts } from "./receipts";

export function useAvailableYears() {
  const { receipts } = useReceipts();
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(isoDate().slice(0, 4));

  useEffect(() => {
    if (!receipts) return;
    const years = [
      ...new Set(
        receipts
          .map((receipt) => receipt.date)
          .map((date) => date.slice(0, 4))
          .reduce((previous, current) => [...previous, current], [])
      ),
    ].sort((a, b) => b - a);
    setYears(years);
  }, [receipts]);

  return { years, selectedYear, setSelectedYear };
}

export function useYearCalculations(year) {
  const { receipts } = useReceipts();
  const [totalIncome, setTotalIncome] = useState(-1);
  const [totalExpenses, setTotalExpenses] = useState(-1);
  const [total, setTotal] = useState(-1);

  useEffect(() => {
    if (!receipts) return;

    const income = receipts
      .filter((receipt) => receipt.type === "INCOME")
      .filter((receipt) => receipt.date.slice(0, 4) == year)
      .map((receipt) => receipt.amount)
      .reduce((previous, current) => previous + current / 100, 0);

    setTotalIncome(formatCurrency("en-GB", "GBP", income));

    const expenses = receipts
      .filter((receipt) => receipt.type === "EXPENSE")
      .filter((receipt) => receipt.date.slice(0, 4) == year)
      .map((receipt) => receipt.amount)
      .reduce((previous, current) => previous + current / 100, 0);

    setTotalExpenses(formatCurrency("en-GB", "GBP", expenses));

    setTotal(formatCurrency("en-GB", "GBP", income - expenses));
  }, [receipts, year]);

  return {
    totalIncome,
    totalExpenses,
    total,
  };
}
