import { getSingleBookings } from "@/app/(dashboardGroup)/_actions/customerActions";
import PageHeading from "@/app/(dashboardGroup)/_components/customer/PageHeading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ApiResponse } from "@/types/api";
import { Booking } from "@/types/booking";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  UserRound,
  Wrench,
} from "lucide-react";
import { PayButton } from "@/app/(dashboardGroup)/_components/customer/PayButton";

export default async function CustomerPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking: ApiResponse<Booking> = await getSingleBookings(id);
  const detailContent = [
    {
      icon: Wrench,
      label: "Service",
      value: booking.data.service?.name,
      // value: new Date(booking.data.createdAt).toDateString(),
    },
    {
      icon: UserRound,
      label: "Technician",
      value: booking.data.technicianProfile?.user?.name,
    },
    {
      icon: CalendarDays,
      label: "Appointment",
      value: `${new Date(booking.data.createdAt).toDateString()}, ${new Date(booking.data.createdAt).toLocaleTimeString()}`,
    },
  ];
  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="ghost" asChild className="mb-6 -ml-3 text-slate-500">
        <Link href={`/customer-dashboard/bookings/${booking.data.id}`}>
          <ArrowLeft className="mr-2 size-4" />
          Back to booking
        </Link>
      </Button>
      <PageHeading
        title="Complete payment"
        description="Securely pay for your FixItNow service."
      />
      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {detailContent.map((detail) => (
              <div className="flex gap-3" key={detail.label}>
                <detail.icon className="mt-0.5 size-4 text-blue-600" />
                <div>
                  <p className="text-xs text-slate-500">{detail.label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{booking.data.service?.price}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment provider</CardTitle>
            <CardDescription>Stripe Checkout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
              You will be securely redirected to Stripe to complete your
              payment.
            </div>
            <PayButton bookingId={booking.data.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
