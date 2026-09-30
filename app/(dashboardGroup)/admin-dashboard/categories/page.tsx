import AdminCategoryLists from "../../_components/admin/AdminCategoryLists";

export default function AdminCategoriesPage() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold">Categories</h2>

          <p className="mt-2 text-slate-500">
            Organize the services available on your marketplace.
          </p>
        </div>
      </div>

      <AdminCategoryLists />
    </div>
  );
}
