import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">
          Settings
        </h2>
        <p className="mt-2 text-slate-500">
          Configure platform defaults and administrator preferences.
        </p>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Platform settings</CardTitle>
          <CardDescription>
            These settings are frontend-only in this prototype.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div>
            <Label htmlFor="name">Platform name</Label>
            <Input id="name" defaultValue="FixItNow" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Support email</Label>
            <Input
              id="email"
              defaultValue="support@fixitnow.com"
              className="mt-2"
            />
          </div>
          <Button className="w-fit">Save settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
