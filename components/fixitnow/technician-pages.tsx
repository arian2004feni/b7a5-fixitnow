"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  DollarSign,
  Edit3,
  MapPin,
  Plus,
  Star,
  Trash2,
  UserRound,
  Users,
  X,
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const bookings = [
  {
    id: "FX-10482",
    customer: "Jordan Davis",
    service: "Emergency plumbing",
    date: "May 24, 2024",
    time: "10:00 AM – 12:00 PM",
    location: "1428 Market Street",
    amount: "$120.00",
    status: "REQUESTED",
  },
  {
    id: "FX-10467",
    customer: "Priya Shah",
    service: "Faucet repair",
    date: "May 25, 2024",
    time: "2:00 PM – 3:00 PM",
    location: "88 Oak Avenue",
    amount: "$85.00",
    status: "ACCEPTED",
  },
  {
    id: "FX-10421",
    customer: "Marcus Lee",
    service: "Water heater check",
    date: "May 27, 2024",
    time: "9:00 AM – 10:00 AM",
    location: "410 Pine Street",
    amount: "$95.00",
    status: "PAID",
  },
  {
    id: "FX-10389",
    customer: "Ava Thompson",
    service: "Pipe replacement",
    date: "May 18, 2024",
    time: "1:00 PM – 3:00 PM",
    location: "22 Valencia Street",
    amount: "$240.00",
    status: "COMPLETED",
  },
];
const statusLabels: Record<string, string> = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  PAID: "Paid",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  DECLINED: "Declined",
};
const statusClasses: Record<string, string> = {
  REQUESTED: "bg-amber-50 text-amber-700",
  ACCEPTED: "bg-blue-50 text-blue-700",
  PAID: "bg-violet-50 text-violet-700",
  IN_PROGRESS: "bg-cyan-50 text-cyan-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  DECLINED: "bg-slate-100 text-slate-600",
};
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
function Status({ status }: { status: string }) {
  return (
    <Badge className={statusClasses[status]}>{statusLabels[status]}</Badge>
  );
}
function Stat({
  title,
  value,
  detail,
  icon: Icon,
}: {
  title: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm text-slate-500">{title}</p>
          <span className="grid size-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
            <Icon className="size-4" />
          </span>
        </div>
        <p className="mt-4 text-2xl font-bold text-slate-950">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{detail}</p>
      </CardContent>
    </Card>
  );
}

