"use client";

import { ApiResponse } from "@/types/api";
import { User as UserResponse } from "@/types/user";
import Link from "next/link";
import { Button } from "../ui/button";
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
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import logout from "@/services/logout";
import { toast } from "sonner";
import { Role } from "@/types/enums";
import { redirect } from "next/navigation";

export default function AuthMenu({
  user,
}: {
  user: ApiResponse<UserResponse>;
}) {
  const userMenuItems = [
    { label: "Profile", icon: UserIcon, action: "profile" },
    { label: "Settings", icon: SettingsIcon, action: "settings" },
  ];

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("succesfully logged out");
      redirect("/login");
    }
    if (action === "profile") {
      if (user.data.role === Role.CUSTOMER) {
        redirect("/customer-dashboard");
      } else if (user.data.role === Role.TECHNICIAN) {
        redirect("/technician-dashboard");
      } else if (user.data.role === Role.ADMIN) {
        redirect("/admin-dashboard");
      }
      return;
    }
  };

  if (!user.success) {
    return (
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
    );
  }

  return (
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
      <DropdownMenuContent align="end" className="w-fit max-w-56 min-w-40">
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
  );
}
