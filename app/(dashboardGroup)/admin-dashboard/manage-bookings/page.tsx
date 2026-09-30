import AdminBookingLists from "../../_components/admin/AdminBookingLists";

export default function AdminBookingsPage() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="text-3xl font-bold">Bookings</h2>

        <p className="mt-2 text-slate-500">
          Monitor every booking and its payment lifecycle.
        </p>
      </div>

      <AdminBookingLists />
    </div>
  );
}
