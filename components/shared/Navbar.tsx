"use client";

import { LogOutIcon, Menu, SettingsIcon, UserIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { ApiResponse } from "@/types/api";
import { User as UserResponse } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "./Logo";
import { toast } from "sonner";
import logout from "@/services/logout";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user: ApiResponse<UserResponse> }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

  const userMenuItems = [
    { label: "Profile", icon: UserIcon, action: "profile" },
    { label: "Settings", icon: SettingsIcon, action: "settings" },
  ];

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("succesfully logged out");
      router.push("/login");
    }
  };

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
        {user.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="" alt="null" />
                  <AvatarFallback>
                    {user.data.name.split(" ")[0].slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-fit max-w-56 min-w-40"
            >
              <DropdownMenuLabel className="flex gap-2">
                <Avatar>
                  <AvatarImage src="" alt="null" />
                  <AvatarFallback>
                    {user.data.name.split(" ")[0].slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>{user.data.name}</p>
                  <p className="line-clamp-1">{user.data.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {userMenuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.label}
                    onClick={() => handleUserMenuAction(item.action)}
                  >
                    <item.icon />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => handleUserMenuAction("logout")}
              >
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-600">
                Sign in
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button className="rounded-lg bg-blue-600 hover:bg-blue-700">
                Become a Technician
              </Button>
            </Link>
          </div>
        )}
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
