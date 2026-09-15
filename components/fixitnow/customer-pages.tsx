"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Eye,
  FileText,
  Home,
  MapPin,
  MessageSquare,
  Pencil,
  Plus,
  ShieldCheck,
  Star,
  UserRound,
  Wrench,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { StatCard } from "@/components/fixitnow/customer-shell";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
export const bookings = [
  {
    id: "FX-10482",
    service: "Deep home cleaning",
    technician: "Ava Thompson",
    date: "May 24, 2024",
    time: "10:00 AM – 12:00 PM",
    location: "1428 Market Street, San Francisco",
    amount: "$120.00",
    status: "ACCEPTED" as BookingStatus,
  },
  {
    id: "FX-10467",
    service: "Faucet repair",
    technician: "Michael Rodriguez",
    date: "May 12, 2024",
    time: "2:00 PM – 3:00 PM",
    location: "1428 Market Street, San Francisco",
    amount: "$85.00",
    status: "COMPLETED" as BookingStatus,
  },
  {
    id: "FX-10421",
    service: "AC maintenance",
    technician: "Daniel Kim",
    date: "Apr 28, 2024",
    time: "9:00 AM – 10:00 AM",
    location: "1428 Market Street, San Francisco",
    amount: "$95.00",
    status: "COMPLETED" as BookingStatus,
  },
  {
    id: "FX-10501",
    service: "Furniture assembly",
    technician: "Noah Williams",
    date: "Jun 02, 2024",
    time: "1:00 PM – 3:00 PM",
    location: "1428 Market Street, San Francisco",
    amount: "$150.00",
    status: "REQUESTED" as BookingStatus,
  },
];

const statusLabel: Record<BookingStatus, string> = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  PAID: "Paid",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};
const statusClass: Record<BookingStatus, string> = {
  REQUESTED: "bg-amber-50 text-amber-700",
  ACCEPTED: "bg-blue-50 text-blue-700",
  PAID: "bg-violet-50 text-violet-700",
  IN_PROGRESS: "bg-cyan-50 text-cyan-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-slate-100 text-slate-600",
};
export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge className={`${statusClass[status]} hover:${statusClass[status]}`}>
      {statusLabel[status]}
    </Badge>
  );
}
function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="text-sm font-medium text-blue-600">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>
        {description && <p className="mt-2 text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function LoadingState() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-20 w-full" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    </div>
  );
}
export function ErrorState() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="size-4" />
      <AlertDescription>
        We couldn&apos;t load this information. Please try again.
      </AlertDescription>
    </Alert>
  );
}

