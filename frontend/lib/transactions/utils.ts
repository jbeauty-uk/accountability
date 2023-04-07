const formatter = new Intl.NumberFormat("en-GB", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function readAmount(amount: number): string {
  return formatter.format(Math.abs(amount) / 100);
}
