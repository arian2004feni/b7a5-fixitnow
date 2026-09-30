"use client";

import {
  Users,
  UserPlus,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  CreditCard,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminStats } from "@/types/admin";

import { HealthRow, MiniChart, Stat } from "./AdminComponents";
import { formatCurrency, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/types/api";

export default function AdminStatLists({
  adminStats,
}: {
  adminStats: ApiResponse<AdminStats>;
}) {
  const [stats, setStats] = useState<AdminStats | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);

        const response = adminStats;

        setStats(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load dashboard.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [adminStats]);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-5">
              <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="font-semibold text-red-600">
            Failed to load admin dashboard
          </p>

          <p className="mt-2 text-sm text-slate-500">{error}</p>

          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  const { overview, charts, recentActivity, platformHealth } = stats;

  return (
    <>
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Stat
          title="Total users"
          value={overview.totalUsers.toLocaleString()}
          detail={`${
            overview.userGrowth >= 0 ? "+" : ""
          }${overview.userGrowth}% this month`}
          icon={Users}
          tone="bg-blue-50 text-blue-600"
        />

        <Stat
          title="Customers"
          value={overview.customers.toLocaleString()}
          detail={`${overview.customerPercentage}% of users`}
          icon={UserPlus}
          tone="bg-emerald-50 text-emerald-600"
        />

        <Stat
          title="Technicians"
          value={overview.technicians.toLocaleString()}
          detail={`+${overview.techniciansThisMonth} this month`}
          icon={ShieldCheck}
          tone="bg-violet-50 text-violet-600"
        />

        <Stat
          title="Active bookings"
          value={overview.activeBookings.toLocaleString()}
          detail="Across all services"
          icon={Clock3}
          tone="bg-amber-50 text-amber-600"
        />

        <Stat
          title="Completed jobs"
          value={overview.completedJobs.toLocaleString()}
          detail={`${overview.completionRate}% completion rate`}
          icon={CheckCircle2}
          tone="bg-cyan-50 text-cyan-600"
        />

        <Stat
          title="Total revenue"
          value={formatCurrency(overview.totalRevenue)}
          detail={`${
            overview.revenueGrowth >= 0 ? "+" : ""
          }${overview.revenueGrowth}% this month`}
          icon={CreditCard}
          tone="bg-rose-50 text-rose-600"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bookings over time</CardTitle>

            <CardDescription>Actual monthly booking volume</CardDescription>
          </CardHeader>

          <CardContent>
            <MiniChart data={charts.bookingsOverTime} valueKey="bookings" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue over time</CardTitle>

            <CardDescription>Actual monthly platform revenue</CardDescription>
          </CardHeader>

          <CardContent>
            <MiniChart data={charts.revenueOverTime} valueKey="revenue" />
          </CardContent>
        </Card>
      </div>

      {/* Activity + Health */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>

            <CardDescription>
              Latest events from your marketplace
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            {recentActivity.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                No recent activity.
              </p>
            ) : (
              recentActivity.map((activity, index) => (
                <div
                  key={`${activity.type}-${index}`}
                  className="flex items-center gap-3"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                    {activity.type === "PAYMENT_RECEIVED" ? (
                      <CreditCard className="size-4" />
                    ) : activity.type === "BOOKING_COMPLETED" ? (
                      <CheckCircle2 className="size-4" />
                    ) : activity.type === "NEW_REVIEW" ? (
                      <TrendingUp className="size-4" />
                    ) : (
                      <UserPlus className="size-4" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {activity.type
                        .replaceAll("_", " ")
                        .replace(/^\w/, (char) => char.toUpperCase())}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {activity.message}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs text-slate-400">
                    {formatTime(activity.createdAt)}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform health</CardTitle>

            <CardDescription>Live service status</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <HealthRow label="API status" value={platformHealth.api} />

            <HealthRow label="Payment status" value={platformHealth.payments} />

            <HealthRow
              label="Active technicians"
              value={platformHealth.activeTechnicians.toLocaleString()}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