export function BookingsPage() {
  const [filter, setFilter] = useState<"ALL" | BookingStatus>("ALL");
  const [cancelId, setCancelId] = useState<string | null>(null);
  const filtered =
    filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);
  return (
    <div className="flex flex-col gap-7">
      <PageHeading
        title="My bookings"
        description="Track and manage all your home services."
        action={
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/services">
              <Plus className="mr-2 size-4" />
              Book a service
            </Link>
          </Button>
        }
      />
      <div className="flex flex-wrap gap-2">
        {(
          [
            "ALL",
            "REQUESTED",
            "ACCEPTED",
            "PAID",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED",
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
            {filtered.length} booking{filtered.length === 1 ? "" : "s"} found
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
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {booking.service}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {booking.id}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {booking.technician}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{booking.date}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {booking.amount}
                    </td>
                    <td className="px-6 py-4">
                      <BookingActions
                        booking={booking}
                        onCancel={() => setCancelId(booking.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {filtered.map((booking) => (
              <div key={booking.id} className="rounded-xl border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{booking.service}</p>
                    <p className="text-xs text-slate-500">{booking.id}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <span>{booking.technician}</span>
                  <span>{booking.date}</span>
                  <span className="font-semibold text-slate-900">
                    {booking.amount}
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
    </div>
  );
}
function BookingActions({
  booking,
  onCancel,
}: {
  booking: (typeof bookings)[number];
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/customer-dashboard/bookings/${booking.id}`}>
          <Eye className="mr-1.5 size-3.5" />
          View
        </Link>
      </Button>
      {booking.status === "ACCEPTED" && (
        <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href={`/customer-dashboard/bookings/${booking.id}/pay`}>
            Pay now
          </Link>
        </Button>
      )}
      {booking.status === "COMPLETED" && (
        <Button variant="outline" size="sm" asChild>
          <Link href="/customer-dashboard/reviews">Leave review</Link>
        </Button>
      )}
      {["REQUESTED", "ACCEPTED"].includes(booking.status) && (
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </div>
  );
}

export function BookingDetailsPage({ id = "FX-10482" }: { id?: string }) {
  const booking = bookings.find((b) => b.id === id) ?? bookings[0];
  const steps: BookingStatus[] = [
    "REQUESTED",
    "ACCEPTED",
    "PAID",
    "IN_PROGRESS",
    "COMPLETED",
  ];
  const current = steps.indexOf(booking.status);
  return (
    <div className="flex flex-col gap-7">
      <Button variant="ghost" asChild className="w-fit -ml-3 text-slate-500">
        <Link href="/customer-dashboard/bookings">
          <ArrowLeft className="mr-2 size-4" />
          Back to bookings
        </Link>
      </Button>
      <PageHeading
        title="Booking details"
        description={`Booking ${booking.id}`}
        action={<StatusBadge status={booking.status} />}
      />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{booking.service}</CardTitle>
              <CardDescription>Scheduled service appointment</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <Detail icon={CalendarDays} label="Date" value={booking.date} />
              <Detail icon={Clock3} label="Time" value={booking.time} />
              <Detail icon={MapPin} label="Address" value={booking.location} />
              <Detail icon={CreditCard} label="Amount" value={booking.amount} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Booking status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-0 sm:flex-row sm:items-start">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex flex-row items-center sm:flex-1 sm:flex-col sm:items-center"
                  >
                    <div
                      className={`grid size-9 shrink-0 place-items-center rounded-full ${index <= current ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                      {index <= current ? (
                        <Check className="size-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="ml-3 flex-1 pb-5 sm:ml-0 sm:pt-2 sm:pb-0 sm:text-center">
                      <p className="text-xs font-medium text-slate-700">
                        {statusLabel[step]}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`hidden h-px flex-1 sm:block ${index < current ? "bg-blue-600" : "bg-slate-200"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Technician</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {booking.technician
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{booking.technician}</p>
                  <p className="text-sm text-slate-500">
                    Home services professional
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                    <Star className="size-3 fill-current" />
                    4.9 rating
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Service total</span>
                <span>{booking.amount}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{booking.amount}</span>
              </div>
              {booking.status === "ACCEPTED" && (
                <Button asChild className="mt-2 bg-blue-600 hover:bg-blue-700">
                  <Link href={`/customer-dashboard/bookings/${booking.id}/pay`}>
                    Pay now
                  </Link>
                </Button>
              )}
              {booking.status === "COMPLETED" && (
                <Button asChild variant="outline">
                  <Link href="/customer-dashboard/reviews">Leave a review</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 text-blue-600" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export function PaymentPage({ id = "FX-10482" }: { id?: string }) {
  const booking = bookings.find((b) => b.id === id) ?? bookings[0];
  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="ghost" asChild className="mb-6 -ml-3 text-slate-500">
        <Link href={`/customer-dashboard/bookings/${booking.id}`}>
          <ArrowLeft className="mr-2 size-4" />
          Back to booking
        </Link>
      </Button>
      <PageHeading
        title="Complete payment"
        description="Securely pay for your FixItNow service."
      />
      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Detail icon={Wrench} label="Service" value={booking.service} />
            <Detail
              icon={UserRound}
              label="Technician"
              value={booking.technician}
            />
            <Detail
              icon={CalendarDays}
              label="Appointment"
              value={`${booking.date}, ${booking.time}`}
            />
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{booking.amount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment provider</CardTitle>
            <CardDescription>Stripe Checkout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
              You will be securely redirected to Stripe to complete your
              payment.
            </div>
            <Button
              asChild
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
            >
              <Link href={`/payment/success?booking=${booking.id}`}>
                Continue to secure payment{" "}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function PaymentsPage() {
  const rows = bookings.map((b, i) => ({
    ...b,
    transaction: i === 0 ? "—" : `ch_${b.id.toLowerCase().replace("-", "")}`,
  }));
  return (
    <div className="flex flex-col gap-7">
      <PageHeading
        title="Payments"
        description="Review your payment history and receipts."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total paid"
          value="$300"
          detail="All time"
          icon={CreditCard}
        />
        <StatCard
          label="Successful"
          value="2"
          detail="Completed payments"
          icon={CheckCircle2}
        />
        <StatCard
          label="Pending"
          value="1"
          detail="Awaiting payment"
          icon={Clock3}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment history</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3">Transaction</th>
                  <th className="px-6 py-3">Booking</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="px-6 py-4 font-mono text-xs">
                      {r.transaction}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{r.id}</td>
                    <td className="px-6 py-4">{r.service}</td>
                    <td className="px-6 py-4 font-semibold">{r.amount}</td>
                    <td className="px-6 py-4 text-slate-600">{r.date}</td>
                    <td className="px-6 py-4">
                      <Badge
                        className={
                          r.status === "ACCEPTED"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }
                      >
                        {r.status === "ACCEPTED" ? "Pending" : "Successful"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("");
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeading
        title="Reviews"
        description="Share feedback about your completed services."
      />
      <Card className="mt-7">
        <CardHeader>
          <CardTitle>Review your latest service</CardTitle>
          <CardDescription>
            Faucet repair with Michael Rodriguez
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {submitted && (
              <Alert>
                <CheckCircle2 className="size-4" />
                <AlertDescription>
                  Thanks for sharing your feedback with the FixItNow community.
                </AlertDescription>
              </Alert>
            )}
            <div>
              <Label>How was your experience?</Label>
              <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    onClick={() => setRating(value)}
                    className="rounded-md p-1 text-slate-300 transition hover:text-amber-400"
                  >
                    <Star
                      className={`size-8 ${rating >= value ? "fill-amber-400 text-amber-400" : ""}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="review">Your review</Label>
              <textarea
                id="review"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell us about your experience..."
                className="mt-2 min-h-32 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-blue-500"
                maxLength={500}
              />
              <p className="mt-1 text-right text-xs text-slate-500">
                {text.length}/500
              </p>
            </div>
            <Button
              className="w-fit bg-blue-600 hover:bg-blue-700"
              disabled={!rating || !text.trim()}
              onClick={() => setSubmitted(true)}
            >
              Submit review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProfilePage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeading
        title="Profile settings"
        description="Manage your personal information and preferences."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
            <CardDescription>
              Keep your contact details up to date.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarFallback className="bg-blue-100 text-lg text-blue-700">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 size-3.5" />
                Change photo
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" defaultValue="Jordan Davis" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  defaultValue="(415) 555-0182"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue="jordan@example.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                defaultValue="1428 Market Street, San Francisco"
                className="mt-2"
              />
            </div>
            <Button className="w-fit bg-blue-600 hover:bg-blue-700">
              Save changes
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security & notifications</CardTitle>
            <CardDescription>
              Control account access and updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant="outline" className="justify-between">
              Change password <ChevronRight className="size-4" />
            </Button>
            <Button variant="outline" className="justify-between">
              Email notifications <Check className="size-4 text-emerald-600" />
            </Button>
            <Button variant="outline" className="justify-between">
              SMS appointment reminders{" "}
              <Check className="size-4 text-emerald-600" />
            </Button>
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="justify-start text-red-600 hover:text-red-700"
            >
              Log out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function PaymentResult({ cancelled = false }: { cancelled?: boolean }) {
  return (
    <div className="mx-auto max-w-lg py-8">
      <Card>
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div
            className={`grid size-16 place-items-center rounded-full ${cancelled ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}
          >
            {cancelled ? (
              <XCircle className="size-8" />
            ) : (
              <CheckCircle2 className="size-8" />
            )}
          </div>
          <h2 className="mt-5 text-2xl font-bold">
            {cancelled ? "Payment not completed" : "Payment successful"}
          </h2>
          <p className="mt-2 text-slate-500">
            {cancelled
              ? "Your payment was cancelled. No charge was made."
              : "Your service has been confirmed and your technician has been notified."}
          </p>
          <div className="mt-6 w-full rounded-xl bg-slate-50 p-4 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Booking ID</span>
              <span className="font-medium">FX-10482</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-slate-500">
                {cancelled ? "Reason" : "Transaction ID"}
              </span>
              <span className="font-medium">
                {cancelled ? "Payment cancelled" : "ch_3N8fixitnow"}
              </span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-slate-500">Amount</span>
              <span className="font-bold">$120.00</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-slate-500">Provider</span>
              <span className="font-medium">Stripe</span>
            </div>
          </div>
          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Link href="/customer-dashboard/bookings/FX-10482">
                {cancelled ? "Try payment again" : "View booking"}
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/customer-dashboard">Go to dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AuthPage({ register = false }: { register?: boolean }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("customer");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (!register) window.location.href = "/customer-dashboard";
    }, 700);
  }
  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-950"
        >
          {" "}
          <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white">
            <Wrench className="size-5" />
          </span>
          FixIt<span className="text-blue-600">Now</span>
        </Link>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              {register ? "Create your account" : "Welcome back"}
            </CardTitle>
            <CardDescription>
              {register
                ? "Join FixItNow and get your home taken care of."
                : "Sign in to manage your services and bookings."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="flex flex-col gap-4">
              {register && (
                <div>
                  <Label htmlFor="full-name">Full name</Label>
                  <Input
                    id="full-name"
                    required
                    placeholder="Jordan Davis"
                    className="mt-2"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {!register && (
                    <Link
                      href="#"
                      className="text-xs font-medium text-blue-600"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={show ? "text" : "password"}
                    required
                    minLength={8}
                    className="pr-20"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500"
                  >
                    {show ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {register && (
                <>
                  <div>
                    <Label htmlFor="confirm">Confirm password</Label>
                    <Input
                      id="confirm"
                      type="password"
                      required
                      minLength={8}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="(415) 555-0182"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="mb-3 block">I&apos;m joining as</Label>
                    <RadioGroup
                      value={role}
                      onValueChange={setRole}
                      className="grid grid-cols-2 gap-3"
                    >
                      <label
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 ${role === "customer" ? "border-blue-500 bg-blue-50" : ""}`}
                      >
                        <RadioGroupItem value="customer" />
                        Customer
                      </label>
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border p-3">
                        <RadioGroupItem value="technician" />
                        Technician
                      </label>
                    </RadioGroup>
                  </div>
                </>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Spinner className="mr-2" />
                    Please wait...
                  </>
                ) : register ? (
                  "Create account"
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
              {register ? "Already have an account?" : "New to FixItNow?"}{" "}
              <Link
                href={register ? "/login" : "/register"}
                className="font-semibold text-blue-600"
              >
                {register ? "Sign in" : "Create an account"}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function CustomerHomeLink() {
  return (
    <Button asChild variant="outline">
      <Link href="/customer-dashboard">Dashboard</Link>
    </Button>
  );
}

export function DashboardStatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total bookings"
        value="12"
        detail="3 this month"
        icon={CalendarDays}
      />
      <StatCard
        label="Active bookings"
        value="2"
        detail="1 scheduled soon"
        icon={Clock3}
      />
      <StatCard
        label="Completed jobs"
        value="9"
        detail="100% satisfaction"
        icon={CheckCircle2}
      />
      <StatCard
        label="Total spent"
        value="$1,240"
        detail="This year"
        icon={CreditCard}
      />
    </div>
  );
}

export { PageHeading };
