export function getAvailableYears(receipts = []) {
  if (receipts.length) {
    return [
      ...new Set(
        receipts
          .map((receipt) => receipt.date)
          .map((date) => date.slice(0, 4))
          .reduce((previous, current) => [...previous, current], [])
      ),
    ].sort((a, b) => b - a);
  }

  return [];
}

export function calculateTotalIncomeForYear(receipts = [], year) {
  if (receipts.length && year) {
    return receipts
      .filter((receipt) => receipt.date.slice(0, 4) == year)
      .filter((receipt) => receipt.type === "INCOME")
      .map((receipt) => receipt.amount)
      .reduce((previous, current) => previous + current / 100, 0);
  }

  return -1;
}

export function calculateTotalExpensesForYear(receipts = [], year) {
  if (receipts.length && year) {
    return receipts
      .filter((receipt) => receipt.date.slice(0, 4) == year)
      .filter((receipt) => receipt.type === "EXPENSE")
      .map((receipt) => receipt.amount)
      .reduce((previous, current) => previous + current / 100, 0);
  }

  return -1;
}
