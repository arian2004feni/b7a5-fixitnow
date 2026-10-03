import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getPaymentDetails } from "../../_actions/customerActions";
import { ApiResponse } from "@/types/api";
import { Payment } from "@/types/payment";
import { Badge } from "@/components/ui/badge";
import { revalidateTag } from "next/cache";

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const bookingId = (await searchParams).booking;
  const payment: ApiResponse<Payment> = await getPaymentDetails(
    bookingId as string,
  );

  return (
    <div className="mx-auto max-w-lg py-8">
      <Card>
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="size-8" />
          </div>
          <h2 className="mt-5 text-2xl font-bold">Payment successful</h2>
          <p className="mt-2 text-slate-500">
            Your service has been confirmed.
          </p>
          <div className="mt-6 w-full rounded-xl bg-slate-50 p-4 text-left text-sm">
            <div className="flex justify-between gap-10">
              <span className="text-slate-500">Booking ID</span>
              <span className="font-medium break-all">{bookingId}</span>
            </div>
            <div className="mt-3 flex justify-between gap-10">
              <span className="text-slate-500">Service</span>
              <span className="font-medium">
                {payment.data.bookings?.service?.name} by{" "}
                {payment.data.bookings?.service?.technician?.user?.name}
              </span>
            </div>
            <div className="mt-3 flex justify-between gap-10">
              <span className="text-slate-500">Transaction ID</span>
              <span className="font-medium break-all">
                {payment.data.transactionId}
              </span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-slate-500">Amount</span>
              <span className="font-bold">
                ${payment.data.bookings?.service?.price}
              </span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-slate-500">Status</span>
              <Badge variant={"outline"} className="font-medium bg-green-400">
                {payment.data.status}
              </Badge>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-slate-500">Provider</span>
              <span className="font-medium">Stripe</span>
            </div>
          </div>
          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Link href={`/customer-dashboard/bookings/${bookingId}`}>
                View booking
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/customer-dashboard">Go to dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
