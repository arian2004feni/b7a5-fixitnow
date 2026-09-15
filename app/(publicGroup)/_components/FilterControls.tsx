export function FilterControls() {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          <button className="text-xs font-medium text-blue-600">
            Clear all
          </button>
        </div>
        <div className="mt-6 space-y-6">
          <FilterGroup
            title="Category"
            items={[
              "Plumbing",
              "Electrical",
              "Cleaning",
              "Painting",
              "Appliance Repair",
            ]}
          />
          <FilterGroup
            title="Rating"
            items={["4.5 & up", "4.0 & up", "3.5 & up"]}
          />
          <FilterGroup
            title="Availability"
            items={["Available today", "Available this week"]}
          />
        </div>
      </div>
    </aside>
  );
}
function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-slate-800">{title}</p>
      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2.5 text-sm text-slate-500"
          >
            <input
              type="checkbox"
              className="size-4 rounded border-slate-300 accent-blue-600"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
