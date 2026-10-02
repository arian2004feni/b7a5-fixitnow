import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo Container */}
        <div className="flex items-center gap-2.5 animate-pulse">
          <span className="grid size-11 place-items-center rounded-xl bg-blue-600 text-white shadow-md animate-bounce">
            <Wrench className="size-6" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-slate-950">
            FixIt<span className="text-blue-600">Now</span>
          </span>
        </div>

        {/* Subtle Progress Bar */}
        <div className="h-1 w-24 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-full origin-left animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-blue-600" />
        </div>
      </div>
    </div>
  );
}
