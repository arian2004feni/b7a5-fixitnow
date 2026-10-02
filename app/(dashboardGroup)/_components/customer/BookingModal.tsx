"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { Service } from "@/types/services";
import type { AvailabilitySlot } from "@/types/availability";
import { createBookingAction } from "@/app/(publicGroup)/_actions/publicActions";

export function BookingModal({
  technicianId,
  services,
  slots,
}: {
  technicianId: string;
  services: Service[];
  slots: AvailabilitySlot[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [slotId, setSlotId] = useState(slots[0]?.id ?? "");
  const [note, setNote] = useState("");
  const [pending, start] = useTransition();

  const service = useMemo(
    () => services.find((s) => s.id === serviceId),
    [services, serviceId],
  );

  const submit = () =>
    start(async () => {
      const r = await createBookingAction({
        technicianId,
        serviceId,
        timeSlotId: slotId,
        note,
      });
      if (r.success) {
        setOpen(false); // Close modal on success
        router.push("/customer-dashboard/bookings");
      }
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Book Appointment
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Book an appointment
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Choose a service and an available time slot.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Service Dropdown */}
          <div>
            <label className="text-sm font-semibold block mb-2">Service</label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="h-11 w-full rounded-lg border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — \${s.price}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Grid */}
          <div>
            <label className="text-sm font-semibold block mb-2">
              Available slots
            </label>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSlotId(s.id)}
                  className={`rounded-lg border px-2 py-2.5 text-sm transition-colors ${
                    slotId === s.id
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <CalendarDays className="mx-auto mb-1 size-4" />
                  {s.dayOfWeek}
                  <br />
                  <span className="text-xs">
                    {s.startTime}–{s.endTime}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Notes */}
          <div>
            <label className="text-sm font-semibold block mb-2">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Tell the technician what you need."
            />
          </div>

          <div className="border-t pt-4 flex justify-between text-sm">
            <span className="text-slate-500">Service fee</span>
            <strong>\${Number(service?.price ?? 0).toFixed(2)}</strong>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button
            disabled={!serviceId || !slotId || pending}
            onClick={submit}
            className="h-12 w-full bg-blue-600 hover:bg-blue-700"
          >
            {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Request booking
          </Button>
          <p className="text-center text-xs text-slate-400">
            Your booking starts as a request and requires technician acceptance.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
