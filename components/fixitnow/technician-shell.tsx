"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  Wrench,
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
  { href: "/technician-dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/technician-dashboard/bookings",
    label: "Bookings",
    icon: CalendarDays,
  },
  {
    href: "/technician-dashboard/services",
    label: "Services",
    icon: BriefcaseBusiness,
  },
  {
    href: "/technician-dashboard/availability",
    label: "Availability",
    icon: Clock3,
  },
  { href: "/technician-dashboard/profile", label: "Profile", icon: UserRound },
];
function Sidebar({ close }: { close?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <Link href="/" onClick={close} className="flex items-center gap-2.5 px-2">
        <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white">
          <Wrench className="size-5" />
        </span>
        <span className="text-xl font-bold tracking-tight text-slate-950">
          FixIt<span className="text-blue-600">Now</span>
        </span>
      </Link>
      <p className="mt-10 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
        Technician menu
      </p>
      <nav
        className="mt-3 flex flex-col gap-1"
        aria-label="Technician navigation"
      >
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={close}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${pathname === href ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
      <Separator className="my-6" />
      <div className="mt-auto rounded-xl bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-blue-100 text-blue-700">
              MR
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              Michael Rodriguez
            </p>
            <p className="truncate text-xs text-slate-500">Licensed Plumber</p>
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
export function TechnicianShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-6 lg:block">
        <Sidebar />
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
                <SheetTitle className="sr-only">
                  Technician navigation
                </SheetTitle>
                <Sidebar close={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <div>
              <p className="hidden text-xs font-medium text-slate-400 sm:block">
                Technician account
              </p>
              <h1 className="text-sm font-semibold text-slate-900 sm:text-base">
                Welcome back, Michael
              </h1>
            </div>
          </div>
          <Avatar className="size-9">
            <AvatarFallback className="bg-blue-100 text-blue-700">
              MR
            </AvatarFallback>
          </Avatar>
        </header>
        <main className="mx-auto max-w-7xl p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
export const technicianLinks = links;
