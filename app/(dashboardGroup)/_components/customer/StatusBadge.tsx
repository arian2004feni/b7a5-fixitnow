import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@/types/enums";

type BookingStatusStrings =
  | BookingStatus.ACCEPTED
  | BookingStatus.CANCELLED
  | BookingStatus.COMPLETED
  | BookingStatus.DECLINED
  | BookingStatus.IN_PROGRESS
  | BookingStatus.PAID
  | BookingStatus.REQUESTED;
// const bookings = [
//   {
//     id: "FX-10482",
//     service: "Deep home cleaning",
//     technician: "Ava Thompson",
//     date: "May 24, 2024",
//     time: "10:00 AM – 12:00 PM",
//     location: "1428 Market Street, San Francisco",
//     amount: "$120.00",
//     status: "ACCEPTED" as BookingStatus,
//   },
//   {
//     id: "FX-10467",
//     service: "Faucet repair",
//     technician: "Michael Rodriguez",
//     date: "May 12, 2024",
//     time: "2:00 PM – 3:00 PM",
//     location: "1428 Market Street, San Francisco",
//     amount: "$85.00",
//     status: "COMPLETED" as BookingStatus,
//   },
//   {
//     id: "FX-10421",
//     service: "AC maintenance",
//     technician: "Daniel Kim",
//     date: "Apr 28, 2024",
//     time: "9:00 AM – 10:00 AM",
//     location: "1428 Market Street, San Francisco",
//     amount: "$95.00",
//     status: "COMPLETED" as BookingStatus,
//   },
//   {
//     id: "FX-10501",
//     service: "Furniture assembly",
//     technician: "Noah Williams",
//     date: "Jun 02, 2024",
//     time: "1:00 PM – 3:00 PM",
//     location: "1428 Market Street, San Francisco",
//     amount: "$150.00",
//     status: "REQUESTED" as BookingStatus,
//   },
// ];

const statusLabel: Record<BookingStatusStrings, string> = {
  ACCEPTED: "Accepted",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  DECLINED: "Declined",
  PAID: "Paid",
  IN_PROGRESS: "In progress",
  REQUESTED: "Requested",
};
const statusClass: Record<BookingStatus, string> = {
  REQUESTED: "bg-amber-50 text-amber-700",
  ACCEPTED: "bg-blue-50 text-blue-700",
  DECLINED: "bg-red-50 text-red-700",
  PAID: "bg-violet-50 text-violet-700",
  IN_PROGRESS: "bg-cyan-50 text-cyan-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-slate-100 text-slate-600",
};
export default function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge className={`${statusClass[status]} hover:${statusClass[status]}`}>
      {statusLabel[status]}
    </Badge>
  );
}