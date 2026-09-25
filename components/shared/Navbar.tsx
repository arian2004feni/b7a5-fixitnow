"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { ApiResponse } from "@/types/api";
import { User as UserResponse } from "@/types/user";
import Logo from "./Logo";
import AuthMenu from "./AuthMenu";

export default function Navbar({ user }: { user: ApiResponse<UserResponse> }) {
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
        <Logo />
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
        <AuthMenu user={user} />
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
