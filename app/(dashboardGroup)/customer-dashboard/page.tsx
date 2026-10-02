import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderCode,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMe } from "@/services/getMe";
import StatCard from "../_components/customer/StatCard";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { BookingStatus } from "@/types/enums";
import { getServices } from "@/app/(publicGroup)/_actions/publicActions";
import { Service } from "@/types/services";
import Image from "next/image";
import StatusBadge from "../_components/customer/StatusBadge";

export default async function CustomerDashboard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user: ApiResponse<User> = await getMe();
  const query = await searchParams;

  const services: ApiResponse<Service[]> = await getServices({
    query,
  });

  const userBookings = user.data.customerProfile?.customerBookings;

  const totalBooking = userBookings?.length ?? 0;
  let totalBookingThisMonth = 0;
  userBookings?.map((item) => {
    if (new Date(item.createdAt).getMonth() === new Date().getMonth()) {
      totalBookingThisMonth = totalBookingThisMonth + 1;
    }
  });

  let totalCompletedServices = 0;
  userBookings?.map((item) => {
    if (item.status === BookingStatus.COMPLETED) {
      totalCompletedServices++;
    }
  });

  let satisfactionCount = (totalCompletedServices / totalBooking) * 100;
  if (totalCompletedServices === 0) satisfactionCount = 0;

  const stats = [
    {
      label: "Total bookings",
      value: totalBooking,
      detail: `${totalBookingThisMonth <= 0 ? "No Booking" : totalBookingThisMonth} this month`,
      icon: CalendarDays,
    },
    {
      label: "Completed services",
      value: totalCompletedServices,
      detail: `${satisfactionCount <= 0 ? "No" : Math.round(satisfactionCount) + "%"} satisfaction`,
      icon: CheckCircle2,
    },
    {
      label: "Saved technicians",
      value: 0,
      detail: "Across 0 categories",
      icon: Star,
    },
    {
      label: "Member since",
      value: new Date(user.data.createdAt).getFullYear(),
      detail: "Trusted customer",
      icon: ShieldCheck,
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Your home, taken care of
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Good morning, {user.data.name ?? "N/A"}
          </h2>
          <p className="mt-2 text-slate-500">
            Here&apos;s what&apos;s happening with your FixItNow account.
          </p>
        </div>
        <Button asChild className="w-fit bg-blue-600 hover:bg-blue-700">
          <Link href="/services">
            <Search className="mr-2 size-4" />
            Book a service
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.detail}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        {userBookings?.length ? (
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming booking</CardTitle>
                <p className="mt-1 text-sm text-slate-500">
                  Your next service appointment
                </p>
              </div>
              <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                {userBookings?.[0]?.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex flex-col justify-between gap-5 sm:flex-row">
                  <div className="flex gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-700">
                      <Wrench className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950">
                        {userBookings?.[0].service?.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        With {userBookings?.[0].technicianProfile?.user?.name}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" />
                          {new Date(
                            String(userBookings?.[0].createdAt),
                          ).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock3 className="size-3.5" />
                          {new Date(
                            String(userBookings?.[0].createdAt),
                          ).toLocaleTimeString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="size-3.5" />
                          N/A
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-center">
                    <span className="font-bold text-slate-950">
                      ${userBookings?.[0].service?.price}
                    </span>
                    <Link href={`./customer-dashboard/bookings`}>
                      <Button variant="outline" size="sm">
                        Manage booking
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderCode />
                </EmptyMedia>
                <EmptyTitle>Not Booked Yet</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t made any bookings yet. Get started by getting
                  your first service.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex-row justify-center gap-2">
                <Button>
                  <Link href={"/services"}>Find Services</Link>
                </Button>
                <Button variant={"outline"}>
                  <Link href={"/technicians"}>Find Technician</Link>
                </Button>
              </EmptyContent>
            </Empty>
          </Card>
        )}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Common things you may need
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link
              href="/services"
              className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700"
            >
              <span className="flex items-center gap-3">
                <Search className="size-4 text-blue-600" />
                Find a new service
              </span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/customer-dashboard/payments"
              className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700"
            >
              <span className="flex items-center gap-3">
                <CalendarDays className="size-4 text-blue-600" />
                View payment history
              </span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/customer-dashboard/reviews"
              className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700"
            >
              <span className="flex items-center gap-3">
                <Star className="size-4 text-blue-600" />
                Leave a review
              </span>
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent bookings</CardTitle>
          <Link
            href="/customer-dashboard/bookings"
            className="text-sm font-semibold text-blue-600"
          >
            View all <ArrowRight className="ml-1 inline size-4" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3">Booking</th>
                  <th className="px-6 py-3">Technician</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {userBookings?.length ? (
                  userBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">
                          {booking.service?.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {booking.service?.category?.name}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {booking.technicianProfile?.user?.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(String(booking.createdAt)).toDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {booking.service?.price}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">
                      No Booking Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {userBookings?.map((booking) => (
              <div key={booking.id} className="rounded-xl border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{booking.service?.name}</p>
                    <p className="text-xs text-slate-500">{booking.id}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <span>{booking.technicianProfile?.user?.name}</span>
                  <span>
                    {new Date(String(booking.createdAt)).toDateString()}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {booking.service?.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Recommended for you
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Popular services in your area
            </p>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-blue-600"
          >
            Browse all <ArrowRight className="ml-1 inline size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.data.slice(0, 3).map((service: Service) => (
            <Link
              href={`/services`}
              key={service.id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="aspect-2/1 overflow-hidden bg-slate-100">
                <Image
                  width={300}
                  height={200}
                  unoptimized
                  src={service.thumbnail ?? "l"}
                  alt={service.name}
                  className="size-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-blue-600">
                  {service.category?.name}
                </p>
                <h3 className="mt-1 font-semibold text-slate-900">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  From ${service.price} / visit
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
