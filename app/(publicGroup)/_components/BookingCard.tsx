"use client"

import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

export function BookingCard() {
  const [selected, setSelected] = useState("10:30 AM");
  const slots = ["9:00 AM", "10:30 AM", "12:00 PM", "2:30 PM", "4:00 PM"];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
      <h3 className="text-lg font-bold text-slate-900">Book an appointment</h3>
      <p className="mt-1 text-sm text-slate-500">
        Choose a service and a time that works for you.
      </p>
      <label className="mt-6 block text-sm font-semibold">
        Select a service
      </label>
      <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm">
        <option>Emergency Plumbing</option>
        <option>Pipe installation</option>
        <option>Water heater repair</option>
      </select>
      <label className="mt-5 block text-sm font-semibold">Choose a date</label>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {["Tue 18", "Wed 19", "Thu 20", "Fri 21"].map((date, i) => (
          <button
            key={date}
            className={`min-w-16 rounded-lg border px-2 py-2 text-xs font-medium ${i === 1 ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 text-slate-600 hover:border-blue-300"}`}
          >
            <CalendarDays className="mx-auto mb-1 size-4" />
            {date}
          </button>
        ))}
      </div>
      <label className="mt-5 block text-sm font-semibold">
        Available times
      </label>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelected(slot)}
            className={`rounded-lg border py-2.5 text-sm font-medium ${selected === slot ? "border-blue-600 bg-blue-50 text-blue-700" : slot === "12:00 PM" ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through" : "border-slate-200 text-slate-600 hover:border-blue-300"}`}
          >
            {slot}
          </button>
        ))}
      </div>
      <div className="my-5 border-t border-slate-100" />
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Service fee</span>
        <strong>$85.00</strong>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-slate-500">Platform fee</span>
        <strong>$4.25</strong>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold">Total</span>
        <strong className="text-xl text-slate-950">$89.25</strong>
      </div>
      <Button className="mt-5 h-12 w-full bg-blue-600 hover:bg-blue-700">
        Book Appointment
      </Button>
      <p className="mt-3 text-center text-xs text-slate-400">
        Free cancellation up to 24 hours before
      </p>
    </div>
  );
}
