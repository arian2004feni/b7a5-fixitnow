"use client";

import { ApiResponse } from "@/types/api";
import { Category } from "@/types/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function FilterControls({
  categories,
}: {
  categories: ApiResponse<Category[]>;
}) {
  const router = useRouter(),
    pathname = usePathname(),
    search = useSearchParams();
  const [pending, startTransition] = useTransition();
  const set = (key: string, value: string, checked: boolean) => {
    const p = new URLSearchParams(search.toString());
    if (checked) p.set(key, value);
    else p.delete(key);
    startTransition(() => router.replace(`${pathname}?${p.toString()}`));
  };
  const clear = () => startTransition(() => router.replace(pathname));
  const categoryItemNames = categories.data.map((c) => [c.name, c.name]);
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          <button onClick={clear} className="text-xs font-medium text-blue-600">
            Clear all
          </button>
        </div>
        <div className="mt-6 space-y-6">
          <FilterGroup
            title="Categories"
            items={categoryItemNames}
            value={search.get("category")}
            onChange={(v, c) => set("category", v, c)}
          />
        </div>
        {pending && (
          <p className="mt-4 text-xs text-slate-400">Updating results…</p>
        )}
      </div>
    </aside>
  );
}
function FilterGroup({
  title,
  items,
  value,
  onChange,
}: {
  title: string;
  items: string[][];
  value: string | null;
  onChange: (v: string, c: boolean) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-slate-800">{title}</p>
      <div className="space-y-3">
        {items.map(([label, v]) => (
          <label
            key={label}
            className="flex items-center gap-2.5 text-sm text-slate-500"
          >
            <input
              type="checkbox"
              checked={value === v}
              onChange={(e) => onChange(v, e.target.checked)}
              className="size-4 rounded border-slate-300 accent-blue-600"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
