import { TechnicianShell } from "@/components/fixitnow/technician-shell";
export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TechnicianShell>{children}</TechnicianShell>;
}
