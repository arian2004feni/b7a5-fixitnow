import { CustomerShell } from "@/components/fixitnow/customer-shell";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomerShell>{children}</CustomerShell>;
}
