import { Wrench } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="mx-auto mb-8 flex w-fit items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white">
        <Wrench className="size-5" />
      </span>
      <span className="text-xl font-bold text-slate-950">
        FixIt<span className="text-blue-600">Now</span>
      </span>
    </Link>
  );
}
