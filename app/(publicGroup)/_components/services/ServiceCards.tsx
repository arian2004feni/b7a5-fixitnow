import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/types/services";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Rating from "../Rating";
import Link from "next/link";

export function ServiceCards({ service }: { service: Service }) {
  const avgRating = {
    avg: 0,
    count: 0,
  };
  service.technician?.reviewsReceived?.map((review) => {
    avgRating.avg = avgRating.avg + Number(review.rating);
    avgRating.count = avgRating.count + 1;
  });
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        width={300}
        height={200}
        unoptimized
        src={service.thumbnail ?? "https://avatar.vercel.sh/shadcn1"}
        alt={service.name}
        title={service.name}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <Button
        aria-label="Save service"
        title="Save Service"
        className="absolute right-3 top-3 z-30 size-8 rounded-full bg-white/80 text-slate-500 shadow-sm hover:bg-white hover:text-rose-500"
      >
        <Heart className="size-4" />
      </Button>
      <CardHeader>
        <CardTitle>
          <small className="text-blue-600">{service.category?.name}</small>
        </CardTitle>
        <CardAction>
          <Rating value={avgRating.avg} reviews={avgRating.count} />
        </CardAction>
        <CardTitle title={service.name} className="line-clamp-1">
          {service.name}
        </CardTitle>
        <CardDescription className="pb-2">{service.description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
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
            Technician <ArrowRight className="ml-1 inline size-3.5" />
          </Link>
      </CardFooter>
    </Card>
  );
}
