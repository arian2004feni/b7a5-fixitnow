import { CheckCircle2, Clock3, CreditCard } from "lucide-react";
import PageHeading from "../../_components/customer/PageHeading";
import StatCard from "../../_components/customer/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCustomerPayments } from "../../_actions/customerActions";
import { ApiResponse } from "@/types/api";
import { Payment } from "@/types/payment";
import { PaymentStatus } from "@/types/enums";

const statusClass: Record<PaymentStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  PROCESSING: "bg-cyan-50 text-cyan-700",
  SUCCEEDED: "bg-emerald-50 text-emerald-700",
  FAILED: "bg-red-50 text-red-700",
  CANCELLED: "bg-red-100 text-red-600",
  REFUNDED: "bg-violet-50 text-violet-700",
};

export default async function PaymentsPage() {
  const payments: ApiResponse<Payment[]> = await getCustomerPayments();

  let totalPaidCount = 0;
  payments.data.map((pay) => {
    if (pay.bookings?.service?.price) {
      totalPaidCount = totalPaidCount + pay.bookings?.service?.price;
    }
  });

  let totalSuccessCount = 0;
  payments.data.map((pay) => {
    if (pay.status === PaymentStatus.SUCCEEDED) {
      totalSuccessCount = totalSuccessCount + 1;
    }
  });

  let totalPendingCount = 0;
  payments.data.map((pay) => {
    if (pay.status === PaymentStatus.PENDING) {
      totalPendingCount = totalPendingCount + 1;
    }
  });

  return (
    <div className="flex flex-col gap-7">
      <PageHeading
        title="Payments"
        description="Review your payment history and receipts."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total paid"
          value={totalPaidCount}
          detail="All time"
          icon={CreditCard}
        />
        <StatCard
          label="Successful"
          value={totalSuccessCount}
          detail="Completed payments"
          icon={CheckCircle2}
        />
        <StatCard
          label="Pending"
          value={totalPendingCount}
          detail="Awaiting payment"
          icon={Clock3}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment history</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3">Transaction</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Technician</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.data.map((pay) => (
                  <tr key={pay.id} className="border-b last:border-0">
                    <td className="px-6 py-4 font-mono text-xs line-clamp-1 w-48">
                      {pay.transactionId}
                    </td>
                    <td className="px-6 py-4">{pay.bookings?.service?.name}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {pay.bookings?.technicianProfile?.user?.name}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ${pay.bookings?.service?.price}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(String(pay.createdAt)).toDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`${statusClass[pay.status]} hover:${statusClass[pay.status]} capitalize`}
                      >
                        {pay.status.toLowerCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {payments.data.map((pay) => (
              <div key={pay.id} className="rounded-xl border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {pay.bookings?.service?.name}
                    </p>
                    <p className="text-xs text-slate-500">{pay.bookings?.id}</p>
                  </div>
                  <Badge
                    className={`${statusClass[pay.status]} hover:${statusClass[pay.status]} capitalize`}
                  >
                    {pay.status.toLowerCase()}
                  </Badge>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <span>{pay.bookings?.technicianProfile?.user?.name}</span>
                  <span>{new Date(String(pay.createdAt)).toDateString()}</span>
                  <span className="font-semibold text-slate-900">
                    {pay.bookings?.service?.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
