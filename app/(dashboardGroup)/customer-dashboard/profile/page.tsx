import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageHeading from "../../_components/customer/PageHeading";
import { AvatarFallback } from "radix-ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeading
        title="Profile settings"
        description="Manage your personal information and preferences."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
            <CardDescription>
              Keep your contact details up to date.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarFallback className="bg-blue-100 text-lg text-blue-700">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 size-3.5" />
                Change photo
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" defaultValue="Jordan Davis" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  defaultValue="(415) 555-0182"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue="jordan@example.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                defaultValue="1428 Market Street, San Francisco"
                className="mt-2"
              />
            </div>
            <Button className="w-fit bg-blue-600 hover:bg-blue-700">
              Save changes
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security & notifications</CardTitle>
            <CardDescription>
              Control account access and updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant="outline" className="justify-between">
              Change password <ChevronRight className="size-4" />
            </Button>
            <Button variant="outline" className="justify-between">
              Email notifications <Check className="size-4 text-emerald-600" />
            </Button>
            <Button variant="outline" className="justify-between">
              SMS appointment reminders{" "}
              <Check className="size-4 text-emerald-600" />
            </Button>
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="justify-start text-red-600 hover:text-red-700"
            >
              Log out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
