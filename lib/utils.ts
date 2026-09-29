export { cn } from "cn";

export function convert24to12(time24: string) {
  const [hours, minutes] = time24.split(":");
  const numHours = parseInt(hours, 10);

  const period = numHours >= 12 ? "pm" : "am";
  const hours12 = numHours % 12 || 12;

  return `${hours12}:${minutes} ${period}`;
}
