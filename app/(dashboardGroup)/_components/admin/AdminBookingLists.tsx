"use client";

import { useEffect, useMemo, useState } from "react";

import { Search, Eye } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Booking } from "@/types/booking";
import { getAdminBookings } from "../../_actions/adminActions";
import { BookingStatus } from "@/types/enums";

const statuses = [
  "ALL",
  "REQUESTED",
  "ACCEPTED",
  "DECLINED",
  "PAID",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export default function AdminBookingLists() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [selected, setSelected] = useState<Booking | null>(null);

  const [status, setStatus] = useState("ALL");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);

        const response = await getAdminBookings();

        setBookings(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load bookings.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus = status === "ALL" || booking.status === status;

      const searchText = [
        booking.id,
        booking.customerProfile?.user?.name,
        booking.technicianProfile?.user?.name,
        booking.service?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && searchText.includes(search.toLowerCase());
    });
  }, [bookings, status, search]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">Loading bookings...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-600">{error}</CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search booking, customer, technician or service..."
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={status === item ? "default" : "outline"}
              onClick={() => setStatus(item)}
            >
              {item === "ALL" ? "All" : item.replaceAll("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All bookings</CardTitle>

          <CardDescription>{filtered.length} bookings found</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Booking</th>

                  <th className="px-5 py-3">Customer</th>

                  <th className="px-5 py-3">Technician</th>

                  <th className="px-5 py-3">Service</th>

                  <th className="px-5 py-3">Status</th>

                  <th className="px-5 py-3">Date</th>

                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="px-5 py-4 font-semibold text-blue-700">
                      {booking.id}
                    </td>

                    <td className="px-5 py-4">
                      {booking.customerProfile?.user?.name}
                    </td>

                    <td className="px-5 py-4">
                      {booking.technicianProfile?.user?.name}
                    </td>

                    <td className="px-5 py-4">{booking.service?.name}</td>

                    <td className="px-5 py-4">
                      <BookingBadge status={booking.status} />
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelected(booking)}
                      >
                        <Eye className="mr-1.5 size-3.5" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-500">
              No bookings found.
            </div>
          )}
        </CardContent>
      </Card>

      <BookingDetails booking={selected} onClose={() => setSelected(null)} />
    </>
  );

  function BookingBadge({ status }: { status: BookingStatus }) {
    const variant =
      status === "COMPLETED"
        ? "default"
        : status === "CANCELLED" || status === "DECLINED"
          ? "destructive"
          : "secondary";

    return <Badge variant={variant}>{status.replaceAll("_", " ")}</Badge>;
  }

  function BookingDetails({
    booking,
    onClose,
  }: {
    booking: Booking | null;
    onClose: () => void;
  }) {
    return (
      <Dialog
        open={!!booking}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Booking {booking?.id}</DialogTitle>

            <DialogDescription>Complete booking information.</DialogDescription>
          </DialogHeader>

          {booking && (
            <div className="grid gap-6">
              <div className="grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                <Info
                  label="Customer"
                  value={booking.customerProfile?.user?.name}
                />

                <Info
                  label="Technician"
                  value={booking.technicianProfile?.user?.name}
                />

                <Info
                  label="Customer email"
                  value={booking.customerProfile?.user?.email}
                />

                <Info
                  label="Technician email"
                  value={booking.technicianProfile?.user?.email}
                />

                <Info label="Service" value={booking.service?.name} />

                <Info
                  label="Category"
                  value={booking.service?.category?.name}
                />

                <Info label="Status" value={booking.status} />

                <Info
                  label="Created"
                  value={new Date(booking.createdAt).toLocaleString()}
                />
              </div>

              {booking.payments && (
                <section>
                  <h3 className="font-semibold">Payment</h3>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Info
                      label="Transaction"
                      value={booking.payments.transactionId}
                    />

                    <Info label="Status" value={booking.payments.status} />

                    <Info label="Amount" value={booking.payments.amount} />

                    <Info label="Provider" value={booking.payments.provider} />
                  </div>
                </section>
              )}

              {booking.note && (
                <section>
                  <h3 className="font-semibold">Customer note</h3>

                  <p className="mt-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                    {booking.note}
                  </p>
                </section>
              )}

              {booking.reviews && booking.reviews.length > 0 && (
                <section>
                  <h3 className="font-semibold">Reviews</h3>

                  <div className="mt-3 space-y-3">
                    {booking.reviews.map((review) => (
                      <div key={review.id} className="rounded-lg border p-4">
                        <p className="font-medium">
                          ⭐ {review.rating ?? "N/A"}
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  function Info({ label, value }: { label: string; value: unknown }) {
    return (
      <div>
        <p className="text-xs text-slate-500">{label}</p>

        <p className="mt-1 font-medium break-all">
          <span className="break-all">{value == null || value === "" ? "Not provided" : String(value)}</span>
        </p>
      </div>
    );
  }
}
