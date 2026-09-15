import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { categories, services, technicians } from "@/components/fixitnow/data";
import Image from "next/image";
import SearchBar from "./_components/SearchBar";
import SectionHeading from "./_components/SectionHeading";
import ServiceCard from "./_components/ServiceCard";
import TechnicianCard from "./_components/TechnicianCard";

export default function PublicHomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(37,99,235,.28),transparent_38%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-sm font-medium text-blue-200">
              <span className="size-2 rounded-full bg-emerald-400" />
              Trusted by 10,000+ homeowners
            </div>
            <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Trusted professionals.
              <br />
              <span className="text-blue-400">Quality service.</span>
              <br />
              Right at your door.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              From quick fixes to big projects, find verified local
              professionals who get the job done right.
            </p>
            <div className="mt-9 max-w-2xl">
              <SearchBar />
            </div>
            <div className="mt-6 flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-400" />
                Verified professionals
              </span>
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                4.9 average rating
              </span>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <Image
              width={550}
              height={600}
              unoptimized
              src="https://images.unsplash.com/photo-1772442198689-af331f8f9617?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Professional technician reviewing a home project"
              className="relative aspect-[.9] w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-8 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
              <div className="grid size-11 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Job well done
                </p>
                <p className="text-xs text-slate-500">Sarah rated 5 stars</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Explore services"
          title="What can we help with?"
          body="Whatever your home needs, there's a skilled professional ready to help."
          href="/services"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              href="/services"
              key={category.name}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div
                className={`mx-auto grid size-14 place-items-center rounded-2xl text-2xl font-bold ${category.tint}`}
              >
                {category.icon}
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section id="how-it-works" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Simple from start to finish"
            title="Getting help is easy"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Tell us what you need",
                body: "Search for a service and share a few details about your project.",
              },
              {
                icon: Users,
                title: "Choose your professional",
                body: "Compare trusted local pros by reviews, experience, and price.",
              },
              {
                icon: CheckCircle2,
                title: "Get it done right",
                body: "Book with confidence and enjoy quality service at your door.",
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-slate-200 bg-white p-7"
              >
                <span className="absolute right-6 top-5 text-5xl font-bold text-slate-100">
                  0{i + 1}
                </span>
                <div className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <step.icon className="size-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 leading-6 text-slate-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Popular right now"
          title="Featured services"
          body="Book a trusted pro for your next home project."
          href="/services"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Meet the pros"
            title="Top-rated technicians"
            body="Real people, real skills, and a commitment to great work."
            href="/technicians"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {technicians.map((tech) => (
              <TechnicianCard key={tech.slug} tech={tech} />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-5 mb-20 overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center text-white lg:mx-auto lg:max-w-7xl lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[.15em] text-blue-200">
          Ready when you are
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
          Your next project starts with one search.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-blue-100">
          Find the right professional for the job and get back to the things
          that matter.
        </p>
        <Link
          href="/services"
          className="mt-8 inline-flex h-12 items-center rounded-lg bg-white px-6 font-semibold text-blue-700 hover:bg-blue-50"
        >
          Find a Service <ArrowRight className="ml-2 size-4" />
        </Link>
      </section>
    </>
  );
}
