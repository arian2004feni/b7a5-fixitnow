import { technicians } from "@/components/fixitnow/data";
import { BadgeCheck, Heart, MapPin } from "lucide-react";
import Rating from "./Rating";
import Link from "next/link";

export default function TechnicianCard({
  tech,
}: {
  tech: (typeof technicians)[number];
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`grid size-14 place-items-center overflow-hidden rounded-full ${tech.color}`}
          >
            <img
              src={tech.avatar}
              alt={tech.name}
              className="size-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-slate-900">{tech.name}</h3>
              <BadgeCheck className="size-4 fill-blue-600 text-white" />
            </div>
            <p className="mt-0.5 text-sm text-slate-500">{tech.profession}</p>
          </div>
        </div>
        <button
          aria-label="Save technician"
          className="text-slate-400 hover:text-rose-500"
        >
          <Heart className="size-5" />
        </button>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-1.5 text-slate-500">
          <MapPin className="size-4 text-slate-400" />
          {tech.location}
        </div>
        <Rating value={tech.rating} reviews={tech.reviews} />
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span>
          <strong className="text-slate-800">{tech.years} yrs</strong>{" "}
          experience
        </span>
        <span>
          <strong className="text-slate-800">{tech.jobs}</strong> jobs done
        </span>
        <span>
          From <strong className="text-slate-800">${tech.price}</strong>
        </span>
      </div>
      <Link
        href={`/technicians/${tech.slug}`}
        className="mt-5 flex h-10 w-full items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600"
      >
        View Profile
      </Link>
    </article>
  );
}
