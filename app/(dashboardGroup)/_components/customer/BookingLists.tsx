"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookingStatus } from "@/types/enums";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import BookingActions from "./BookingActions";
import { Booking } from "@/types/booking";

export default function BookingLists({
  bookings,
}: {
  bookings: Booking[] | undefined;
}) {
  const [filter, setFilter] = useState<"ALL" | BookingStatus>("ALL");
  const [cancelId, setCancelId] = useState<string | null>(null);

  const filtered =
    filter === "ALL" ? bookings : bookings?.filter((b) => b.status === filter);

  const statusLabel: Record<BookingStatus, string> = {
    ACCEPTED: "Accepted",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
    DECLINED: "Declined",
    PAID: "Paid",
    IN_PROGRESS: "In progress",
    REQUESTED: "Requested",
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {(
          [
            "ALL",
            BookingStatus.ACCEPTED,
            BookingStatus.CANCELLED,
            BookingStatus.COMPLETED,
            BookingStatus.DECLINED,
            BookingStatus.IN_PROGRESS,
            BookingStatus.PAID,
            BookingStatus.REQUESTED,
          ] as const
        ).map((tab) => (
          <Button
            key={tab}
            size="sm"
            variant={filter === tab ? "default" : "outline"}
            className={filter === tab ? "bg-blue-600 hover:bg-blue-700" : ""}
            onClick={() => setFilter(tab)}
          >
            {tab === "ALL" ? "All" : statusLabel[tab]}
          </Button>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Booking history</CardTitle>
          <CardDescription>
            {filtered?.length ? filtered.length : "No"} booking
            {filtered?.length === 1 ? "" : "s"} found
          </CardDescription>
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
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered?.length ? (
                  filtered.map((booking) => (
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
                      <td className="px-6 py-4">
                        <BookingActions
                          booking={booking}
                          onCancel={() => setCancelId(booking.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-4 text-center"
                    >
                      No Booking Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {filtered?.map((booking) => (
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
                <div className="mt-4">
                  <BookingActions
                    booking={booking}
                    onCancel={() => setCancelId(booking.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {cancelId && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/30 p-5">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Cancel booking?</CardTitle>
              <CardDescription>
                This action cannot be undone. Your technician will be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setCancelId(null)}>
                Keep booking
              </Button>
              <Button variant="destructive" onClick={() => setCancelId(null)}>
                Yes, cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
