import { AdminShell } from "@/components/fixitnow/admin-shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
