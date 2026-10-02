"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "../../_components/technician/Heading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateTechnicianProfile } from "../../_actions/profileActions";
import { toast } from "sonner";

export default function TechnicianProfile() {
  const [saving, setSaving] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const f = new FormData(e.currentTarget);
    const r = await updateTechnicianProfile({
      bio: f.get("bio"),
      location: f.get("location"),
      mobileNumber: f.get("mobileNumber"),
      experienceYears: Number(f.get("experienceYears")),
    });
    setSaving(false);
    r.success
      ? toast.success("Profile updated")
      : toast.error(r.message || "Could not update profile");
  };
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Profile"
        description="Keep your professional profile current for customers."
      />
      <Card>
        <CardHeader>
          <CardTitle>Professional profile</CardTitle>
          <CardDescription>
            These details are used on your public technician profile.
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
              <div>
                <Label>Years of experience</Label>
                <Input
                  name="experienceYears"
                  type="number"
                  min="0"
                  className="mt-2"
                  placeholder="5"
                />
              </div>
            </div>
            <div>
              <Label>Professional bio</Label>
              <Textarea
                name="bio"
                rows={6}
                className="mt-2"
                placeholder="Describe your experience, skills and the work you specialize in."
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
