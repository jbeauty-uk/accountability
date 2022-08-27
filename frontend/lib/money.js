export function formatCurrency(locale, currency, amount) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
}
