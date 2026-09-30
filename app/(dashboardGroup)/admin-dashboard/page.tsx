import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { getAdminStats } from "../_actions/adminActions";
import { Suspense } from "react";
import AdminStatLists from "../_components/admin/AdminStatLists";
import { AdminHomeLoading } from "../_components/admin/AdminComponents";

export default async function AdminDashboard() {
  const adminStats = await getAdminStats();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Dashboard
          </h2>

          <p className="mt-2 text-slate-500">
            A clear view of everything happening across FixItNow.
          </p>
        </div>

        <Button variant="outline" asChild>
          <Link href="/admin-dashboard/manage-users">
            <Users className="mr-2 size-4" />
            Manage users
          </Link>
        </Button>
      </div>

      <Suspense fallback={<AdminHomeLoading />}>
        <AdminStatLists adminStats={adminStats} />
      </Suspense>
    </div>
  );
}
