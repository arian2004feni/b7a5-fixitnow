"use client";

import { ApiResponse, PaginationMeta } from "@/types/api";
import { Category } from "@/types/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationControls({ meta }: { meta: PaginationMeta }) {
  const router = useRouter(),
    pathname = usePathname(),
    search = useSearchParams();
  const p = new URLSearchParams(search.toString());
  const current = p.get("page");
  // const [pending, startTransition] = useTransition();
  // const set = (key: string, value: string, checked: boolean) => {
  //   if (checked) p.set(key, value);
  //   else p.delete(key);
  //   startTransition(() => router.replace(`${pathname}?${p.toString()}`));
  // };
  // const clear = () => startTransition(() => router.replace(pathname));
  return (
    <Pagination>
      <PaginationContent>
        {current &&
          Number(current) <= meta.totalPages &&
          Number(current) !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`${pathname}?page=${Number(current) - 1}`}
              />
            </PaginationItem>
          )}
        {current &&
          Array.from({ length: Number(meta.totalPages) }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                className={`${Number(current) === i + 1 && "bg-blue-600 text-white"}`}
                isActive={Number(current) === i + 1}
                href={`${pathname}?page=${i + 1}`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        {current &&
          Number(current) <= meta.totalPages &&
          Number(current) !== meta.totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`${pathname}?page=${Number(current) + 1}`}
              />
            </PaginationItem>
          )}
      </PaginationContent>
    </Pagination>
  );
}
