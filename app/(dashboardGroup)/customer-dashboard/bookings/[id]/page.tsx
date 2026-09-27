import { getSingleBookings } from "@/app/(dashboardGroup)/_actions/customerActions";
import PageHeading from "@/app/(dashboardGroup)/_components/customer/PageHeading";
import StatusBadge from "@/app/(dashboardGroup)/_components/customer/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { BookingStatus } from "@/types/enums";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking: ApiResponse<Booking> = await getSingleBookings(id);
  const steps: BookingStatus[] = [
    BookingStatus.REQUESTED,
    BookingStatus.ACCEPTED,
    BookingStatus.PAID,
    BookingStatus.IN_PROGRESS,
    BookingStatus.COMPLETED,
  ];
  const statusLabel: Record<BookingStatus, string> = {
    ACCEPTED: "Accepted",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
    DECLINED: "Declined",
    PAID: "Paid",
    IN_PROGRESS: "In progress",
    REQUESTED: "Requested",
  };

  const detailContent = [
    {
      icon: CalendarDays,
      label: "Date",
      value: new Date(booking.data.createdAt).toDateString(),
    },
    {
      icon: Clock3,
      label: "Time",
      value: `${booking.data.timeSlot?.startTime} - ${booking.data.timeSlot?.endTime}`,
    },
    { icon: MapPin, label: "Address", value: "N/A" },
    {
      icon: CreditCard,
      label: "Amount",
      value: String(booking.data.service?.price),
    },
  ];

  const current = steps.indexOf(booking.data.status);

  return (
    <div className="flex flex-col gap-7">
      <Button variant="ghost" asChild className="w-fit -ml-3 text-slate-500">
        <Link href="/customer-dashboard/bookings">
          <ArrowLeft className="mr-2 size-4" />
          Back to bookings
        </Link>
      </Button>
      <PageHeading
        title="Booking details"
        description={`Booking ${booking.data.id}`}
        action={<StatusBadge status={booking.data.status} />}
      />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{booking.data.service?.name}</CardTitle>
              <CardDescription>Scheduled service appointment</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Booking status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-0 sm:flex-row sm:items-start">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex flex-row items-center sm:flex-1 sm:flex-col sm:items-center"
                  >
                    <div
                      className={`grid size-9 shrink-0 place-items-center rounded-full ${index <= current ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                      {index <= current ? (
                        <Check className="size-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="ml-3 flex-1 pb-5 sm:ml-0 sm:pt-2 sm:pb-0 sm:text-center">
                      <p className="text-xs font-medium text-slate-700 capitalize">
                        {statusLabel[step]}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`hidden h-px flex-1 sm:block ${index < current ? "bg-blue-600" : "bg-slate-200"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Technician</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {booking.data.technicianProfile?.user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {booking.data.technicianProfile?.user?.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {booking.data.technicianProfile?.bio ?? "N/A"}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                    <Star className="size-3 fill-current" />
                    {booking.data.technicianProfile?.averageRating ?? "No"}{" "}
                    rating
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Service total</span>
                <span>{booking.data.service?.price}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{booking.data.service?.price}</span>
              </div>
              {booking.data.status === "ACCEPTED" && (
                <Button asChild className="mt-2 bg-blue-600 hover:bg-blue-700">
                  <Link
                    href={`/customer-dashboard/bookings/${booking.data.id}/pay`}
                  >
                    Pay now
                  </Link>
                </Button>
              )}
              {booking.data.status === "COMPLETED" && (
                <Button asChild variant="outline">
                  <Link href="/customer-dashboard/reviews">Leave a review</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
