import { Wrench } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-white">
              <Wrench className="size-4" />
            </span>
            <span className="font-bold text-slate-950">
              FixIt<span className="text-blue-600">Now</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
            Your trusted home service platform. Quality help from verified
            professionals, right at your door.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">For customers</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <Link className="block hover:text-blue-600" href="/services">
              Find a service
            </Link>
            <Link className="block hover:text-blue-600" href="/technicians">
              Browse technicians
            </Link>
            <span className="block">How it works</span>
            <span className="block">Safety & trust</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">For professionals</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <span className="block">Join FixItNow</span>
            <span className="block">Partner resources</span>
            <span className="block">Success stories</span>
            <span className="block">Help center</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:justify-between lg:px-8">
          <span>© 2026 FixItNow. All rights reserved.</span>
          <span>Privacy · Terms · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}
