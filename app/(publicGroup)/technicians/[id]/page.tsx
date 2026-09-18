import { notFound } from "next/navigation";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import Rating from "../../_components/Rating";
import { BookingCard } from "../../_components/BookingCard";
import { getTechnicians } from "../../_actions/publicActions";
import { TechnicianProfile as Technician } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApiResponse } from "@/types/api";
const profileServices = [
  { id: "plumbing", title: "Emergency Plumbing", price: 85 },
  { id: "pipes", title: "Pipe installation", price: 120 },
  { id: "water", title: "Water heater repair", price: 95 },
  { id: "drain", title: "Drain cleaning", price: 75 },
];
export default async function TechnicianProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profileTechnicians: ApiResponse<Technician[]> = await getTechnicians();
  const tech = profileTechnicians.data.find((t) => t.id === id);
  if (!tech) notFound();
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
            <div className="grid size-28 shrink-0 place-items-center overflow-hidden rounded-3xl">
              <Avatar className="size-28">
                <AvatarImage src={tech.profilePhoto as string} />
                <AvatarFallback>
                  {tech.user?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold text-slate-950">
                  {tech.user?.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  <BadgeCheck className="size-3.5 fill-blue-600 text-white" />
                  Verified
                </span>
              </div>
              <p className="mt-2 text-lg text-slate-500">{tech.bio}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                <Rating value={4.4} reviews={44} />
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {tech.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <BriefcaseBusiness className="size-4" />
                  {tech.experienceYears} years experience
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="grid size-11 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-rose-500">
                <Heart className="size-5" />
              </button>
              <button className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700">
                <MessageCircle className="size-4" />
                Contact
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_380px] lg:px-8">
        <div>
          <div className="border-b border-slate-200">
            <div className="flex gap-7">
              <button className="border-b-2 border-blue-600 pb-4 text-sm font-semibold text-blue-600">
                Overview
              </button>
              <button className="pb-4 text-sm font-semibold text-slate-500">
                Services
              </button>
              <button className="pb-4 text-sm font-semibold text-slate-500">
                Reviews
              </button>
            </div>
          </div>
          <section className="py-8">
            <h2 className="text-xl font-bold">
              About {tech.user?.name.split(" ")[0]}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              With over {tech.experienceYears} years of experience, I take pride
              in delivering dependable, high-quality work for every home. From
              small repairs to larger projects, my goal is to leave every
              customer feeling confident and cared for.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-slate-900">{33}</p>
                <p className="mt-1 text-sm text-slate-500">Jobs completed</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-slate-900">{4.4}</p>
                <p className="mt-1 text-sm text-slate-500">Average rating</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-slate-900">98%</p>
                <p className="mt-1 text-sm text-slate-500">Would recommend</p>
              </div>
            </div>
          </section>
          <section className="border-t border-slate-200 py-8">
            <h2 className="text-xl font-bold">Services offered</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {profileServices.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{service.title}</h3>
                    <span className="font-bold">From ${service.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Professional service with clear pricing and quality
                    workmanship.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <Clock3 className="size-3.5" />
                    Usually 1–2 hours
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="border-t border-slate-200 py-8">
            <h2 className="text-xl font-bold">What customers say</h2>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-blue-100 font-semibold text-blue-700">
                  JM
                </div>
                <div>
                  <p className="font-semibold">Jordan Miller</p>
                  <Rating value={5} />
                </div>
              </div>
              <p className="mt-4 leading-6 text-slate-600">
                “Michael was on time, professional, and explained everything
                clearly. The repair was done quickly and the price was exactly
                what we discussed.”
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-slate-400">
                <ThumbsUp className="size-3.5" />
                Helpful review
              </div>
            </div>
          </section>
        </div>
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <span className="size-2 rounded-full bg-emerald-500" />
            Available for bookings this week
          </div>
          <BookingCard />
        </aside>
      </div>
    </>
  );
}
