export { cn } from "cn";

export function convert24to12(time24: string) {
  const [hours, minutes] = time24.split(":");
  const numHours = parseInt(hours, 10);

  const period = numHours >= 12 ? "pm" : "am";
  const hours12 = numHours % 12 || 12;

  return `${hours12}:${minutes} ${period}`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTime(date: string | null) {
  if (!date) return "—";

  return new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  }).format(
    Math.round((new Date(date).getTime() - Date.now()) / 60000),
    "minute",
  );
}
