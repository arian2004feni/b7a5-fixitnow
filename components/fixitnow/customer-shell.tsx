"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Star,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/customer-dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/customer-dashboard/bookings",
    label: "My bookings",
    icon: CalendarDays,
  },
  { href: "/customer-dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/customer-dashboard/reviews", label: "Reviews", icon: Star },
  {
    href: "/customer-dashboard/profile",
    label: "Profile settings",
    icon: UserRound,
  },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1" aria-label="Customer navigation">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-2"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white">
          <Wrench className="size-5" />
        </span>
        <span className="text-xl font-bold tracking-tight text-slate-950">
          FixIt<span className="text-blue-600">Now</span>
        </span>
      </Link>
      <p className="mt-10 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
        Customer menu
      </p>
      <div className="mt-3">
        <NavLinks onNavigate={onNavigate} />
      </div>
      <Separator className="my-6" />
      <Link
        href="/services"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
      >
        <MessageSquare className="size-4" />
        Find a service
      </Link>
      <div className="mt-auto rounded-xl bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-blue-100 text-blue-700">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              Jordan Davis
            </p>
            <p className="truncate text-xs text-slate-500">
              jordan@example.com
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4 w-full justify-start gap-2 text-slate-500"
          asChild
        >
          <Link href="/login">
            <LogOut className="size-4" />
            Sign out
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function CustomerShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-6 lg:block">
        <SidebarContent />
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-6">
                <SheetTitle className="sr-only">Customer navigation</SheetTitle>
                <SidebarContent onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <div>
              <p className="hidden text-xs font-medium text-slate-400 sm:block">
                Customer account
              </p>
              <h1 className="text-sm font-semibold text-slate-900 sm:text-base">
                Welcome back, Jordan
              </h1>
            </div>
          </div>
          <Avatar className="size-9">
            <AvatarFallback className="bg-blue-100 text-blue-700">
              JD
            </AvatarFallback>
          </Avatar>
        </header>
        <main className="mx-auto max-w-7xl p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className="grid size-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

export const customerLinks = links;
export const customerMenuIcon = X;
