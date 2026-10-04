"use client";

import { PaginationMeta } from "@/types/api";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationControls({ meta }: { meta: PaginationMeta }) {
  const pathname = usePathname(),
    search = useSearchParams();
  const p = new URLSearchParams(search.toString());
  let current = p.get("page");
  if (current === null) current = "1";
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
