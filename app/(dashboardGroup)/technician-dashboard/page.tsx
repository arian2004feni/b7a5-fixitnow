import { Button } from "@/components/ui/button";
import { Heading } from "../_components/technician/Heading";
import Link from "next/link";
import {
  BellIcon,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileBracesCorner,
  MapPin,
  Star,
} from "lucide-react";
import { Stat } from "../_components/technician/Stat";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMe } from "@/services/getMe";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { BookingStatus } from "@/types/enums";
import { EarningChart } from "../_components/technician/EarningChart";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default async function TechnicianDashboard() {
  const user: ApiResponse<User> = await getMe();

  const technicianProfile = user.data.technicianProfile;
  const pendingRequests =
    technicianProfile?.bookings &&
    technicianProfile?.bookings.find(
      (b) => b.status === BookingStatus.REQUESTED,
    );

  console.log(pendingRequests);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const dhakaFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
  });
  const getMonthKey = (date: Date) => {
    const parts = dhakaFormatter.formatToParts(date);

    const year = parts.find((p) => p.type === "year")?.value;
    const month = parts.find((p) => p.type === "month")?.value;

    return `${year}-${month}`;
  };
  const monthNameFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    month: "long",
  });
  const nowBD = new Date();
  const currentMonthKey = getMonthKey(nowBD);
  const [currentYearBD, currentMonthBD] = currentMonthKey
    .split("-")
    .map(Number);

  const chartData = Array.from({ length: 6 }, (_, i) => {
    // Create a date representing the target month.
    const targetDate = new Date(currentYearBD, currentMonthBD - 1 - (5 - i), 1);

    const targetMonthKey = getMonthKey(targetDate);

    let earnings = 0;

    technicianProfile?.bookings?.forEach((b) => {
      const bookingMonthKey = getMonthKey(new Date(b.createdAt));

      if (
        (b.status === BookingStatus.PAID ||
          b.status === BookingStatus.COMPLETED ||
          b.status === BookingStatus.IN_PROGRESS) &&
        b.service &&
        bookingMonthKey === targetMonthKey
      ) {
        earnings += b.service.price;
      }
    });

    return {
      month: monthNameFormatter.format(targetDate),
      earning: earnings,
    };
  });

  let pendingRequestsCount = 0;
  technicianProfile?.bookings?.map((b) => {
    if (b.status === BookingStatus.REQUESTED) {
      pendingRequestsCount++;
    }
  });

  let totalEarnings6Month = 0;
  technicianProfile?.bookings?.map((b) => {
    if (
      (b.status === BookingStatus.PAID ||
        b.status === BookingStatus.COMPLETED ||
        b.status === BookingStatus.IN_PROGRESS) &&
      b.service
    ) {
      totalEarnings6Month = totalEarnings6Month + b.service?.price;
    }
  });

  let totalEarnings = 0;
  technicianProfile?.bookings?.map((b) => {
    if (
      (b.status === BookingStatus.PAID ||
        b.status === BookingStatus.COMPLETED ||
        b.status === BookingStatus.IN_PROGRESS) &&
      b.service
    ) {
      totalEarnings = totalEarnings + b.service?.price;
    }
  });

  const completedJobs =
    technicianProfile?.bookings?.filter((b) => {
      return b.status === BookingStatus.COMPLETED;
    }).length ?? 0;

  const currentMonthJobs =
    technicianProfile?.bookings?.filter((b) => {
      const createdAt = new Date(b.createdAt);

      return (
        b.status === BookingStatus.IN_PROGRESS &&
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear
      );
    }).length ?? 0;

  const stats = [
    {
      title: "Pending requests",
      value: pendingRequestsCount,
      detail: "Needs your response",
      icon: BellIcon,
    },
    {
      title: "Upcoming jobs",
      value: currentMonthJobs,
      detail: "Next 30 days",
      icon: CalendarDays,
    },
    {
      title: "Completed jobs",
      value: completedJobs,
      detail: "All time",
      icon: CheckCircle2,
    },
    {
      title: "Total earnings",
      value: totalEarnings.toLocaleString(),
      detail: "This year",
      icon: DollarSign,
    },
  ];

  const totalJobs =
    technicianProfile?.bookings?.filter((b) => {
      return b.status === BookingStatus.IN_PROGRESS || BookingStatus.COMPLETED;
    }).length ?? 0;

  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Dashboard"
        description="Stay on top of your work and earnings."
        action={
          <Button asChild variant="outline">
            <Link href="/technician-dashboard/availability">
              <Clock3 className="mr-2 size-4" />
              Manage availability
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Stat
            key={stat.title}
            title={stat.title}
            value={String(stat.value)}
            detail={stat.detail}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <Card>
          <CardHeader>
            <CardTitle>Pending requests</CardTitle>
            <CardDescription>
              Review new service requests from customers.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {pendingRequests ? (
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {pendingRequests.service?.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {pendingRequests.customerProfile?.user?.name} ·{" "}
                      {new Date(
                        pendingRequests.createdAt as string,
                      ).toLocaleDateString()}
                      ,{" "}
                      {`${pendingRequests.timeSlot?.startTime} - ${pendingRequests.timeSlot?.endTime}`}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="size-3" />
                      {"N/A"}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-slate-950">
                    ${pendingRequests.service?.price}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline">
                    Decline
                  </Button>
                </div>
              </div>
            ) : (
              <Empty className="border border-dashed">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FileBracesCorner />
                  </EmptyMedia>
                  <EmptyTitle>No Pending Requests</EmptyTitle>
                  <EmptyDescription>
                    No pending request found on your Profile.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
            <Button variant="ghost" asChild className="w-fit text-blue-600">
              <Link href="/technician-dashboard/bookings">
                View all bookings
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Earnings</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <EarningChart chartData={chartData} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Average rating</p>
            <p className="mt-2 flex items-center gap-2 text-2xl font-bold">
              {0} <Star className="size-5 fill-amber-400 text-amber-400" />
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Completed jobs</p>
            <p className="mt-2 text-2xl font-bold">{completedJobs}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Completion rate</p>
            <p className="mt-2 text-2xl font-bold">
              {Math.round((completedJobs / totalJobs) * 100)}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
