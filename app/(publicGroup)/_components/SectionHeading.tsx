import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  body,
  href,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  href?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h2>
        {body && <p className="mt-3 max-w-xl text-slate-500">{body}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View all <ArrowRight className="ml-1 inline size-4" />
        </Link>
      )}
    </div>
  );
}
