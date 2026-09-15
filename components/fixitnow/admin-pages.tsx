"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  Ban,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Eye,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const users = [
  {
    name: "Jordan Davis",
    email: "jordan@example.com",
    role: "CUSTOMER",
    date: "May 24, 2024",
    status: "ACTIVE",
    initials: "JD",
  },
  {
    name: "Michael Rodriguez",
    email: "michael@example.com",
    role: "TECHNICIAN",
    date: "May 18, 2024",
    status: "ACTIVE",
    initials: "MR",
  },
  {
    name: "Taylor Brooks",
    email: "taylor@example.com",
    role: "CUSTOMER",
    date: "May 12, 2024",
    status: "BANNED",
    initials: "TB",
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "TECHNICIAN",
    date: "Apr 30, 2024",
    status: "ACTIVE",
    initials: "SJ",
  },
  {
    name: "David Chen",
    email: "david@example.com",
    role: "TECHNICIAN",
    date: "Apr 21, 2024",
    status: "ACTIVE",
    initials: "DC",
  },
];
const bookings = [
  {
    id: "FX-10482",
    customer: "Jordan Davis",
    technician: "Michael Rodriguez",
    service: "Emergency plumbing",
    date: "May 24, 2024",
    amount: "$120.00",
    payment: "PAID",
    status: "IN_PROGRESS",
  },
  {
    id: "FX-10467",
    customer: "Priya Shah",
    technician: "Sarah Johnson",
    service: "Deep home cleaning",
    date: "May 25, 2024",
    amount: "$85.00",
    payment: "PENDING",
    status: "ACCEPTED",
  },
  {
    id: "FX-10421",
    customer: "Marcus Lee",
    technician: "David Chen",
    service: "Electrical repair",
    date: "May 27, 2024",
    amount: "$95.00",
    payment: "PAID",
    status: "COMPLETED",
  },
  {
    id: "FX-10389",
    customer: "Ava Thompson",
    technician: "James Wilson",
    service: "Interior painting",
    date: "May 18, 2024",
    amount: "$240.00",
    payment: "PAID",
    status: "COMPLETED",
  },
];
const categories = [
  {
    name: "Plumbing",
    description: "Water, pipes, drains, and fixtures",
    services: 24,
    status: "ACTIVE",
    date: "Jan 12, 2024",
    icon: "◉",
  },
  {
    name: "Electrical",
    description: "Wiring, lighting, and electrical repairs",
    services: 18,
    status: "ACTIVE",
    date: "Jan 12, 2024",
    icon: "ϟ",
  },
  {
    name: "Cleaning",
    description: "Home, office, and deep cleaning",
    services: 16,
    status: "ACTIVE",
    date: "Jan 13, 2024",
    icon: "✦",
  },
  {
    name: "Painting",
    description: "Interior and exterior painting",
    services: 12,
    status: "ACTIVE",
    date: "Jan 15, 2024",
    icon: "◒",
  },
];
function Heading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-2 text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}
function Pill({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: string;
}) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    violet: "bg-violet-50 text-violet-700",
    slate: "bg-slate-100 text-slate-600",
  };
  return <Badge className={tones[tone] ?? tones.slate}>{children}</Badge>;
}
function Stat({
  title,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm text-slate-500">{title}</p>
          <span className={`grid size-9 place-items-center rounded-lg ${tone}`}>
            <Icon className="size-4" />
          </span>
        </div>
        <p className="mt-4 text-2xl font-bold text-slate-950">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{detail}</p>
      </CardContent>
    </Card>
  );
}
function MiniChart({
  bars,
  color = "bg-blue-500",
}: {
  bars: number[];
  color?: string;
}) {
  return (
    <div className="flex h-40 items-end gap-2 border-b border-slate-200 px-2 pb-0">
      {bars.map((height, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div
            className={`w-full rounded-t-md ${color}`}
            style={{ height: `${height}%` }}
          />
          <span className="text-[10px] text-slate-400">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Dashboard"
        description="A clear view of everything happening across FixItNow."
        action={
          <Button variant="outline" asChild>
            <Link href="/admin-dashboard/manage-users">
              <Users className="mr-2 size-4" />
              Manage users
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Stat
          title="Total users"
          value="12,842"
          detail="+8.4% this month"
          icon={Users}
          tone="bg-blue-50 text-blue-600"
        />
        <Stat
          title="Customers"
          value="10,240"
          detail="79.7% of users"
          icon={UserPlus}
          tone="bg-emerald-50 text-emerald-600"
        />
        <Stat
          title="Technicians"
          value="2,586"
          detail="+124 this month"
          icon={ShieldCheck}
          tone="bg-violet-50 text-violet-600"
        />
        <Stat
          title="Active bookings"
          value="486"
          detail="Across all services"
          icon={Clock3}
          tone="bg-amber-50 text-amber-600"
        />
        <Stat
          title="Completed jobs"
          value="9,842"
          detail="92.8% completion rate"
          icon={CheckCircle2}
          tone="bg-cyan-50 text-cyan-600"
        />
        <Stat
          title="Total revenue"
          value="$284,680"
          detail="+12.6% this month"
          icon={CreditCard}
          tone="bg-rose-50 text-rose-600"
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bookings over time</CardTitle>
            <CardDescription>Monthly booking volume</CardDescription>
          </CardHeader>
          <CardContent>
            <MiniChart bars={[42, 58, 48, 76, 64, 88]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue over time</CardTitle>
            <CardDescription>Monthly platform revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <MiniChart bars={[38, 52, 46, 70, 66, 92]} color="bg-violet-500" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Latest events from your marketplace
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              [
                "New customer registration",
                "Jordan Davis created an account",
                "2 minutes ago",
                UserPlus,
              ],
              [
                "Booking completed",
                "FX-10389 was marked completed",
                "18 minutes ago",
                CheckCircle2,
              ],
              [
                "Payment received",
                "$240 payment for interior painting",
                "42 minutes ago",
                CreditCard,
              ],
              [
                "New review posted",
                "Ava Thompson left a 5-star review",
                "1 hour ago",
                TrendingUp,
              ],
            ].map(([title, detail, time, Icon]) => (
              <div key={String(title)} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {String(title)}
                  </p>
                  <p className="truncate text-xs text-slate-500">{String(detail)}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">{String(time)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Platform health</CardTitle>
            <CardDescription>Live service status</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              ["API status", "Operational"],
              ["Payment status", "Operational"],
              ["Active technicians", "1,284 online"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
              >
                <span className="text-sm text-slate-600">{label}</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  {value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AdminUsers() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [selected, setSelected] = useState<(typeof users)[number] | null>(null);
  const [rows, setRows] = useState(users);
  const filtered = rows.filter(
    (u) =>
      `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase()) &&
      (role === "ALL" || u.role === role) &&
      (status === "ALL" || u.status === status),
  );
  const toggle = () => {
    if (selected)
      setRows(
        rows.map((u) =>
          u.email === selected.email
            ? { ...u, status: u.status === "ACTIVE" ? "BANNED" : "ACTIVE" }
            : u,
        ),
      );
    setSelected(null);
  };
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Users"
        description="Manage customer, technician, and administrator accounts."
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email"
            className="pl-9"
          />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All roles</SelectItem>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="TECHNICIAN">Technician</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="BANNED">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All users</CardTitle>
          <CardDescription>{filtered.length} users found</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {[
                    "User",
                    "Role",
                    "Registration date",
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
                {filtered.map((u) => (
                  <tr key={u.email} className="border-b last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                          {u.initials}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {u.name}
                          </p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Pill tone={u.role === "TECHNICIAN" ? "violet" : "blue"}>
                        {u.role}
                      </Pill>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{u.date}</td>
                    <td className="px-5 py-4">
                      <Pill tone={u.status === "ACTIVE" ? "green" : "red"}>
                        {u.status}
                      </Pill>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1.5 size-3.5" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelected(u)}
                        >
                          {u.status === "ACTIVE" ? (
                            <Ban className="size-4 text-red-500" />
                          ) : (
                            <CheckCircle2 className="size-4 text-emerald-600" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {filtered.map((u) => (
              <div
                key={u.email}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {u.initials}
                    </span>
                    <div>
                      <p className="font-semibold">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </div>
                  <Pill tone={u.status === "ACTIVE" ? "green" : "red"}>
                    {u.status}
                  </Pill>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {u.role} · {u.date}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelected(u)}
                  >
                    {u.status === "ACTIVE" ? "Ban" : "Unban"}
                  </Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-500">
                No users match this search.
              </p>
            )}
          </div>
        </CardContent>
        <div className="flex items-center justify-between border-t px-5 py-3 text-sm text-slate-500">
          <span>Showing {filtered.length} of 12,842</span>
          <div className="flex gap-1">
            <Button size="icon" variant="outline" aria-label="Previous page">
              <ChevronLeft className="size-4" />
            </Button>
            <Button size="icon" variant="outline" aria-label="Next page">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selected?.status === "ACTIVE" ? "Ban user?" : "Unban user?"}
            </DialogTitle>
            <DialogDescription>
              {selected?.status === "ACTIVE"
                ? `This will prevent ${selected?.name} from accessing FixItNow.`
                : `Restore ${selected?.name}'s access to FixItNow?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button
              variant={
                selected?.status === "ACTIVE" ? "destructive" : "default"
              }
              onClick={toggle}
            >
              {selected?.status === "ACTIVE" ? "Ban user" : "Unban user"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function AdminBookings() {
  const [selected, setSelected] = useState<(typeof bookings)[number] | null>(
    null,
  );
  const [status, setStatus] = useState("ALL");
  const filtered =
    status === "ALL" ? bookings : bookings.filter((b) => b.status === status);
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Bookings"
        description="Monitor every booking and its payment lifecycle."
      />
      <div className="flex flex-wrap gap-2">
        {[
          "ALL",
          "REQUESTED",
          "ACCEPTED",
          "PAID",
          "IN_PROGRESS",
          "COMPLETED",
          "CANCELLED",
        ].map((item) => (
          <Button
            key={item}
            size="sm"
            variant={status === item ? "default" : "outline"}
            onClick={() => setStatus(item)}
          >
            {item === "ALL" ? "All" : item.replace("_", " ")}
          </Button>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All bookings</CardTitle>
          <CardDescription>{filtered.length} bookings shown</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {[
                    "Booking",
                    "Customer",
                    "Technician",
                    "Service",
                    "Date",
                    "Amount",
                    "Status",
                  ].map((h) => (
                    <th key={h} className="px-5 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    className="cursor-pointer border-b last:border-0 hover:bg-slate-50"
                    onClick={() => setSelected(b)}
                  >
                    <td className="px-5 py-4 font-semibold text-blue-700">
                      {b.id}
                    </td>
                    <td className="px-5 py-4">{b.customer}</td>
                    <td className="px-5 py-4">{b.technician}</td>
                    <td className="px-5 py-4">{b.service}</td>
                    <td className="px-5 py-4 text-slate-500">{b.date}</td>
                    <td className="px-5 py-4 font-semibold">{b.amount}</td>
                    <td className="px-5 py-4">
                      <Pill
                        tone={
                          b.status === "COMPLETED"
                            ? "green"
                            : b.status === "IN_PROGRESS"
                              ? "blue"
                              : "amber"
                        }
                      >
                        {b.status}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {filtered.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelected(b)}
                className="rounded-xl border border-slate-200 p-4 text-left"
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-blue-700">{b.id}</span>
                  <Pill tone={b.status === "COMPLETED" ? "green" : "amber"}>
                    {b.status}
                  </Pill>
                </div>
                <p className="mt-2 font-semibold">{b.service}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {b.customer} · {b.date}
                </p>
                <p className="mt-2 font-bold">{b.amount}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking {selected?.id}</DialogTitle>
            <DialogDescription>
              Booking details and status timeline.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="flex flex-col gap-4">
              <div className="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-slate-500">Customer</span>
                  <br />
                  <strong>{selected.customer}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Technician</span>
                  <br />
                  <strong>{selected.technician}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Service</span>
                  <br />
                  <strong>{selected.service}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Amount</span>
                  <br />
                  <strong>{selected.amount}</strong>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  "REQUESTED",
                  "ACCEPTED",
                  "PAID",
                  "IN_PROGRESS",
                  "COMPLETED",
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-sm">
                    <span
                      className={`grid size-7 place-items-center rounded-full ${i <= ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "COMPLETED"].indexOf(selected.status) ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={
                        i <= 3
                          ? "font-semibold text-slate-900"
                          : "text-slate-400"
                      }
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function AdminCategories() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(categories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const add = () => {
    if (!name.trim() || !description.trim()) return;
    setItems([
      ...items,
      {
        name,
        description,
        services: 0,
        status: "ACTIVE",
        date: "May 28, 2024",
        icon: "✦",
      },
    ]);
    setName("");
    setDescription("");
    setOpen(false);
  };
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Categories"
        description="Organize the services available on your marketplace."
        action={
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setOpen(true)}
          >
            <Plus className="mr-2 size-4" />
            Add category
          </Button>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Service categories</CardTitle>
          <CardDescription>{items.length} active categories</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {[
                    "Category",
                    "Description",
                    "Services",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="px-5 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.name} className="border-b last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
                          {item.icon}
                        </span>
                        <span className="font-semibold">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {item.description}
                    </td>
                    <td className="px-5 py-4">{item.services}</td>
                    <td className="px-5 py-4">
                      <Pill tone="green">{item.status}</Pill>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{item.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={`Edit ${item.name}`}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={`Delete ${item.name}`}
                          onClick={() => setDeleteIndex(i)}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {items.map((item, i) => (
              <div
                key={item.name}
                className="flex items-start justify-between rounded-xl border border-slate-200 p-4"
              >
                <div className="flex gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.description}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      {item.services} services
                    </p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Delete ${item.name}`}
                  onClick={() => setDeleteIndex(i)}
                >
                  <Trash2 className="size-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add category</DialogTitle>
            <DialogDescription>
              Create a new service category for technicians to use.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="category-name">Name</Label>
              <Input
                id="category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
                placeholder="e.g. HVAC"
              />
            </div>
            <div>
              <Label htmlFor="category-description">Description</Label>
              <Textarea
                id="category-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2"
                placeholder="What services belong here?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={add}>Create category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={deleteIndex !== null}
        onOpenChange={(value) => !value && setDeleteIndex(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete category?</DialogTitle>
            <DialogDescription>
              Services in this category will need to be reassigned.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteIndex(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteIndex !== null)
                  setItems(items.filter((_, i) => i !== deleteIndex));
                setDeleteIndex(null);
              }}
            >
              Delete category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
