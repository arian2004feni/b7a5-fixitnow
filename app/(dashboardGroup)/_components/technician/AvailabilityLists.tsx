"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heading } from "../../_components/technician/Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit3 } from "lucide-react";
import { AvailabilitySlot } from "@/types/availability";
import { DayOfWeek } from "@/types/enums";
import { useActionState, useState } from "react";
import { convert24to12 } from "@/lib/utils";
import { ApiResponse } from "@/types/api";
import {
  createAvailability,
  updateAvailability,
} from "../../_actions/technicianActions";
import { toast } from "sonner";

export default function AvailabilityLists({
  availability,
}: {
  availability: AvailabilitySlot[];
}) {
  const [slots, setSlots] = useState(availability);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [updateForm, setUpdateForm] = useState({
    startTime: "",
    endTime: "",
  });

  const [state, action, pending] = useActionState(
    async (prevState: ApiResponse<AvailabilitySlot[]>, formData: FormData) => {
      const id = formData.get("id") as string | null;

      // UPDATE
      if (id) {
        const result = await updateAvailability(prevState, formData);

        if (result.success && result.data) {
          setSlots((prev) =>
            prev.map((item) =>
              item.id === result.data.id ? result.data : item,
            ),
          );
          setOpen(false);
          toast.success(result.message);
        } else {
          setOpen(false);
          toast.error(result.message);
        }

        return result;
      }

      // toast.error("fail");
      const result = await createAvailability(prevState, formData);

      if (result.success && result.data) {
        setOpen(false);
        setSlots(result.data);
        toast.success(result.message);
      } else {
        setOpen(false);
        toast.error(result.message);
      }
      return result;
    },
    false,
  );

  return (
    <>
      <Heading
        title="Availability"
        description="Set the hours customers can request your services."
        action={
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Set availability
            </Button>
          </div>
        }
      />

      {/* {saved && (
        <Alert>
          <CheckCircle2 className="size-4" />
          <AlertDescription>Your availability has been saved.</AlertDescription>
        </Alert>
      )} */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly schedule</CardTitle>
          <CardDescription>
            Booked slots are shown in blue. Changes apply to future bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {[
            DayOfWeek.SATURDAY,
            DayOfWeek.SUNDAY,
            DayOfWeek.MONDAY,
            DayOfWeek.TUESDAY,
            DayOfWeek.WEDNESDAY,
            DayOfWeek.THURSDAY,
            DayOfWeek.FRIDAY,
          ].map((d, i) => {
            const day = slots.find((x) => x.dayOfWeek === d);
            const isDay = day && day.startTime && day.endTime;
            return (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
              >
                <div className="w-28 font-semibold text-slate-900">{d}</div>
                <div className="flex flex-1 flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className={`gap-2 ${isDay ? "bg-emerald-50 text-emerald-700" : "text-slate-500"}`}
                  >
                    {isDay
                      ? `${convert24to12(day?.startTime)} – ${convert24to12(day?.endTime)}`
                      : "Not Available"}{" "}
                    {isDay ? (
                      <span className="text-[10px]">Available</span>
                    ) : (
                      <></>
                    )}
                  </Badge>
                </div>
                {isDay && (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(day.id);
                        setUpdateForm({
                          startTime: day.startTime,
                          endTime: day.endTime,
                        });
                        setOpen(true);
                      }}
                    >
                      <Edit3 className="mr-1 size-3.5" />
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg w-fit min-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} Availability</DialogTitle>
            <DialogDescription>
              Make changes to your Availability here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form action={action}>
            {editing ? (
              <FieldGroup>
                {editing && <input type="hidden" name="id" value={editing} />}
                <Field>
                  <Label htmlFor="weekInput">Day</Label>
                  <Input
                    id="weekInput"
                    readOnly
                    name="dayOfWeek"
                    defaultValue={
                      slots.find((x) => x.id === editing)?.dayOfWeek
                    }
                    // disabled
                    className="font-semibold text-slate-900"
                  />
                </Field>
                <Field>
                  <Label htmlFor="startTimeInput">Start</Label>
                  <Input
                    id="startTimeInput"
                    name="startTime"
                    defaultValue={updateForm.startTime}
                    type="time"
                    onChange={(e) =>
                      setUpdateForm({
                        ...updateForm,
                        startTime: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field>
                  <Label htmlFor="endTimeInput">End</Label>
                  <Input
                    id="endTimeInput"
                    name="endTime"
                    defaultValue={updateForm.endTime}
                    type="time"
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, endTime: e.target.value })
                    }
                  />
                </Field>
              </FieldGroup>
            ) : (
              <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4 space-y-4">
                {[
                  DayOfWeek.SATURDAY,
                  DayOfWeek.SUNDAY,
                  DayOfWeek.MONDAY,
                  DayOfWeek.TUESDAY,
                  DayOfWeek.WEDNESDAY,
                  DayOfWeek.THURSDAY,
                  DayOfWeek.FRIDAY,
                ].map((d, i) => {
                  const day = slots.find((x) => x.dayOfWeek === d);
                  const isDay = day && day.startTime && day.endTime;
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4"
                    >
                      {/* <div className="font-semibold text-slate-900">
                        {i + 1}. {d}
                      </div> */}
                      <FieldGroup className="flex-row">
                        <Field>
                          <Input
                            readOnly
                            name={`dayOfWeek-${d}`}
                            value={d}
                            // disabled
                            className="font-semibold text-slate-900 border-0 focus-visible:ring-0"
                          />
                        </Field>
                        <Field>
                          <Input
                            id="startTimeInput"
                            name={`startTime-${d}`}
                            defaultValue={isDay ? day.startTime : "09:00"}
                            type="time"
                            // onClick={(e) => e.currentTarget.showPicker()}
                            // onFocus={(e) => e.currentTarget.showPicker()}
                            // onChange={(e) =>
                            //   setUpdateForm({
                            //     ...updateForm,
                            //     startTime: e.target.value,
                            //   })
                            // }
                          />
                        </Field>
                        {"_"}
                        <Field>
                          <Input
                            id="endTimeInput"
                            name={`endTime-${d}`}
                            defaultValue={isDay ? day.endTime : "21:00"}
                            type="time"
                            // onClick={(e) => e.currentTarget.showPicker()}
                            // onFocus={(e) => e.currentTarget.showPicker()}
                            // onChange={(e) =>
                            //   setUpdateForm({ ...updateForm, endTime: e.target.value })
                            // }
                          />
                        </Field>
                      </FieldGroup>
                    </div>
                  );
                })}
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={pending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
