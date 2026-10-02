"use client";

import { ApiResponse } from "@/types/api";
import { Category } from "@/types/category";
import Link from "next/link";

export default function HomeCategories({
  categories,
}: {
  categories: ApiResponse<Category[]>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.data.map((category) => (
        <Link
          href="/services"
          key={category.id}
          className="group rounded-2xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
        >
          <div
            className={`mx-auto grid size-14 place-items-center rounded-2xl text-2xl font-bold`}
          >
            ⌂
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700 group-hover:text-blue-600">
            {category.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
