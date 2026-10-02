"use client";
import { Button } from "@/components/ui/button";
import { CalendarDays, Loader2 } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Service } from "@/types/services";
import type { AvailabilitySlot } from "@/types/availability";
import { createBookingAction } from "../../_actions/publicActions";

export function BookingCard({
  technicianId,
  services,
  slots,
}: {
  technicianId: string;
  services: Service[];
  slots: AvailabilitySlot[];
}) {
  const router = useRouter();
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
      if (r.success) router.push("/customer-dashboard/bookings");
    });
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
      <h3 className="text-lg font-bold">Book an appointment</h3>
      <p className="mt-1 text-sm text-slate-500">
        Choose a service and an available time slot.
      </p>
      <label className="mt-6 block text-sm font-semibold">Service</label>
      <select
        value={serviceId}
        onChange={(e) => setServiceId(e.target.value)}
        className="mt-2 h-11 w-full rounded-lg border bg-white px-3 text-sm"
      >
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} — ${s.price}
          </option>
        ))}
      </select>
      <label className="mt-5 block text-sm font-semibold">
        Available slots
      </label>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {slots.map((s) => (
          <button
            type="button"
            key={s.id}
            onClick={() => setSlotId(s.id)}
            className={`rounded-lg border px-2 py-2.5 text-sm ${slotId === s.id ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200"}`}
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
      <label className="mt-5 block text-sm font-semibold">
        Note (optional)
      </label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        className="mt-2 w-full rounded-lg border p-3 text-sm"
        placeholder="Tell the technician what you need."
      />
      <div className="my-5 border-t" />
      <div className="flex justify-between text-sm">
        <span className="text-slate-500">Service fee</span>
        <strong>${Number(service?.price ?? 0).toFixed(2)}</strong>
      </div>
      <Button
        disabled={!serviceId || !slotId || pending}
        onClick={submit}
        className="mt-5 h-12 w-full bg-blue-600 hover:bg-blue-700"
      >
        {pending && <Loader2 className="mr-2 size-4 animate-spin" />}Request
        booking
      </Button>
      <p className="mt-3 text-center text-xs text-slate-400">
        Your booking starts as a request and requires technician acceptance.
      </p>
    </div>
  );
}
