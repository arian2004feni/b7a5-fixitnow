"use client"

import { Menu, Wrench, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuItems = [
    {
      name: "Find a Service",
      url: "/services",
    },
    {
      name: "Browse Technicians",
      url: "/technicians",
    },
    {
      name: "How It Works",
      url: "/#how-it-works",
    },
  ];
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Wrench className="size-5" />
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-950">
            FixIt<span className="text-blue-600">Now</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="text-slate-600">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button className="rounded-lg bg-blue-600 hover:bg-blue-700">
            <Link href={"/register"}>Become a Technician</Link>
          </Button>
        </div>
        <button
          aria-label="Open menu"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.url}>
                {item.name}
              </Link>
            ))}
            <Button className="bg-blue-600">Become a Technician</Button>
          </div>
        </div>
      )}
    </header>
  );
}
