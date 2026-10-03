"use client";

import { Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/user";
import { getAdminUser, getAdminUsers } from "../../_actions/adminActions";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 10;

export default function AdminUserLists() {
  const [users, setUsers] = useState<User[]>([]);

  const [selected, setSelected] = useState<User | null>(null);

  const [query, setQuery] = useState("");

  const [role, setRole] = useState("ALL");

  const [status, setStatus] = useState("ALL");

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);

        const response = await getAdminUsers();

        setUsers(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load users.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = `${user.name} ${user.email}`
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesRole = role === "ALL" || user.role === role;

      const matchesStatus = status === "ALL" || user.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, query, role, status]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  const visibleUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [query, role, status]);

  async function openUser(id: string) {
    try {
      const response = await getAdminUser(id);

      setSelected(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load user.");
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="space-y-2">
          {/* Card Title and Total Counts */}
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50">
                <tr>
                  {[
                    "Icon",
                    "Category Name",
                    "Total Services",
                    "Created At",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="px-5 py-3">
                      <Skeleton className="h-3 w-16" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 4 }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b last:border-0">
                    {/* Icon Column */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </td>
                    {/* Category Name */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-44" />
                    </td>
                    {/* Total Services Count */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    {/* Created Date */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    {/* Action Buttons */}
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />

          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or email"
            className="pl-9"
          />
        </div>

        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
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
            <SelectValue />
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

          <CardDescription>{filteredUsers.length} users found</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">User</th>

                  <th className="px-5 py-3">Role</th>

                  <th className="px-5 py-3">Registered</th>

                  <th className="px-5 py-3">Status</th>

                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                          {user.name.slice(0, 2).toUpperCase()}
                        </span>

                        <div>
                          <p className="font-semibold">{user.name}</p>

                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <Badge>{user.role}</Badge>
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          user.status === "ACTIVE" ? "default" : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>

                    <td className="px-5 py-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openUser(user.id)}
                      >
                        <Eye className="mr-1.5 size-3.5" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visibleUsers.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-500">
              No users found.
            </div>
          )}
        </CardContent>

        <div className="flex items-center justify-between border-t px-5 py-3 text-sm">
          <span className="text-slate-500">
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>

      <UserDetailsDialog user={selected} onClose={() => setSelected(null)} />
    </>
  );

  function UserDetailsDialog({
    user,
    onClose,
  }: {
    user: User | null;
    onClose: () => void;
  }) {
    return (
      <Dialog
        open={!!user}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{user?.name}</DialogTitle>

            <DialogDescription>
              Complete user profile and marketplace activity.
            </DialogDescription>
          </DialogHeader>

          {user && (
            <div className="grid gap-6">
              <div className="grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                <Info label="Email" value={user.email} />

                <Info label="Role" value={user.role} />

                <Info label="Status" value={user.status} />

                <Info
                  label="Registered"
                  value={new Date(user.createdAt).toLocaleString()}
                />
              </div>

              {user.customerProfile && (
                <section>
                  <h3 className="font-semibold">Customer profile</h3>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Info
                      label="Location"
                      value={user.customerProfile.location}
                    />

                    <Info
                      label="Mobile"
                      value={user.customerProfile.mobileNumber}
                    />

                    <Info
                      label="Bookings"
                      value={user.customerProfile.customerBookings?.length}
                    />

                    <Info
                      label="Reviews"
                      value={user.customerProfile.reviewsGiven?.length}
                    />
                  </div>
                </section>
              )}

              {user.technicianProfile && (
                <section>
                  <h3 className="font-semibold">Technician profile</h3>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Info
                      label="Experience"
                      value={`${user.technicianProfile.experienceYears} years`}
                    />

                    <Info
                      label="Rating"
                      value={user.technicianProfile.averageRating}
                    />

                    <Info
                      label="Services"
                      value={user.technicianProfile.services?.length}
                    />

                    <Info
                      label="Bookings"
                      value={user.technicianProfile.bookings?.length}
                    />
                  </div>
                </section>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  function Info({ label, value }: { label: string; value: unknown }) {
    return (
      <div>
        <p className="text-xs text-slate-500">{label}</p>

        <p className="mt-1 font-medium">
          {value == null || value === "" ? "Not provided" : String(value)}
        </p>
      </div>
    );
  }
}
