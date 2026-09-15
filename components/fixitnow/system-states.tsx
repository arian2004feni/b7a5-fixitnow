import Link from "next/link";
import {
  AlertTriangle,
  Ban,
  CreditCard,
  FileQuestion,
  Inbox,
  Network,
  Search,
  ServerCrash,
  ShieldX,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const states = {
  notFound: {
    icon: FileQuestion,
    title: "Page not found",
    text: "The page you are looking for does not exist or may have moved.",
    primary: "Go home",
    href: "/",
  },
  server: {
    icon: ServerCrash,
    title: "Something went wrong",
    text: "We could not load this page. Please try again or return home.",
    primary: "Try again",
    href: "#",
  },
  unauthorized: {
    icon: ShieldX,
    title: "Sign in required",
    text: "Please sign in to continue to this part of FixItNow.",
    primary: "Sign in",
    href: "/login",
  },
  forbidden: {
    icon: Ban,
    title: "Access denied",
    text: "You do not have permission to view this page.",
    primary: "Go to dashboard",
    href: "/customer-dashboard",
  },
  network: {
    icon: Network,
    title: "Network error",
    text: "Check your connection and try again when you are back online.",
    primary: "Try again",
    href: "#",
  },
  api: {
    icon: ServerCrash,
    title: "Service unavailable",
    text: "Our service is having trouble right now. Please try again shortly.",
    primary: "Try again",
    href: "#",
  },
  search: {
    icon: Search,
    title: "No results found",
    text: "Try a different search term or browse all available services.",
    primary: "Browse services",
    href: "/services",
  },
  bookings: {
    icon: Inbox,
    title: "No bookings yet",
    text: "When you book a service, your upcoming and past bookings will appear here.",
    primary: "Find a service",
    href: "/services",
  },
  payments: {
    icon: CreditCard,
    title: "No payments yet",
    text: "Your payment history will appear here after your first completed booking.",
    primary: "View bookings",
    href: "/customer-dashboard/bookings",
  },
  services: {
    icon: Wrench,
    title: "No services yet",
    text: "Add your first service to start connecting with customers.",
    primary: "Add a service",
    href: "/technician-dashboard/services",
  },
  technicians: {
    icon: Sparkles,
    title: "No technicians found",
    text: "Try adjusting your filters or search in another area.",
    primary: "Browse services",
    href: "/services",
  },
  payment: {
    icon: AlertTriangle,
    title: "Payment failed",
    text: "We could not process your payment. Check your details and try again.",
    primary: "Try payment again",
    href: "#",
  },
};

export function SystemState({ kind }: { kind: keyof typeof states }) {
  const state = states[kind];
  const Icon = state.icon;
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon className="size-8" />
      </span>
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">
        {state.title}
      </h2>
      <p className="mt-2 max-w-md text-slate-500">{state.text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href={state.href}>{state.primary}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}
