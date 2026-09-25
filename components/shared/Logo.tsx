import { cn } from "cn";
import { Wrench } from "lucide-react";
import Link from "next/link";

export default function Logo({className}: {className?: string}) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
        <Wrench className="size-5" />
      </span>
      <span className="text-xl font-bold tracking-tight text-slate-950">
        FixIt<span className="text-blue-600">Now</span>
      </span>
    </Link>
  );
}
