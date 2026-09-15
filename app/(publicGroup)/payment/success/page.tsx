import { CustomerShell } from "@/components/fixitnow/customer-shell";
import { PaymentResult } from "@/components/fixitnow/customer-pages";

export default function Page() {
  return (
    <CustomerShell>
      <PaymentResult />
    </CustomerShell>
  );
}
