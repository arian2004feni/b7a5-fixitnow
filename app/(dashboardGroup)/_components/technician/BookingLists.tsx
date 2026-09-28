"use client";

import { Booking } from "@/types/booking";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingStatus } from "@/types/enums";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Actions } from "./BookingActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { handleBookingStatusChange } from "../../_utils";

export default function TechnicianBookingLists({
  bookings,
}: {
  bookings: Booking[];
}) {
  const [filter, setFilter] = useState("ALL");
  const [confirm, setConfirm] = useState<{ id: string; action: string } | null>(
    null,
  );
  const [rows, setRows] = useState(bookings);

  const statusLabels: Record<string, string> = {
    REQUESTED: "Requested",
    ACCEPTED: "Accepted",
    PAID: "Paid",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    DECLINED: "Declined",
  };
  const statusClasses: Record<string, string> = {
    REQUESTED: "bg-amber-50 text-amber-700",
    ACCEPTED: "bg-blue-50 text-blue-700",
    PAID: "bg-violet-50 text-violet-700",
    IN_PROGRESS: "bg-cyan-50 text-cyan-700",
    COMPLETED: "bg-emerald-50 text-emerald-700",
    CANCELLED: "bg-red-50 text-red-700",
    DECLINED: "bg-slate-100 text-slate-600",
  };
  const filtered =
    filter === "ALL" ? rows : rows.filter((b) => b.status === filter);
  const act = () => {
    if (!confirm) return;
    setRows(
      rows.map((b) =>
        b.id === confirm.id
          ? {
              ...b,
              status:
                confirm.action === "Decline"
                  ? BookingStatus.DECLINED
                  : confirm.action === "Start"
                    ? BookingStatus.IN_PROGRESS
                    : confirm.action === "Complete"
                      ? BookingStatus.COMPLETED
                      : BookingStatus.ACCEPTED,
            }
          : b,
      ),
    );
    setConfirm(null);
  };
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {[
          "ALL",
          BookingStatus.ACCEPTED,
          BookingStatus.CANCELLED,
          BookingStatus.COMPLETED,
          BookingStatus.DECLINED,
          BookingStatus.IN_PROGRESS,
          BookingStatus.PAID,
          BookingStatus.REQUESTED,
        ].map((tab) => (
          <Button
            key={tab}
            size="sm"
            variant={filter === tab ? "default" : "outline"}
            className={filter === tab ? "bg-blue-600 hover:bg-blue-700" : ""}
            onClick={() => setFilter(tab)}
          >
            {tab === "ALL" ? "All" : statusLabels[tab]}
          </Button>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All bookings</CardTitle>
          <CardDescription>{filtered.length} bookings</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {[
                    "Service",
                    "Date",
                    "Time",
                    "Amount",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="px-5 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b last:border-0">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {b.service?.name}
                      <p className="mt-1 text-xs font-normal text-slate-400">
                        from {b.customerProfile?.user?.name}
                        {/* {b.id} */}
                      </p>
                    </td>
                    {/* <td className="px-5 py-4">{b.service?.name}</td> */}
                    <td className="px-5 py-4 text-slate-600">
                      {new Date(b.createdAt).toDateString()}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{`${b.timeSlot?.startTime} - ${b.timeSlot?.endTime}`}</td>
                    <td className="px-5 py-4 font-semibold">
                      {b.service?.price}
                    </td>
                    <td className="px-5 py-4">
                      <Badge className={statusClasses[b.status]}>
                        {statusLabels[b.status]}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Actions
                        booking={b}
                        onAction={(action) => setConfirm({ id: b.id, action })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{b.service?.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {b.customerProfile?.user?.name} ·{" "}
                      {new Date(b.createdAt).toDateString()}
                    </p>
                  </div>
                  <Badge className={statusClasses[b.status]}>
                    {statusLabels[b.status]}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500">
                  <span>{`${b.timeSlot?.startTime} - ${b.timeSlot?.endTime}`}</span>
                  <span className="text-sm font-semibold">
                    ${b.service?.price}
                  </span>
                </div>
                <div className="mt-4">
                  <Actions
                    booking={b}
                    onAction={(action) => setConfirm({ id: b.id, action })}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {confirm && confirm.id && confirm.action && (
        <Dialog
          open={!!confirm}
          onOpenChange={(open) => !open && setConfirm(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm status change</DialogTitle>
              <DialogDescription>
                Are you sure you want to {confirm?.action.toLowerCase()} this
                booking?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirm(null)}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  const result = await handleBookingStatusChange(
                    confirm.id,
                    confirm.action,
                  );
                  if (result?.success) act();
                  else setConfirm(null);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