export function TechnicianDashboard() {
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
        <Stat
          title="Pending requests"
          value="3"
          detail="Needs your response"
          icon={BellIcon}
        />
        <Stat
          title="Upcoming jobs"
          value="8"
          detail="Next 30 days"
          icon={CalendarDays}
        />
        <Stat
          title="Completed jobs"
          value="348"
          detail="All time"
          icon={CheckCircle2}
        />
        <Stat
          title="Total earnings"
          value="$24,680"
          detail="This year"
          icon={DollarSign}
        />
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
            {bookings
              .filter((b) => b.status === "REQUESTED")
              .map((b) => (
                <div
                  key={b.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {b.service}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {b.customer} · {b.date}, {b.time}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="size-3" />
                        {b.location}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-slate-950">
                      {b.amount}
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
              ))}
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
            <div className="flex h-40 items-end gap-3 border-b border-l border-slate-200 px-3 pb-0 pt-5">
              {[45, 62, 52, 76, 68, 92].map((height, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-md bg-blue-500"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] text-slate-400">
                    {["Dec", "Jan", "Feb", "Mar", "Apr", "May"][index]}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-500">May earnings</span>
              <span className="font-bold text-slate-900">$4,820</span>
            </div>
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
              4.9 <Star className="size-5 fill-amber-400 text-amber-400" />
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Completed jobs</p>
            <p className="mt-2 text-2xl font-bold">348</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Completion rate</p>
            <p className="mt-2 text-2xl font-bold">98%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
function BellIcon({ className }: { className?: string }) {
  return <AlertCircle className={className} />;
}

export function TechnicianBookings() {
  const [filter, setFilter] = useState("ALL");
  const [confirm, setConfirm] = useState<{ id: string; action: string } | null>(
    null,
  );
  const [rows, setRows] = useState(bookings);
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
                  ? "DECLINED"
                  : confirm.action === "Start job"
                    ? "IN_PROGRESS"
                    : confirm.action === "Complete job"
                      ? "COMPLETED"
                      : "ACCEPTED",
            }
          : b,
      ),
    );
    setConfirm(null);
  };
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Bookings"
        description="Manage requests and keep customers updated."
      />
      <div className="flex flex-wrap gap-2">
        {[
          "ALL",
          "REQUESTED",
          "ACCEPTED",
          "PAID",
          "IN_PROGRESS",
          "COMPLETED",
          "DECLINED",
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
                    "Customer",
                    "Service",
                    "Date",
                    "Time",
                    "Location",
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
                      {b.customer}
                      <p className="mt-1 text-xs font-normal text-slate-400">
                        {b.id}
                      </p>
                    </td>
                    <td className="px-5 py-4">{b.service}</td>
                    <td className="px-5 py-4 text-slate-600">{b.date}</td>
                    <td className="px-5 py-4 text-slate-600">{b.time}</td>
                    <td className="px-5 py-4 text-slate-600">{b.location}</td>
                    <td className="px-5 py-4 font-semibold">{b.amount}</td>
                    <td className="px-5 py-4">
                      <Status status={b.status} />
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
                    <p className="font-semibold">{b.service}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {b.customer} · {b.date}
                    </p>
                  </div>
                  <Status status={b.status} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                  <span>{b.time}</span>
                  <span>{b.amount}</span>
                  <span className="col-span-2">{b.location}</span>
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
            <Button onClick={act} className="bg-blue-600 hover:bg-blue-700">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
function Actions({
  booking,
  onAction,
}: {
  booking: (typeof bookings)[number];
  onAction: (action: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {booking.status === "REQUESTED" && (
        <>
          <Button
            size="sm"
            onClick={() => onAction("Accept")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction("Decline")}
          >
            Decline
          </Button>
        </>
      )}
      {booking.status === "PAID" && (
        <Button size="sm" onClick={() => onAction("Start job")}>
          Start job
        </Button>
      )}
      {booking.status === "IN_PROGRESS" && (
        <Button size="sm" onClick={() => onAction("Complete job")}>
          Complete job
        </Button>
      )}
      {booking.status === "COMPLETED" && (
        <Button size="sm" variant="outline">
          View
        </Button>
      )}
      {booking.status === "ACCEPTED" && (
        <Button size="sm" variant="outline">
          View
        </Button>
      )}
    </div>
  );
}

export function TechnicianProfile() {
  const [saved, setSaved] = useState(false);
  const [skills, setSkills] = useState([
    "Leak repair",
    "Water heaters",
    "Pipe fitting",
  ]);
  const [skill, setSkill] = useState("");
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Profile"
        description="Keep your professional profile current for customers."
      />
      <Card>
        <CardHeader>
          <CardTitle>Professional profile</CardTitle>
          <CardDescription>
            Your profile helps customers choose the right expert.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
              MR
            </div>
            <div>
              <Button variant="outline" size="sm">
                Upload new photo
              </Button>
              <p className="mt-1 text-xs text-slate-500">
                JPG or PNG, up to 5 MB
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value="Michael Rodriguez" />
            <Field label="Profession" value="Licensed Plumber" />
            <Field label="Phone" value="(512) 555-0147" />
            <Field label="Location" value="Austin, TX" />
            <Field label="Years of experience" value="12" />
            <Field label="Service area" value="Austin and nearby areas" />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue="Reliable licensed plumber helping Austin homeowners solve urgent repairs and improve their homes."
              className="mt-2"
            />
          </div>
          <div>
            <Label>Skills</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((item) => (
                <Badge key={item} variant="secondary" className="gap-1">
                  {item}
                  <button
                    type="button"
                    onClick={() => setSkills(skills.filter((s) => s !== item))}
                    aria-label={`Remove ${item}`}
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
              <Input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.nativeEvent.isComposing &&
                    e.keyCode !== 229 &&
                    skill.trim()
                  ) {
                    e.preventDefault();
                    setSkills([...skills, skill.trim()]);
                    setSkill("");
                  }
                }}
                placeholder="Add a skill and press Enter"
                className="max-w-xs"
              />
            </div>
          </div>
          <div className="max-w-xs">
            <Field label="Starting price" value="$85" />
          </div>
          {saved && (
            <Alert>
              <CheckCircle2 className="size-4" />
              <AlertDescription>
                Profile changes saved successfully.
              </AlertDescription>
            </Alert>
          )}
          <Button
            className="w-fit bg-blue-600 hover:bg-blue-700"
            onClick={() => setSaved(true)}
          >
            Save changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input defaultValue={value} className="mt-2" />
    </div>
  );
}

const initialServices = [
  {
    name: "Emergency plumbing",
    category: "Plumbing",
    description: "Fast response for urgent leaks and plumbing issues.",
    price: "$85",
    duration: "1 hour",
    status: "Active",
  },
  {
    name: "Water heater inspection",
    category: "Plumbing",
    description: "Thorough inspection and preventative maintenance.",
    price: "$95",
    duration: "1 hour",
    status: "Active",
  },
  {
    name: "Pipe replacement",
    category: "Plumbing",
    description: "Professional pipe repair and replacement service.",
    price: "$120",
    duration: "2 hours",
    status: "Paused",
  },
];
export function TechnicianServices() {
  const [items, setItems] = useState(initialServices);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [deleted, setDeleted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Plumbing",
    description: "",
    price: "",
    duration: "1 hour",
  });
  const save = () => {
    if (!form.name || !form.price) return;
    const item = {
      ...form,
      price: `$${form.price.replace("$", "")}`,
      status: "Active",
    };
    setItems(
      editing === null
        ? [...items, item]
        : items.map((x, i) => (i === editing ? item : x)),
    );
    setOpen(false);
    setForm({
      name: "",
      category: "Plumbing",
      description: "",
      price: "",
      duration: "1 hour",
    });
    setEditing(null);
  };
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Services"
        description="Manage the services customers can book from your profile."
        action={
          <Button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 size-4" />
            Add service
          </Button>
        }
      />
      {deleted && (
        <Alert>
          <CheckCircle2 className="size-4" />
          <AlertDescription>Service deleted successfully.</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Your services</CardTitle>
          <CardDescription>{items.length} services listed</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {[
                    "Service",
                    "Category",
                    "Description",
                    "Price",
                    "Duration",
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
                {items.map((item, i) => (
                  <tr key={item.name} className="border-b last:border-0">
                    <td className="px-5 py-4 font-semibold">{item.name}</td>
                    <td className="px-5 py-4">{item.category}</td>
                    <td className="max-w-xs px-5 py-4 text-slate-500">
                      {item.description}
                    </td>
                    <td className="px-5 py-4 font-semibold">{item.price}</td>
                    <td className="px-5 py-4">{item.duration}</td>
                    <td className="px-5 py-4">
                      <Badge
                        className={
                          item.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Edit service"
                          onClick={() => {
                            setEditing(i);
                            setForm({
                              ...item,
                              price: item.price.replace("$", ""),
                            });
                            setOpen(true);
                          }}
                        >
                          <Edit3 className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Delete service"
                          onClick={() => {
                            setItems(items.filter((_, index) => index !== i));
                            setDeleted(true);
                          }}
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
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing === null ? "Add service" : "Edit service"}
            </DialogTitle>
            <DialogDescription>
              Describe the service customers can book.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(category) => setForm({ ...form, category })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="service-name">Name</Label>
              <Input
                id="service-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="service-description">Description</Label>
              <Textarea
                id="service-description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="mt-2"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Price" value={form.price} />
              <Field label="Duration" value={form.duration} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={save}
              disabled={!form.name || !form.price}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function TechnicianAvailability() {
  const [saved, setSaved] = useState(false);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Availability"
        description="Set the hours customers can request your services."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSaved(false)}>
              Reset changes
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setSaved(true)}
            >
              Save availability
            </Button>
          </div>
        }
      />
      {saved && (
        <Alert>
          <CheckCircle2 className="size-4" />
          <AlertDescription>Your availability has been saved.</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Weekly schedule</CardTitle>
          <CardDescription>
            Booked slots are shown in blue. Changes apply to future bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {days.map((day, i) => (
            <div
              key={day}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
            >
              <div className="w-28 font-semibold text-slate-900">{day}</div>
              <div className="flex flex-1 flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="gap-2 bg-emerald-50 text-emerald-700"
                >
                  09:00 AM – 12:00 PM{" "}
                  <span className="text-[10px]">Available</span>
                </Badge>
                {i < 5 && (
                  <Badge className="gap-2 bg-blue-50 text-blue-700">
                    02:00 PM – 06:00 PM{" "}
                    <span className="text-[10px]">Booked</span>
                  </Badge>
                )}
                {i === 5 && (
                  <Badge variant="outline" className="text-slate-500">
                    Unavailable
                  </Badge>
                )}
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline">
                  <Edit3 className="mr-1 size-3.5" />
                  Edit
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Delete ${day} slot`}
                >
                  <Trash2 className="size-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
