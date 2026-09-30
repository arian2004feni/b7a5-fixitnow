import { Suspense } from "react";
import AdminUserLists from "../../_components/admin/AdminUserLists";

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="text-3xl font-bold">Users</h2>

        <p className="mt-2 text-slate-500">
          Manage customer, technician, and administrator accounts.
        </p>
      </div>

      <Suspense>
        <AdminUserLists />
      </Suspense>
    </div>
  );
}
