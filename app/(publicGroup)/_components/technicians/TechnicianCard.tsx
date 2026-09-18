import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TechnicianProfile } from "@/types/user";
import { Heart, MapPin } from "lucide-react";
import Rating from "../Rating";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function TechnicianCard({
  tech,
}: {
  tech: TechnicianProfile;
}) {
  console.log(tech.user?.name);
  return (
    <Card className="relative mx-auto w-full max-w-sm">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <Avatar className="size-12">
            <AvatarImage src={tech.profilePhoto as string} />
            <AvatarFallback>
              {tech.user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{tech.user?.name}</CardTitle>
            <CardDescription>{tech.bio ?? "bio"}</CardDescription>
          </div>
        </div>
        <CardAction>
          <Heart className="opacity-50 hover:opacity-80 size-8 border rounded-full p-2" />
        </CardAction>
      </CardHeader>

      <CardHeader className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-1.5 text-slate-500">
          <MapPin className="size-4 text-slate-400" />
          {tech.location ?? "location"}
        </div>
        <Rating value={4.4} reviews={10} />
      </CardHeader>

      <div className="flex items-center justify-between border-t border-slate-100 p-4 text-xs text-slate-500">
        <span>
          <strong className="text-slate-800">{tech.experienceYears} yrs</strong>{" "}
          experience
        </span>
        <span>
          <strong className="text-slate-800">{33}</strong> jobs done
        </span>
        <span>
          <strong className="text-slate-800">{98}</strong>%
        </span>
      </div>
      <div className="px-4">
        <Link
          href={`/technicians/${tech.id}`}
          className="flex h-10 items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600"
        >
          View Profile
        </Link>
      </div>
    </Card>
  );
}
