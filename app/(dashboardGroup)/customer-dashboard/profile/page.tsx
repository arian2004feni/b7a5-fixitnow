"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageHeading from "../../_components/customer/PageHeading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateCustomerProfile } from "../../_actions/profileActions";

export default function ProfilePage() {
  const [saving, setSaving] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const f = new FormData(e.currentTarget);
    const r = await updateCustomerProfile({
      mobileNumber: f.get("mobileNumber"),
      location: f.get("location"),
      bio: f.get("bio"),
    });
    setSaving(false);
    if (r.success) toast.success("Profile updated");
    else toast.error(r.message || "Could not update profile");
  };
  return (
    <div className="flex flex-col gap-7">
      <PageHeading
        title="Profile settings"
        description="Manage the information customers use on their account."
      />
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>
            Keep your contact details up to date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Mobile number</Label>
                <Input
                  name="mobileNumber"
                  className="mt-2"
                  placeholder="+8801XXXXXXXXX"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input name="location" className="mt-2" placeholder="Dhaka" />
              </div>
            </div>
            <div>
              <Label>About you</Label>
              <Textarea
                name="bio"
                rows={5}
                className="mt-2"
                placeholder="Optional information about your service needs."
              />
            </div>
            <Button
              disabled={saving}
              type="submit"
              className="w-fit bg-blue-600 hover:bg-blue-700"
            >
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
