import { ArrowRight, Heart } from "lucide-react";
import Rating from "./Rating";
import Link from "next/link";
import { services } from "@/components/fixitnow/data";

export default function ServiceCard({
  service,
  featured = false,
}: {
  service: (typeof services)[number];
  featured?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5">
      <div className="relative aspect-[1.7] overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          aria-label="Save service"
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-slate-500 shadow-sm hover:text-rose-500"
        >
          <Heart className="size-4" />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-blue-600">
            {service.category}
          </span>
          <Rating value={service.rating} reviews={service.reviews} />
        </div>
        <h3 className="mt-2 font-semibold text-slate-900">{service.title}</h3>
        <p className="mt-1 text-sm text-slate-500">by {service.tech}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="text-xs text-slate-400">Starting at</span>
            <p className="font-bold text-slate-900">
              ${service.price}
              <span className="text-xs font-normal text-slate-400">
                {" "}
                / visit
              </span>
            </p>
          </div>
          <Link
            href="/technicians/michael-rodriguez"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View Details <ArrowRight className="ml-1 inline size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
