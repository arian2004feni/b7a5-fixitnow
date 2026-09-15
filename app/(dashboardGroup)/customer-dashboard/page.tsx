"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "@/components/fixitnow/customer-shell";
import { services } from "@/components/fixitnow/data";

const bookings = [
  {
    service: "Deep home cleaning",
    tech: "Ava Thompson",
    date: "May 24, 2024",
    status: "Confirmed",
    price: "$120",
  },
  {
    service: "Faucet repair",
    tech: "Michael Rodriguez",
    date: "May 12, 2024",
    status: "Completed",
    price: "$85",
  },
  {
    service: "AC maintenance",
    tech: "Daniel Kim",
    date: "Apr 28, 2024",
    status: "Completed",
    price: "$95",
  },
];

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Your home, taken care of
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Good morning, Jordan
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
        <StatCard
          label="Total bookings"
          value="12"
          detail="3 this month"
          icon={CalendarDays}
        />
        <StatCard
          label="Completed services"
          value="9"
          detail="100% satisfaction"
          icon={CheckCircle2}
        />
        <StatCard
          label="Saved technicians"
          value="6"
          detail="Across 4 categories"
          icon={Star}
        />
        <StatCard
          label="Member since"
          value="2023"
          detail="Trusted customer"
          icon={ShieldCheck}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming booking</CardTitle>
              <p className="mt-1 text-sm text-slate-500">
                Your next service appointment
              </p>
            </div>
            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50">
              Confirmed
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
                      Deep home cleaning
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      with Ava Thompson
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" />
                        Friday, May 24
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="size-3.5" />
                        10:00 AM
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        Austin, TX
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-center">
                  <span className="font-bold text-slate-950">$120</span>
                  <Button variant="outline" size="sm">
                    Manage booking
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
        <CardContent>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.service}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-4">
                      <p className="font-medium text-slate-800">
                        {booking.service}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {booking.tech}
                      </p>
                    </td>
                    <td className="py-4 text-slate-500">{booking.date}</td>
                    <td className="py-4">
                      <Badge
                        variant="secondary"
                        className={
                          booking.status === "Confirmed"
                            ? "bg-blue-50 text-blue-700"
                            : ""
                        }
                      >
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-right font-semibold text-slate-800">
                      {booking.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 md:hidden">
            {bookings.map((booking) => (
              <div
                key={booking.service}
                className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    {booking.service}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {booking.date} · {booking.tech}
                  </p>
                </div>
                <span className="font-semibold text-slate-800">
                  {booking.price}
                </span>
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
          {services.slice(0, 3).map((service) => (
            <Link
              href="/services"
              key={service.title}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="aspect-[2/1] overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="size-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-blue-600">
                  {service.category}
                </p>
                <h3 className="mt-1 font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  From ${service.price} / visit
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Separator />
    </div>
  );
}
