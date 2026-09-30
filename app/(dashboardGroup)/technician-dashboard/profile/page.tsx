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

export default function TechnicianProfile() {
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
            Your profile helps customers choose the right expert.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
              MR
            </div>
            <div>
              <Button variant="outline" size="sm">
                Upload new photo
              </Button>
              <p className="mt-1 text-xs text-slate-500">
                JPG or PNG, up to 5 MB
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value="Michael Rodriguez" />
            <Field label="Profession" value="Licensed Plumber" />
            <Field label="Phone" value="(512) 555-0147" />
            <Field label="Location" value="Austin, TX" />
            <Field label="Years of experience" value="12" />
            <Field label="Service area" value="Austin and nearby areas" />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue="Reliable licensed plumber helping Austin homeowners solve urgent repairs and improve their homes."
              className="mt-2"
            />
          </div>
          <div>
            <Label>Skills</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {/* {skills.map((item) => (
                <Badge key={item} variant="secondary" className="gap-1">
                  {item}
                  <button
                    type="button"
                    onClick={() => setSkills(skills.filter((s) => s !== item))}
                    aria-label={`Remove ${item}`}
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))} */}
              {/* <Input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.nativeEvent.isComposing &&
                    e.keyCode !== 229 &&
                    skill.trim()
                  ) {
                    e.preventDefault();
                    setSkills([...skills, skill.trim()]);
                    setSkill("");
                  }
                }}
                placeholder="Add a skill and press Enter"
                className="max-w-xs"
              /> */}
            </div>
          </div>
          <div className="max-w-xs">
            <Field label="Starting price" value="$85" />
          </div>
          {/* {saved && (
            <Alert>
              <CheckCircle2 className="size-4" />
              <AlertDescription>
                Profile changes saved successfully.
              </AlertDescription>
            </Alert> 
          )} */}
          <Button
            className="w-fit bg-blue-600 hover:bg-blue-700"
            // onClick={() => setSaved(true)}
          >
            Save changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input defaultValue={value} className="mt-2" />
    </div>
  );
}
